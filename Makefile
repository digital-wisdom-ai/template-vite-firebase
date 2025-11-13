.PHONY: emulator build lint format checkFormat test clean tokensSync tokensUpload generateIcons storybook

emulator: lint format testRun
	pnpm dev

build:
	pnpm build

preCommit:
	pnpm husky
	.husky/pre-commit

lint:
	pnpm lint:fix

test:
	pnpm test

testRun:
	pnpm test-run

checkFormat:
	@echo "Checking format..."
	@pnpm format:check

format:
	@echo "Formatting..."
	@pnpm format:write

clean:
	rm -rf dist
	rm -rf node_modules

beStaging:
	rm -f .env
	ln -s .env.staging .env

beProduction:
	rm -f .env
	ln -s .env.prod .env

GIT_FEATURE_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
GIT_LOCAL_COMMIT := $(shell git rev-parse HEAD)
UPSTREAM_BRANCH := $(shell git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null)
GIT_REMOTE_COMMIT := $(shell [ -n '$(UPSTREAM_BRANCH)' ] && git rev-parse $(UPSTREAM_BRANCH) || echo 'NO_UPSTREAM')

stagingToProd:
	git fetch origin prod:prod
	git switch prod
	git fetch origin staging:staging
	git merge staging
	git push
	git switch staging

deployFeatureToProd: checkPushed stagingToProd
	@echo "Current branch: ${GIT_FEATURE_BRANCH}"
	git branch -D ${GIT_FEATURE_BRANCH}

featureComplete: checkPushed
	git fetch origin staging:staging
	git switch staging
	git branch -D ${GIT_FEATURE_BRANCH}
	git remote prune origin

checkPushed:
	@test "$(GIT_LOCAL_COMMIT)" = "$(GIT_REMOTE_COMMIT)"

tokensGenerate:
	npx style-dictionary build

tokensSync:
	node scripts/designTokens.js sync
	npx style-dictionary build

tokensUpload:
	node scripts/designTokens.js upload

generateIcons:
	@echo "Generating all favicon and PWA icons from BaseIcon.png..."
	node scripts/generateIcons.js

storybook:
	pnpm storybook
