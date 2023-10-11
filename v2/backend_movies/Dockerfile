FROM python:3.11-alpine

RUN mkdir /app
WORKDIR /app

ADD requirements.txt /app/requirements.txt

RUN python -m pip install -r requirements.txt

ADD . /app

EXPOSE 4243

CMD uvicorn main:app --host 0.0.0.0 --port 4243