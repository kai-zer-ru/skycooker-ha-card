VERSION ?= 1.4.1
NODE ?= node
NPM ?= npm

.PHONY: prepare lint typecheck test build version-check ci act-push act-release tag-release version clear dev \
	1 2 3 4 5 6 7 8 9 10 12 16 32

prepare:
	$(NPM) ci

version-check:
	$(NODE) scripts/check_versions.mjs

lint: prepare version-check
	$(NPM) run lint

typecheck: prepare
	$(NPM) exec tsc -- --noEmit

test: lint typecheck

build: test
	$(NPM) run build
	@test -f dist/skycooker-ha-card.js

ci: build

ACT_PLATFORM := -P ubuntu-latest=catthehacker/ubuntu:full-latest
ACT_CONCURRENT_JOBS ?= 2
ACT_ARTIFACT_PATH ?= $(CURDIR)/.artifacts
ACT_FLAGS = --pull=false --rebuild=false --artifact-server-path $(ACT_ARTIFACT_PATH) --concurrent-jobs

act-push:
	@git rev-parse HEAD >/dev/null 2>&1 || (echo "act-push: нужен хотя бы один git commit" && exit 1)
	@mkdir -p "$(ACT_ARTIFACT_PATH)"
	@jobs='$(word 2,$(MAKECMDGOALS))'; \
	jobs="$${jobs:-$(ACT_CONCURRENT_JOBS)}"; \
	case "$$jobs" in ''|*[!0-9]*|0*) echo "act-push: concurrent jobs must be a positive integer (got '$$jobs')"; exit 1;; esac; \
	act push $(ACT_PLATFORM) $(ACT_FLAGS) $$jobs -W .github/workflows/ci.yml

act-release:
	@git rev-parse HEAD >/dev/null 2>&1 || (echo "act-release: нужен хотя бы один git commit" && exit 1)
	@test -n "$$GITHUB_TOKEN" || (echo "act-release: задайте GITHUB_TOKEN" && exit 1)
	@mkdir -p "$(ACT_ARTIFACT_PATH)"
	@jobs='$(word 2,$(MAKECMDGOALS))'; \
	jobs="$${jobs:-$(ACT_CONCURRENT_JOBS)}"; \
	case "$$jobs" in ''|*[!0-9]*|0*) echo "act-release: concurrent jobs must be a positive integer (got '$$jobs')"; exit 1;; esac; \
	act push $(ACT_PLATFORM) $(ACT_FLAGS) $$jobs -W .github/workflows/release.yml -e .github/act/tag-push.json -s GITHUB_TOKEN=$$GITHUB_TOKEN

tag-release:
	@chmod +x scripts/tag_release.sh
	@scripts/tag_release.sh

ifneq (,$(filter version,$(MAKECMDGOALS)))
  VERSION_GOAL := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  ifneq ($(VERSION_GOAL),)
    $(foreach v,$(VERSION_GOAL),$(eval $(v):;@:))
  endif
endif

version:
	@if [ -z "$(VERSION_GOAL)" ]; then \
		echo "Usage: make version vX.Y.Z"; \
		exit 1; \
	fi
	@chmod +x scripts/set_version.sh
	@scripts/set_version.sh $(VERSION_GOAL)

clear:
	rm -rf node_modules .artifacts .release-notes.md

dev:
	$(NPM) run dev

1 2 3 4 5 6 7 8 9 10 12 16 32:
	@:
