
from fastapi import FastAPI
from enum import Enum
import requests

app = FastAPI()

class Action(Enum):
    ENTER = "enter"
    LEAVE = "leave"

@app.get('/{id}/{action}')
async def root(id:str,action:Action):
    url = f"https://smart-attendence.deta.dev/{id}/{action.value}"
    requests.put(url)
    return "success"
    
    
    