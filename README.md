# Likehome_project
Hotel lister website school project for spring 2022 semester (Work in progress)
# Tools
Built with ReactJS, Material UI, AWS, Stripe, MySQL, and ExpressJS
# How to Run on Local Server

Requires Node 16 or later and MySQL version 8.0.16 or later

Configure MySQL with the schema inside the sql directory

Run `create.sql` and `insert.sql` in that order

Create 2 .env files, one in the likehome and the other in the server directory

The likehome's .env file contains the url to the express backend

The sever's .env contains the Stripe secret key off of the Stripe API

Run `npm install` inside the both directories 

Run `npm start` to start the localhost

Run `npm run devStart` or `npm start` inside the server directory to start the server
