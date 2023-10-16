#!/bin/bash
./node_modules/sequelize-auto/bin/sequelize-auto -o "./app/models/" -d groot -h localhost -p 5432 -u $1 -x $2 -e postgres
