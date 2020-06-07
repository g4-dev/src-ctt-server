include .manala/deno.mk

USER_DEPLOY=pandemik699
SSH_ADDRESS=ssh-$(USER_DEPLOY).alwaysdata.net
REMOTE_DIR_DEPLOY=/home/$(USER_DEPLOY)/www

# API config for alwaysdata deploy
API=https://api.alwaysdata.com/v1
TOKEN?=83ce8fc61f7f4d559d6de8d7f8a2cecb
ID?=601897

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
	curl --basic --request POST --user $(TOKEN): $(API)/site/$(ID)/restart/
