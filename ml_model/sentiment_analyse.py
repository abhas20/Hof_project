from zipfile import ZipFile
dataset = '/content/sentiment140.zip'

with ZipFile(dataset, 'r') as zip:
  zip.extractall()
  print('done')

import numpy as np
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

import nltk
nltk.download ('stopwords')

#printing these stop words in english
print(stopwords.words('english'))

#moving from csv to panda dataframe
twitter_data=pd.read_csv('/content/training.1600000.processed.noemoticon.csv',encoding='ISO-8859-1')

twitter_data.shape

twitter_data.head()

#naming the columns and reading the dataset again
column_names=['target','ids','date','flag','user','text']
twitter_data=pd.read_csv('/content/training.1600000.processed.noemoticon.csv',encoding='ISO-8859-1',names=column_names)

twitter_data.head()

#counting the no of missing values in the dataset
twitter_data.isnull().sum()

1#checking the distribution of target column
twitter_data['target'].value_counts()

"""convert the target from 4 to 1"""

twitter_data.replace({4:1},inplace=True)

twitter_data['target'].value_counts()

port_stem=PorterStemmer()

def stemming (content):
  stemmed_content=re.sub('[^a-zA-Z]',' ',content)
  stemmed_content=stemmed_content.lower()
  stemmed_content=stemmed_content.split()
  stemmed_content=[port_stem.stem(word) for word in stemmed_content if not word in stopwords.words('english')]
  stemmed_content=' '.join(stemmed_content)
  return stemmed_content

twitter_data['stemmed_content']=twitter_data['text'].apply(stemming)

twitter_data.head()

print(twitter_data['stemmed_content'])

print(twitter_data['target'])

#seperating the data and  the label
X = twitter_data['stemmed_content'].values
Y = twitter_data['target'].values

print(X)

print(Y)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.2, stratify=Y, random_state=2)

print( X.shape, X_train.shape, X_test.shape)

print(X_test)

vectorizer=TfidfVectorizer()
X_train=vectorizer.fit_transform(X_train)
X_test=vectorizer.transform(X_test)

print(X_train)

print(X_test)

model = LogisticRegression(max_iter=1000)

model.fit(X_train,Y_train)

#accuracy score and model evaluation
X_train_prediction=model.predict(X_train)
training_data_accuracy=accuracy_score(X_train_prediction,Y_train)

print('Accuracy score on the training data is', training_data_accuracy)

X_test_prediction=model.predict(X_test)
testing_data_accuracy=accuracy_score(X_test_prediction,Y_test)

print('Accuracy score on the test data is', testing_data_accuracy)

import pickle

filename='trained_model.sav'
pickle.dump(model,open(filename,'wb'))

#loading the saved model
loaded_model=pickle.load(open('trained_model.sav','rb'))

X_new=X_test[200]
print(Y_test[200])

prediction=model.predict(X_new)
print(prediction)

if(prediction[0]==0):
  print('Negative Response')
else:
  print('Positive Response')

X_new=X_test[3]
print(Y_test[3])

prediction=loaded_model.predict(X_new)
print(prediction)

if(prediction[0]==0):
  print('Negative Response')
else:
  print('Positive Response')

# Example input (make sure the shape matches what the model expects)
sample_input = ["I had to call multiple times, and still no action has been taken."]  # Example grievance response

# Predict
prediction = model.predict(sample_input)
print("Prediction:", prediction)

# Example input (make sure the shape matches what the model expects)
sample_input = ["waste of time, no use"]  # Example grievance response

# Transform the input using the same vectorizer used for training
sample_input_transformed = vectorizer.transform(sample_input)

# Predict
prediction = model.predict(sample_input_transformed)
print("Prediction:", prediction)

print(vectorizer.get_feature_names_out())  # Check if "waste" or "time" exists in the vocabulary