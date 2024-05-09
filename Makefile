run-dev:
	ENV=development docker-compose -f docker-compose.dev.yml up -d

stop-dev:
	ENV=development docker-compose -f docker-compose.dev.yml down

# run-prod:
# 	ENV=production docker-compose -f docker-compose.prod.yml up -d

# stop-prod:
# 	ENV=production docker-compose -f docker-compose.prod.yml down

# rebuild-api:
# 	ENV=production docker-compose -f docker-compose.prod.yml up -d --build --no-deps api-server