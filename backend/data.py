from sqlalchemy import create_engine,Column,Integer,String,Float,Text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = os.getenv("DB_PORT")

Url_Database=f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
engine=create_engine(Url_Database)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base=declarative_base()

class User(Base):
    __tablename__='users'
    id=Column(Integer, primary_key=True,index=True)
    name= Column(String(50),index=True)
    email=Column(String(50),unique=True)
    password=Column(String(50))

class Grievance(Base):
    __tablename__ = 'grievances'
    
    id = Column(Integer, primary_key=True, index=True)
    office_type = Column(String(50), index=True)
    directorate = Column(String(50))
    full_name = Column(String(50))
    gender = Column(String(50))
    category = Column(String(50), default="General")
    address_line1 = Column(String(50))
    country = Column(String(50), default="India")
    state = Column(String(50), default="Uttar Pradesh")
    mobile = Column(String(50))
    email = Column(String(50))
    grievance_description = Column(Text)
    previous_grievance = Column(String(50), default="No")
    urgency_level=Column(Float)
    status=Column(String(50),default="Pending")


class Feedback(Base):
    __tablename__='FeedbackData'
    id=Column(Integer,primary_key=True,index=True)
    feedback=Column(String(200))
    category=Column(String(200))
    type=Column(String(200))
    score=Column(Float)



Base.metadata.create_all(engine)

