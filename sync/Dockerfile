FROM python:3.10.2-slim-buster

WORKDIR /home/sync

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app app

CMD ["python", "-m", "app.main"]