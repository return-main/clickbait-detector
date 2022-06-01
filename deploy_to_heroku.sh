#!/usr/bin/env bash
# heroku container:login
heroku container:push --recursive web
heroku container:release web -a clickbaitiness-api