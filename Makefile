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

# Project binary to update db schema
schema:
	$(EXE) run $(ARGS) $(BIN_DIR)/schema.ts

openapi:
	$(EXE) run $(ARGS) config/openapi.ts

ws:
	$(EXE) run $(ARGS) modules/ws/server.ts

refresh-site:
	curl --basic --request POST --user $(TOKEN): $(API)/site/$(SITE_ID)/restart/

docker:
	docker-compose build
	docker-compose up > /var/log/$(REPO).log
