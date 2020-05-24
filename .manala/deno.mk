# Deno config
ENTRY_DIR:=src
ENTRY:=app.ts
IMPORT_MAP:=import_map.json
ARGS:=--allow-env\
	  --allow-net\
	  --allow-read\
	  --unstable\
	  --importmap=$(ENTRY_DIR)/$(IMPORT_MAP)\
	  --config tsconfig.json

# Deployment (override this in Makefile)
REMOTE_DIR_DEPLOY:=/var/www
SSH_ADDRESS:=site.test
USER_DEPLOY:=root

.DEFAULT_GOAL := help
.PRECIOUS: start debug

help:
	@echo "[======== Deno Help ========]"
	@echo "Usage: make start | debug"
	@$(MAKE) help_more || true

# Run server
start:
	deno run $(ARGS) $(ENTRY_DIR)/$(ENTRY)

# Start with debugger
ARGS+=-A --inspect-brk
debug: start
	@echo 'Started in Debug mode : '

deploy:
	ssh $(USER_DEPLOY)@$(SSH_ADDRESS) "cd $(REMOTE_DIR_DEPLOY);\
	/bin/bash -c '\
	git fetch --all && git reset --hard upstream/master;'"

clear:
	rm -rf *.log
