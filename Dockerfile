FROM hayd/deno:latest

EXPOSE 8000

WORKDIR /app

USER deno

ADD . /app

RUN deno cache src/app.ts

CMD ["make", "start"]
