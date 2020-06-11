FROM hayd/deno:latest

EXPOSE 8000

WORKDIR .

USER deno

ADD . .

WORKDIR ./src/

CMD ["run", "-A", "--config=../tsconfig.json", "--unstable", "bin/schema.ts"]

CMD ["run", "-A", "--unstable", "--reload", "--config=../tsconfig.json", "app.ts"]
