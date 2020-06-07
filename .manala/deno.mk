# Deno config
ENTRY_DIR:=src
ENTRY:=app.ts
IMPORT_MAP:=import-map.json
BIN_DIR:=bin
# Argument group for different usages
ARGS:= -A --importmap=$(IMPORT_MAP) --unstable --config=$(PWD)/tsconfig.json

EXE:=cd $(ENTRY_DIR) && deno run
DEBUG_EXE:=cd $(ENTRY_DIR) && denon run

# Deployment (need to override these vars in Makefile)
REMOTE_DIR_DEPLOY:=/var/www
SSH_ADDRESS:=site.test
USER_DEPLOY:=root
USER_PASS:=root
GIT_URL:=

.DEFAULT_GOAL := help
.PRECIOUS: start debug

help:
	@echo "[======== Deno Help ========]"
	@echo "Usage: make start | debug"
	@echo "Format: make lint"
	@echo "Testing: make tests"
	@$(MAKE) help_more || true

# Run server
start:
	$(EXE) $(ARGS) $(ENTRY)

full:
	$(EXE) $(ARGS) $(ENTRY)

lint:
	deno fmt $(ENTRY_DIR)

tests:
	deno test $(ENTRY_DIR)/**tests/**

# Start with debugger
debug:
	@echo 'Start in Debug mode : '
	@echo 'Open chrome://inspect/#devices'
	$(DEBUG_EXE) -L debug $(ARGS) $(ENTRY)
	#--inspect-brk

deploy:
	ssh $(USER_DEPLOY)@$(SSH_ADDRESS) "cd $(REMOTE_DIR_DEPLOY);\
	/bin/bash -c '\
	git fetch --all && git reset --hard upstream/master;'"

init-prod:
	ssh $(USER_DEPLOY)@$(SSH_ADDRESS) "cd $(REMOTE_DIR_DEPLOY);\
	/bin/bash -c '\
	git clone $(GIT_URL)'"

clear:
	rm -rf *.log
