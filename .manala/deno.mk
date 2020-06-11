# Deno config
ENTRY_DIR:=src
ENTRY:=app.ts
IMPORT_MAP:=import-map.json
BIN_DIR:=bin
# Argument group for different usages
ARGS:= -A --config=$(PWD)/tsconfig.json --unstable

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

tests:
	$(EXE) test $(ARGS)

# Start with debugger
debug:
	@echo 'Start in Debug mode : '
	@echo 'Open chrome://inspect/#devices'
	$(DEBUG_EXE) run $(ARGS) --inspect-brk $(ENTRY)

clear:
	rm -rf *.log
