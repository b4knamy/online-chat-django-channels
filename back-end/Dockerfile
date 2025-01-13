FROM python:3.12

WORKDIR /backend

RUN apt-get update && apt-get install -y netcat-openbsd

COPY ./requirements.txt ./requirements.txt
COPY scripts /scripts

RUN pip install -r requirements.txt

COPY . .

RUN chmod +x /scripts/command.sh

CMD ["/scripts/command.sh"]