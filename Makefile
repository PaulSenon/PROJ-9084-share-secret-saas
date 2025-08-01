# Set Bash as the shell so that Bash-specific syntax works
SHELL := /bin/bash

# Load environment variables in order of precedence (later files override earlier ones)
# The -include directive will silently ignore missing files
-include .env
-include .env.local

# Export all variables
export

SHELL := /bin/bash
COMPOSE_PROJECT_NAME = secret-share-saas
DOCKER_COMPOSE_FILE = ./docker/dev/docker-compose.yml
COMPOSE = docker compose --file $(DOCKER_COMPOSE_FILE) --project-name $(COMPOSE_PROJECT_NAME)

# Smart container execution - runs in existing container or starts new one
define run_in_container_smart
	@if [ $$( $(COMPOSE) ps --status running --services | grep -c app) -gt 0 ]; then \
		echo "attaching to running container..."; \
		$(COMPOSE) exec $(1) $(2); \
	else \
		echo "starting container and running command..."; \
		$(COMPOSE) run --rm --service-ports $(1) $(2) && \
		$(MAKE) stop; \
	fi
endef

# REQUIRED COMMANDS (must be implemented in every project)
install: ## Install everything needed for development
	$(MAKE) docker-build
	$(MAKE) pnpm-install

clean-install: ## Clear EVERYTHING and rebuild/reinstall all from scratch
	$(MAKE) clean
	$(MAKE) docker-build-force
	$(MAKE) pnpm-install

dev: ## Start development server
	$(MAKE) pnpm-dev

bash: ## Access container shell
	$(call run_in_container_smart,app,bash)

changeset: ## Run changeset command
	$(MAKE) pnpm-changeset

claude: ## Run claude code in container
	$(call run_in_container_smart,app,bash -c "claude")

run: ## Run arbitrary command in container (for LLM agents)
	$(call run_in_container_smart,app,$(cmd))

clean: ## Clean everything (containers, volumes, dependencies)
	$(MAKE) pnpm-clean
	$(COMPOSE) down --rmi all --volumes --remove-orphans

stop: ## Stop all containers
	$(COMPOSE) down --remove-orphans

# UTILITY COMMANDS
docker-build: ## Build development image
	$(COMPOSE) build

docker-build-force: ## Force rebuild image
	$(COMPOSE) build --no-cache

create-env-files: ## Create required environment files
	@if [ ! -f .env.local ]; then \
		echo "# LOCAL SECRETS - NEVER COMMIT" > .env.local; \
	fi

pnpm-install: ## Install dependencies
	$(call run_in_container_smart,app,bash -c "pnpm install")

pnpm-build: ## Build production image
	$(call run_in_container_smart,app,bash -c "pnpm run build")

pnpm-start: ## Start production image
	$(call run_in_container_smart,app,bash -c "pnpm start")

pnpm-clean: ## Clean production image
	$(call run_in_container_smart,app,bash -c "pnpm run clean")

pnpm-dev: ## Start development server
	$(call run_in_container_smart,app,bash -c "pnpm run dev")

pnpm-changeset: ## Run changeset command
	$(call run_in_container_smart,app,bash -c "pnpm changeset")

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
