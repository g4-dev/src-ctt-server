FROM hayd/alpine-deno:1.0.2

ENV DENO_INSTALL="/home/deno/.deno"

EXPOSE 8081

USER deno

WORKDIR /app

COPY ./src .

CMD ["run", "-A", "--unstable", "--config=tsconfig.json", "app.ts"]
