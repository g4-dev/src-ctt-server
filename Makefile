# Node makefile
start:
	deno run --importmap=import_map.json --allow-env --allow-net --allow-read app.js