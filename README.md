# transaction-validator-rabobank

An assignment for the Rabobank

- NPM version: 9.3.1
- Node version: 18.14.1

## Technical decisions

- For the front-end I took `NextJS` as a framework. It is easy to set up for data fetching, typescript and styling.
- For the back-end I took `ExpressJS` as a framework since it is the one framework I know how to use to set up a relative simple API.

---

## How to run

### Separately

#### Front-end

- `cd client`
- `npm install`
- `npm run dev`

Or if you want to run it from the root:

Prerequisite packages are installed with: `cd client && npm install`

- `npm run start:client`

#### Back-end

- `cd server`
- `npm install`
- `npm run dev`

Or if you want to run it from the root:

Prerequisite packages are installed with: `cd server && npm install`

- `npm run start:server`

---

## How to test

### Front-end

- `cd client`
- `npm run test`

### Back-end

- `cd server`
- `npm run test`
