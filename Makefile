.PHONY: build up down logs backend-logs frontend-logs clean

# Build all docker containers
build:
	docker compose build

# Start all services in the background
up:
	docker compose up -d

# Stop all services
down:
	docker compose down

# View logs for all services
logs:
	docker compose logs -f

# View logs for backend only
backend-logs:
	docker compose logs -f backend

# View logs for frontend only
frontend-logs:
	docker compose logs -f frontend

# Stop services and remove containers, networks, volumes, and images created by up
clean:
	docker compose down -v --remove-orphans
