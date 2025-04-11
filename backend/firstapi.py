from fastapi import  Depends, FastAPI, HTTPException, Query,status
from pydantic import BaseModel
from typing import Annotated,Optional
import pickle
from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from scipy.sparse import csr_matrix, hstack
import data
from data import engine,User,Grievance,SessionLocal,Base
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

sentiment_pipeline = pipeline("sentiment-analysis",model="distilbert-base-uncased-finetuned-sst-2-english")


with open("model.pkl", "rb") as f:
    model = pickle.load(f)

with open("tfidf_vectorizer.pkl", "rb") as f:
    tfidf_vectorizer = pickle.load(f)

with open("label_encoder.pkl", "rb") as f:
    le = pickle.load(f)

class Input(BaseModel):
    officeType: str
    directorate: str
    fullName: str
    gender: str
    category: str = "General"
    line1: str
    country: str = "India"
    state: str = "Uttar Pradesh"
    mobile: str
    email: str
    grievanceDescription: str
    previousGrievance: str = "No"
class feedback(BaseModel):
    text:str
    category:str
class Customer(BaseModel):
    name:str
    email:str
    password:str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://hof-project.vercel.app"],  # Frontend URL (adjust as needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

def prediction(grivence:str,category:str):
    grivence=tfidf_vectorizer.transform([grivence])
    category=le.transform([category])
    category=csr_matrix([[category[0]]])
    grivence=hstack([grivence,category])
    prediction=model.predict(grivence)
    rounded_prediction = round(prediction[0], 3)
    return {"prediction":rounded_prediction}



@app.post("/predict/")
async def predict(input: Input):
    grivence = input.enterGrivence
    category = input.enterCategory
    grivence=tfidf_vectorizer.transform([grivence])
    category=le.transform([category])
    category=csr_matrix([[category[0]]])
    grivence=hstack([grivence,category])
    prediction=model.predict(grivence)
    return {"prediction": prediction.tolist()}

@app.post("/grivence/",status_code=status.HTTP_201_CREATED)
async def submit_grievance(grievance: Input, db: Session = Depends(get_db)):
    urgecyLevel=prediction(grievance.grievanceDescription,grievance.category)
    db_grievance = data.Grievance(
        office_type=grievance.officeType,
        directorate=grievance.directorate,
        full_name=grievance.fullName,
        gender=grievance.gender,
        category=grievance.category,
        address_line1=grievance.line1,
        country=grievance.country,
        state=grievance.state,
        mobile=grievance.mobile,
        email=grievance.email,
        grievance_description=grievance.grievanceDescription,
        previous_grievance=grievance.previousGrievance,
        urgency_level=urgecyLevel["prediction"])
    db.add(db_grievance)
    db.commit()
    db.refresh(db_grievance)
    return db_grievance

@app.post("/user/",status_code=status.HTTP_201_CREATED)
async def create_user(user:Customer,db:Session = Depends(get_db)):
   db_user = data.User(
        name=user.name, 
        email=user.email, 
        password=user.password
    )
   db.add(db_user)
   db.commit()
   db.refresh(db_user)  
   return db_user
    


@app.post("/feedback",status_code=status.HTTP_200_OK)
async def feedback_data(feedback:feedback,db:Session=Depends(get_db)):
    result=sentiment_pipeline(feedback.text)
    db_feedback=data.Feedback(
        feedback=feedback.text,
        category=feedback.category,
        type=result[0]['label'],
        score=result[0]['score']
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback

@app.post('/login',status_code=status.HTTP_200_OK)
async def login(user:Customer,db:Session=Depends(get_db)):
    db_user = db.query(data.User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if user.password != db_user.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    

    return {"message": "Login successful"} 

@app.get("/grivence/{id}",status_code=status.HTTP_200_OK)
async def get_data(id:int,db:Session=Depends(get_db)):
    db_user = db.query(data.Grievance).filter(data.Grievance.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return db_user

@app.get("/grivence/{mobile}",status_code=status.HTTP_200_OK)
async def get_grivence_data(mobile:str,db:Session=Depends(get_db)):
    mobile = mobile.strip()
    db_grivence=db.query(data.Grievance).filter(data.Grievance.mobile.ilike(mobile)).all()
    if not db_grivence:
        raise HTTPException(status_code=404, detail="No grievances found for this mobile number")
    
    # Return all grievance descriptions for that mobile number
    return [{"id": grievance.id, "mobile_no": grievance.mobile, "description": grievance.grievance_description} for grievance in db_grivence]