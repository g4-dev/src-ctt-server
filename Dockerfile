FROM hayd/deno:latest

EXPOSE 8000

WORKDIR .

USER deno

ADD . .

RUN cd src

CMD ["run", "-A", "--unstable", "--config=../tsconfig.json", "app.ts"]
