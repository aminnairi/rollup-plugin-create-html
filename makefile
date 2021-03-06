.PHONY: start stop restart install build publish

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

install: start
	docker-compose exec node npm install

build: install
	docker-compose exec node npm run build

publish: build
	docker-compose exec node npm publish --access public
