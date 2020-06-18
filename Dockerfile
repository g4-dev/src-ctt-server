FROM hayd/alpine-deno:1.1.0

ENV DENO_INSTALL="/home/deno/.deno"
ENV FORCE_SCHEMA=false

EXPOSE 8081 8082

WORKDIR /app

COPY ./src .

USER root

RUN chown -R deno:deno /app

USER deno

RUN ls -la

RUN deno run -A --unstable --config=tsconfig.app.json ./bin/schema.ts FORCE=${FORCE_SCHEMA}

CMD ["run", "-A", "--unstable", "--config=tsconfig.app.json", "app.ts"]
