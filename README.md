
# SAMADHAN 2.0

Samadhan 2.0 is an AI-powered solution designed to enable authorities to make data-driven decisions efficiently, with an expected reduction in resolution time.



## Installation
### Frontend:
Install the project with npm

```bash
  cd .\HOF5\
  cd .\my-app\
  npm install 
  npm run dev
```
## Environment Variables
Create a . env file in backend folder
To run this project, you will need to add the following environment variables to your .env file

`DB_HOST=localhost`

`DB_USER=root`

`DB_PASSWORD='your password'`(Add the password)


`DB_NAME='your database name'`
(First create a database in MySQL, then add the name of empty database created)
### Backend:
Install the project 

```bash
  cd .\backend\
  python -m venv myenv
  myenv\Scripts\activate
  pip install -r requirements.txt (only first time)
  python -m uvicorn firstapi:app --reload
  ```
