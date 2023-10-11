from fastapi import FastAPI
from pydantic import BaseModel

from api.routes import api_router
from db.database import init_db


class Ping(BaseModel):
    status: str
    message: str


app = FastAPI()
app.include_router(api_router)


@app.on_event("startup")
async def start_db():
    await init_db()


@app.get("/", response_model=Ping)
def ping():
    return Ping(status='success', message='pong!')
