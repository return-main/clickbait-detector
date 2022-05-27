FROM python:2.7

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "src/server.py" ]

EXPOSE 8000/tcp