include .manala/deno.mk

ORG:=g4-dev
REPO:=src-ctt-server
GIT_DIR:=/home/$(USER_DEPLOY)/$(REPO).git
# API config for alwaysdata deploy
API=https://api.alwaysdata.com/v1
TOKEN?=
SITE_ID?=
TARGET:=/home/$(USER_DEPLOY)/$(REPO)
APP_PROD?=

help_more:
	@echo "[====== src-ctt-server =====]"

openapi:
	$(EXE) run $(ARGS) config/openapi.ts

ws:
	$(EXE) run $(ARGS) modules/ws/runner.ts

refresh-site:
	curl --basic --request POST --user $(TOKEN): $(API)/site/$(SITE_ID)/restart/

docker-compose:
	docker-compose build
	docker-compose up

docker-compose-d:
	docker-compose build
	docker-compose up -d

docker:
	ID=$$( \
		docker build \
			--quiet \
			-t=ctt/server:latest\
			.\
	) \
	&& docker run -p 80:8081 \
		--rm \
		-it \
		--hostname ctt-server.loicroux.test \
		-d ctt/server:latest \
		$${ID}

enter-docker:
	 docker run -p 80:8081 \
		-it \
		--entrypoint '/bin/bash'\
		ctt/server:latest \
		/bin/bash
