from typing import Union

from pydantic import BaseModel

from db.documents import Movie


class ErrorModel(BaseModel):
    title: str
    message: str


class ResponseModel(BaseModel):
    status_code: int
    body: ErrorModel | Movie | list[Movie]
