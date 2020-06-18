FROM hayd/alpine-deno:1.1.0

ENV DENO_INSTALL="/home/deno/.deno"

EXPOSE 8082

WORKDIR /app

COPY ./src .

USER root

RUN chown -R deno:deno /app

USER deno

CMD ["run", "-A", "--unstable", "--config=tsconfig.app.json", "modules/ws/runner.ts", ">/dev/null", "&"]
