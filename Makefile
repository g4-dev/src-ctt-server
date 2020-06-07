include .manala/deno.mk

USER_DEPLOY?=
SSH_ADDRESS?=
REMOTE_DIR_DEPLOY:=
GIT_URL:=https://github.com/g4-dev/src-ctt-server.git

# API config for alwaysdata deploy
API=https://api.alwaysdata.com/v1
TOKEN?=
SITE_ID?=

help_more:
	@echo "[====== src-ctt-server =====]"

# Project binary to update db schema
schema:
	$(EXE) $(ARGS) $(BIN_DIR)/schema.ts

openapi:
	$(EXE) $(ARGS) config/openapi.ts

ws:
	$(EXE) $(ARGS) modules/ws/server.ts

# deploy for alwaydata datacenter
deploy-ald: deploy
	curl --basic --request POST --user $(TOKEN): $(API)/site/$(SITE_ID)/restart/
