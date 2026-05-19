SHELL := bash

install:
	@echo "Installing package..."
	@copy .\backend\.env.example .\backend\.env
	@copy .\frontend\.env.example .\frontend\.env
	@echo All done !

start: 
	@echo Build App...
	@docker compose up -d --build
	@echo All done !

setup:
	@make install
	@make start

stop:
	@docker compose down $(or $(word 2,$(MAKECMDGOALS)), -v)

logs:
	@docker compose logs $(word 2,$(MAKECMDGOALS))

exec:
	@docker compose exec -T -it $(word 2,$(MAKECMDGOALS)) $(word 3,$(MAKECMDGOALS))

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