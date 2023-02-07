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

### User Routes

| Route  | Path | Description | Body | Params |
| ------ | ---- | ----------- | ---- | ------ |
| GET  | `/users/` | List all users | none | none |
| GET | `/users/:id`  | Get a specific user | none | user ID |
| POST | `/users/`  | Add a user | `name`, `password`, `email` | none |
| PATCH | `/users/:id`  | Edit a user | `name`, `password`, `email` | user ID |
| DELETE | `/users/:id`  | Remove a user | none | user ID |
| POST | `/users/verify`  | Verify a user for login | `password`, `email` | none |
| PATCH | `/users/:id/address`  | Add an address for a user | `address` | user ID |
| PATCH | `/users/:id/phone`  | Add a phone number for a user | `phoneNumber` | user ID |
| PATCH | `/users/:id/age`  | Add an age for a user | `age` | user ID |
| PATCH | `/users/:id/gender`  | Add a gender for a user | `gender` | user ID |
| GET | `/users/:id/orderHistory`  | Get user's order history | none | user ID |
| GET | `/users/:id/favorites`  | Get user's favorite products | none | user ID |
| GET | `/users/:id/searchHistory`  | Get user's search history | none | user ID |
| PATCH | `/users/:id/orderHistory`  | Add order history | `products` (array of objects eg. [{_id: product id, quantity: product quantity}]), `total` | user ID |
| PATCH | `/users/:id/favorites`  | Add a favorite product | `productId` | user ID |
| PATCH | `/users/:id/searchHistory`  | Add a search history query | `query` | user ID |
| DELETE | `/users/:id/orderHistory/:orderHistoryId`  | Remove an order history item | none | user ID, order history ID |
| DELETE | `/users/:id/favorites/:productId`  | Remove a favorite product | none | user ID, product ID |
| DELETE | `/users/:id/searchHistory/:query`  | Remove a search history item | none | user ID, query |
| GET | `/users/:id/alarms/`  | Get users alarms | none | user ID |
| PATCH | `/users/:id/alarms`  | Add an alarm | `name`, `notes` (optional), `dose`, `repetition`, `alarmTime`, `startDate`(optional), `endDate` (optional), `days` (optional) | user ID |
| PATCH | `/users/:id/alarms/:alarmId`  | Edit an alardm | `name`, `notes` (optional), `dose`, `repetition`, `alarmTime`, `startDate` (optional), `endDate` (optional), `days` (optional) | user ID, alarm ID |
| DELETE | `/users/:id/alarms/:alarmId`  | Remove an alarm | none | user ID, alarm ID |

## Requirements

An environment file is required to run the project.\
a `.env` file that includes:

* `PORT` the port that the server listens to.
* `MONGODB_STRING` the MongoDB connection URI.
* `BCRYPT_SECRET` pepper for bcrypt used in password encryption.
* `SALT` salt rounds for bcrypt used in password encryption.
