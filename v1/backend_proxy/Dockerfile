FROM python:3.11-alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add requirements (to leverage Docker cache)
ADD requirements.txt /usr/src/app/requirements.txt

# install requirements
RUN pip install -r requirements.txt

EXPOSE 8080

# add app
ADD . /usr/src/app

# run server
CMD python manage.py runserver -h 0.0.0.0 --port=8080