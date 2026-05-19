SHELL := /bin/bash

install:
	@echo "Installing package..."
	@cp ./backend/.env.example ./backend/.env || true
	@cp ./frontend/.env.example ./frontend/.env || true
	@echo "All done!"

install-backend:
	@echo "Installing backend..."
	@cp ./backend/.env.example ./backend/.env || true
	@cp ./backend/phpstan.dist.neon ./backend/phpstan.neon || true
	@cd ./backend && composer install --no-interaction --ignore-platform-req=ext-redis
	@echo "Backend installed!"

install-frontend:
	@echo "Installing frontend..."
	@cp ./frontend/.env.example ./frontend/.env || true
	@cd ./frontend && npm install
	@echo "Frontend installed!"

start:
	@echo "Build App..."
	@docker compose up -d --build
	@echo "All done!"

setup:
	@make install
	@make start

stop:
	@docker compose down $(or $(word 2,$(MAKECMDGOALS)),-v)

logs:
	@docker compose logs $(word 2,$(MAKECMDGOALS))

exec:
	@docker compose exec -it $(word 2,$(MAKECMDGOALS)) $(word 3,$(MAKECMDGOALS))

format:
	@cd frontend && npm run format

lint-frontend-docker:
	@docker compose exec -T frontend npm run lint

lint-frontend:
	@cd frontend && npm run lint

phpstan-backend-docker:
	@docker compose exec -T backend composer phpstan

phpstan-backend:
	@cd backend && composer phpstan

test:
	@make lint-frontend
	@make phpstan-backend