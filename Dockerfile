FROM hayd/alpine-deno:1.0.2

ENV DENO_INSTALL="/home/deno/.deno"

EXPOSE 8081

WORKDIR /app

USER root

RUN chown -R deno:deno /app

USER deno

COPY ./src .

CMD ["run", "-A", "--unstable", "--config=tsconfig.json", "app.ts"]
