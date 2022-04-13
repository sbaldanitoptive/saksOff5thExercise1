# Market API

---

## Software Requirements

- NodeJS version 16.13.0
- mysql-server
- imagemagick

## Setup

- Create database
  `mysql -uroot -p -e "create database marketapi"`
- Install Packages
  `npm install`
- Run migrations and seeds
  `npm run migrate`
  `npm run seed`
- Run server
  `npm run start`

## Open App

- Open Home Page at http://localhost:8080/
- Or check API Docs at http://localhost:8080/api-docs/

## Available Users for testing

| email                   | password      |
| ----------------------- | ------------- |
| fullcustomer@email.com  | fullcustomer  |
| basiccustomer@email.com | basiccustomer |
| admin@email.com         | admin         |
