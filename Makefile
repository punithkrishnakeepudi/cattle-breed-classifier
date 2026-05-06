.PHONY: help build up down logs backend-logs frontend-logs clean install-local run-frontend-local run-backend-local

# Default target
.DEFAULT_GOAL := help

##@ Docker Commands (Requires Docker to be installed)

build: ## Build all docker containers
	docker compose build

up: ## Start all services in the background
	docker compose up -d

down: ## Stop all services
	docker compose down

logs: ## View logs for all services
	docker compose logs -f

backend-logs: ## View logs for backend only
	docker compose logs -f backend

frontend-logs: ## View logs for frontend only
	docker compose logs -f frontend

clean: ## Stop services and remove containers, networks, volumes, and images
	docker compose down -v --remove-orphans

##@ Local Development Commands (If you don't have Docker installed)

install-local: ## Install local dependencies for both frontend and backend
	@echo "Installing Frontend Dependencies..."
	npm install
	@echo "Installing Backend Dependencies..."
	pip install -r backend/requirements.txt

run-frontend-local: ## Run frontend locally without Docker
	npm run dev

run-backend-local: ## Run backend locally without Docker
	export PYTHONPATH=$$PWD && python backend/app.py

##@ Helper

help: ## Display this help message
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
