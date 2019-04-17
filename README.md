[![Build Status](https://travis-ci.org/gjunkie/hapi-react-kit.svg?branch=master)](https://travis-ci.org/gjunkie/hapi-react-kit) [![Known Vulnerabilities](https://snyk.io/test/github/gjunkie/hapi-react-kit/badge.svg)](https://snyk.io/test/github/gjunkie/hapi-react-kit) [![Known Vulnerabilities](https://david-dm.org/gjunkie/hapi-react-kit.svg)](https://david-dm.org/gjunkie/hapi-react-kit) [![Known Dev Vulnerabilities](https://david-dm.org/gjunkie/hapi-react-kit/dev-status.svg)](https://david-dm.org/gjunkie/hapi-react-kit?type=dev)

## Appcademy

An Accademy Awards voting app. It's got a ReactJS front-end and a Hapi.js node backend. Uses MongoDB.

## Requirements
While the server and client-side of `appcademy` can run independently while in development, you will require [Docker](https://docker.com/) to deploy this so that both servers can run simultaneously.

## Installation

- `git clone git@github.com:gjunkie/appcademy.git`
- `cd appcademy/client`
- `npm install`
- `cd appcademy/server`
- `npm install`

## Running the App

### Using Docker Compose
- `docker-compose up`

### Running locally without Docker
- `cd appcademy/client`
- `npm start`
- open new terminal tab.
- `cd appcademy/server`
- `npm start`

## Tests

- cd into the project.
- `npm test`

## License

MIT (go nuts)
