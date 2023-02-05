# Eshfeeny Graduation Project API

This is the back-end for the graduation project Eshfeeny

## Installation

Using `npm` run

```bash
npm install
```

## Usage

To start the server, run:
```bash
npm start
> Server is running on port: <PORT>
```

## Routes

#### User Routes
| Route  | Path | Description | Body | Params |
| ------ | ---- | ----------- | ---- | ------ |
| GET  | `/users/` | List all users | none | none |
| GET | `/users/:id`  | Get a specific user | none | user ID |
| POST | `/users/`  | Add a user | `name`, `password`, `email` | none |
| PATCH | `/users/:id`  | Edit a user | `name`, `password`, `email` | user ID |
| DELETE | `/users/:id`  | Remove a user | none | user ID |
| POST | `/users/verify`  | Verify a user for login | `password`, `email` | none |
| PATCH | `/users/:id/address`  | Add an address for a user | `address` | user ID |

## Requirements

An environment file is required to run the project.\
a `.env` file that includes:

* `PORT` the port that the server listens to.
* `MONGODB_STRING` the MongoDB connection URI.
* `BCRYPT_SECRET` pepper for bcrypt used in password encryption.
* `SALT` salt rounds for bcrypt used in password encryption.