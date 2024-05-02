FROM python:3.11-slim

RUN apt-get update -y && \
    apt-get install -y iputils-ping
RUN pip install flask
WORKDIR /app
COPY . .


EXPOSE 5000

CMD [ "python3", "server.py" ]