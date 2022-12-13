
from fastapi import FastAPI
import requests
from random import randint
app = FastAPI()


@app.get('/')
async def root():
    students = requests.get('https://data.mongodb-api.com/app/application-0-nfogs/endpoint/attendece').json()
    return students[randint(0,len(students)-1)]
    