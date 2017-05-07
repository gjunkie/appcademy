[![Build Status](https://travis-ci.org/gjunkie/appcademy.svg?branch=master)](https://travis-ci.org/gjunkie/appcademy)

## Appcademy Awards
This started as a small pet project to vote on the Oscars with friends and family.

## Installation

- `git clone git@github.com:gjunkie/appcademy.git`
- `cd `appcademy
- `npm install`
- `npm start`
- open second terminal window.
- `cd appcademy/server`
- `npm install`
- `npm start`

## Deployment
Since the client and the API in this project are in the same project, and each needs to run a server, I'd recommend using [Docker Compose](https://docs.docker.com/compose/) for deployment. Otherwise, it would pretty easy to split this repo in two and deploy them separately.

## Tests
- cd into the project.
- `npm test`

## License
MIT (go nuts)
