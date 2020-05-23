include .manala/deno.mk

USER_DEPLOY=pandemik699
SSH_ADDRESS=ssh-$(USER_DEPLOY).alwaysdata.net
REMOTE_DIR_DEPLOY=/home/$(USER_DEPLOY)/www
TOKEN?=83ce8fc61f7f4d559d6de8d7f8a2cecb
ID?=601897

# API config for alwaysdata
API=https://api.alwaysdata.com/v1

help_more:
	@echo "[====== src-ctt-server =====]"

# deploy for alwaydata datacenter
deploy-ald: deploy
	curl --basic --request POST --user $(TOKEN): $(API)/site/$(ID)/restart/