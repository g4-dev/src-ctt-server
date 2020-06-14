SHELL:=/bin/bash
# Deno config
ENTRY_DIR:=src
ENTRY:=app.ts
IMPORT_MAP:=import-map.json
BIN_DIR:=bin
TEST_DIR:=$(ENTRY_DIR)/tests
TS_CONFIG:=tsconfig.json
DENO_VERSION:=1.0.2
# Argument group for different usages
ARGS:= -A --config=$(TS_CONFIG) --unstable

EXE:=cd $(ENTRY_DIR) && deno
DEBUG_EXE:=cd $(ENTRY_DIR) && denon

# Deployment (need to override these vars in Makefile)
SSH_ADDRESS?=
USER_DEPLOY?=

# Git config
ORG:=
REPO:=
GIT_URL:=https://github.com/$(ORG)/$(REPO).git
GIT_DIR:=

# Command by ssh
ssh=ssh $(USER_DEPLOY)@$(SSH_ADDRESS) $(1)

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
	$(EXE) run $(ARGS) $(ENTRY)

reload:
	$(EXE) run --reload $(ARGS) $(ENTRY)

prod:
	$(EXE) run -M info $(ARGS) $(ENTRY)

full:
	$(EXE) run $(ARGS) $(ENTRY)

lint:
	deno fmt $(ENTRY_DIR)

test-deco:
	rm -rf $(TEST_DIR)/database.sqlite
	touch $(TEST_DIR)/database.sqlite

tests: test-deco
	$(EXE) test $(ARGS)

tests-debug: test-deco
	$(EXE) test --failfast $(ARGS)

# Start with debugger
debug:
	@echo 'Start in Debug mode : '
	@echo 'Open chrome://inspect/#devices'
	$(DEBUG_EXE) run $(ARGS)  $(ENTRY)
	# --inspect-brk # TODO check update --inspect-brk

install:
	curl -fsSL https://deno.land/x/install/install.sh | sh -s v$(DENO_VERSION)
	deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts
	yarn add global -D typescript-deno-plugin typescript

clear:
	rm -rf *.log
