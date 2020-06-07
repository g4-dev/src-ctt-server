include .manala/deno.mk

ORG:=g4-dev
REPO:=src-ctt-server
GIT_DIR:=/home/$(USER_DEPLOY)/$(REPO).git
# API config for alwaysdata deploy
API=https://api.alwaysdata.com/v1
TOKEN?=
SITE_ID?=

help_more:
	@echo "[====== src-ctt-server =====]"

# Project binary to update db schema
schema:
	$(EXE) run $(ARGS) $(BIN_DIR)/schema.ts

openapi:
	$(EXE) run $(ARGS) config/openapi.ts

ws:
	$(EXE) run $(ARGS) modules/ws/server.ts

# deploy for alwaydata datacenter
init-deploy:
	@$(call ssh, \
	git init --bare $(GIT_DIR);\
	curl -L -o $(GIT_DIR)/hooks/post-receive https://raw.githubusercontent.com/alwaysdata/autodeploy-git-hook/master/post-receive;\
	chmod +x $(GIT_DIR)/hooks/post-receive;)
	git remote add deploy $(USER_DEPLOY)@$(SSH_ADDRESS):$(GIT_DIR);

deploy:
	@$(call ssh,\
	TARGET="$(GIT_DIR)"\
	GIT_DIR="$(GIT_DIR)"\
	BRANCH="master"\
	RESTART=true\
	API_KEY="$(TOKEN)"\
	SITE_ID=$(SITE_ID) ./$(GIT_DIR)/hooks/post-receive; )

#ACCOUNT="$(USER_DEPLOY)"\
