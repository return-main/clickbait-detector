FROM python:2.7

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT [ "python", "src/detect.py" ]
CMD [ "" ]