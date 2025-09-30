
# Caching Proxy

A lightweight caching proxy server built with **Node.js** and **Express**.
It forwards requests to an origin server, caches responses locally, and serves cached data on repeated requests to improve performance and reduce API calls.

It also supports a simple CLI interface:

caching-proxy --port <number> --origin <url>
caching-proxy --clear-cache

## Features

- Proxies requests to any JSON API origin.
- Caches responses to disk in ./data/cached-requests.json.
- Adds X-Cache: HIT or X-Cache: MISS headers for easy cache tracking.
- Supports CLI arguments for custom port and origin URL.
- Supports cache clearing via CLI.

## Project Structure

.
├── bin/
│   └── caching-proxy        # CLI entry point
├── cache-handler.js         # Cache management
├── server.js                # Express proxy server
├── data/
│   └── cached-requests.json # Cache storage
├── package.json
└── README.md

## Installation

Clone the repository and install dependencies:

git clone https://github.com/<your-username>/caching-proxy.git
cd caching-proxy
npm install

Link the CLI tool globally:

npm link

## Usage

### Start the proxy

caching-proxy --port 3000 --origin http://dummyjson.com

This starts the proxy server on port 3000, forwarding requests to http://dummyjson.com.

Example request:

curl http://localhost:3000/products

You will get headers:

- X-Cache: MISS → First request, cache miss.
- X-Cache: HIT → Subsequent request, served from cache.

### Clear the cache

caching-proxy --clear-cache

This deletes the cache file (./data/cached-requests.json).

## Configuration

- --port : Set the proxy server port (default: 3000)
- --origin : Set the origin server URL (default: https://dummyjson.com)
- --clear-cache : Clear cached data

## Example

Run proxy for JSONPlaceholder:

caching-proxy --port 5000 --origin https://jsonplaceholder.typicode.com

Fetch data:

curl http://localhost:5000/posts

### Clear cache

caching-proxy --clear-cache

## How it Works

1. Client sends request to proxy.
2. Proxy checks if the request URL exists in cache.
3. If cache hit: returns stored data with X-Cache: HIT.
4. If cache miss: forwards request to origin, stores response, returns data with X-Cache: MISS.

## License

MIT License — feel free to modify and reuse.

## Future Improvements

- Add cache expiration.
- Support query parameters and POST requests.
- Add better CLI argument parsing with commander.js.
