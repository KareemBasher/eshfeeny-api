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
| POST | `/users/checkEmail`  | Get a specific user using their email | `email` | none |
| POST | `/users/`  | Create a new user | `name`, `password`, `email`, `type` | none |
| PATCH | `/users/:id`  | Edit a user | `name`, `password`, `email`, `type` | user ID |
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
| PATCH | `/users/:id/alarms`  | Add an alarm | `name`, `notes`(optional), `dose`, `repetition`, `alarmTime`, `startDate`(optional), `endDate`(optional), `days`(optional) | user ID |
| PATCH | `/users/:id/alarms/:alarmId`  | Edit an alarm | `name`, `notes`(optional), `dose`, `repetition`, `alarmTime`, `startDate`(optional), `endDate`(optional), `days`(optional) | user ID, alarm ID |
| DELETE | `/users/:id/alarms/:alarmId`  | Remove an alarm | none | user ID, alarm ID |
| GET | `/users/:id/cart`  | Get user's cart items | none | user ID |
| PATCH | `/users/:id/cart`  | Add a cart item | `productId` | user ID |
| DELETE | `/users/:id/cart/:productId`  | Remove a cart item | none | user ID, product ID |
| PATCH | `/users/:id/cart/:productId/1`  | Increment the quantity of a cart item | none | user ID, productId |
| PATCH | `/users/:id/cart/:productId/-1`  | Decrement the quantity of a cart item | none | user ID, productId |
| PATCH | `/users/:id/profile`  | Update a user's name, email, and/or phone number | `name`, `email`, `phoneNumber` | user ID |
| PATCH | `/users/:id/password`  | Update a user's password | `password` | user ID |
| PATCH | `/users/:id/compareAndUpdate`  | Compare and update a user's password | `newPassword`, `oldPassword` | user ID |
| PATCH | `/users/:id/insuranceCards`  | Add an insurance card to a user | `insuranceCard` object containing `name`, `number`, `nameOnCard`, `imageURL` | user ID |
| GET | `/users/:id/insuranceCards`  | Get all users's insurance cards | none | user ID |

### Products Routes

| Route  | Path | Description | Body | Params |
| ------ | ---- | ----------- | ---- | ------ |
| GET  | `/products/` | List all products | none | none |
| GET | `/products/:id`  | Get a specific product | none | product ID |
| GET | `/products/getMany/:ids`  | Get many products using their IDs | none | product IDs separated by & |
| POST | `/products/`  | Add a product | An object that contains: `nameAr`, `nameEn`, `description`, `price`, `volume`(optional), `amount` (optional), `useCases[]`, `activeIngredient[]` (opitonal), `sideEffects[]`, `type`, `category[]`, `usage[]`, `warning[]`, `brand`, `images[]` | none |
| PATCH | `/products/:id`  | Edit a product | `nameAr`, `nameEn`, `description`, `price`, `volume`(optional), `amount` (optional), `useCases[]`, `activeIngredient[]` (opitonal), `sideEffects[]`, `type[]`, `category[]`, `usage[]`, `warning[]`, `brand`, `images[]` | product ID |
| DELETE | `/products/:id`  | Remove a product | none | product ID |
| GET  | `/products/category/:category` | Get all products from a certain category | none | category |
| GET  | `/products/brand/:brand` | Get all products from a certain brand | none | brand |
| GET  | `/products/search/:query` | Search for a product using a query (has autocomplete) | none | query |
| GET  | `/products/user/:userId/orderHistory/:orderHistoryId` | Get all products from a user's order history | none | user ID, order ID |
| GET  | `/products/user/:userId/favorites` | Get all user favorite products | none | user ID |
| GET  | `/products/alternatives/:id` | Get all alternatives to a certain product | none | id |
| GET  | `/products/type/:type` | Get all products from a certain type | none | type |
| GET  | `/products/user/:userId/cart/:productId` | Check if an item is in the user's cart | none | user ID, product ID |

### Dashboard Routes

| Route  | Path | Description | Body | Params |
| ------ | ---- | ----------- | ---- | ------ |
| GET  | `/email/:userEmail` | Send an email with a verification code | none | user email |
| POST  | `/imageSearch/` | Get search results for an image | `imageURL` | none |

### Insurance Companies Routes

| Route  | Path | Description | Body | Params |
| ------ | ---- | ----------- | ---- | ------ |
| GET  | `/insuranceCompanies` | Get all insurance companies | none | none |
| GET  | `/insuranceCompanies` | Get a certain insurance company using its ID | `imageURL` | insurance
company id |

### Pharmacy Routes

| Route  | Path | Description | Body | Params |
| ------ | ---- | ----------- | ---- | ------ |
| GET  | `/pharmacies/` | List all pharmacies | none | none |
| GET | `/pharmacies/:id`  | Get a specific pharmacy using an ID | none | pharmacy ID |
| POST | `/pharmacies/checkEmail`  | Get a specific pharmacy using their email | `email` | none |
| POST | `/pharmacies/`  | Create a new pharmacy | `name`, `password`, `email` | none |
| PATCH | `/pharmacies/:id`  | Edit a pharmacy | `name`, `password`, `email` | pharmacy ID |
| DELETE | `/pharmacies/:id`  | Remove a pharmacy | none | pharmacy ID |
| POST | `/pharmacies/verify`  | Verify pharmacy's data for login | `email`, `password` | none |
| PATCH | `/pharmacies/:id/profile`  | Update pharmacy's profile data | `email`, `name`, `phoneNumber`, `address` | none |
| PATCH | `/pharmacies/:id/password`  | Update pharmacy's password | `email`, `password` | none |
| POST | `/pharmacies/available`  | Get all pharmacies that have a list of certain products | `products` (string array of ids)| none |
| GET  | `/pharmacies/:id/favorites` | Get all favorite products for a pharmacy | none | pharmacy ID |
| PATCH  | `/pharmacies/:id/favorites` | Add a favorite product | `productId` | none |
| DELETE  | `pharmacies/:id/favorites/:productId` | List all pharmacies | none | pharmacy ID, product ID |
| GET | `/pharmacies/:id/cart`  | Get all cart items | none | pharmacy ID |
| PATCH | `/pharmacies/:id/cart`  | Add cart item | `productId` | pharmacy ID |
| DELETE | `/pharmacies/:id/cart/:productId`  | Remove a cart item | none | pharmacy ID, product ID |
| PATCH | `/pharmacies/:id/cart/:productId/1`  | Increment a cart item | none | pharmacy ID, product ID |
| PATCH | `/pharmacies/:id/cart/:productId/-1`  | Decrement a cart item | none | pharmacy ID, product ID | |

## Requirements

An environment file is required to run the project.\
a `.env` file that includes:

* `PORT` the port that the server listens to.
* `MONGODB_STRING` the MongoDB connection URI.
* `BCRYPT_SECRET` pepper for bcrypt used in password encryption.
* `SALT` salt rounds for bcrypt used in password encryption.
* `SENDGRID_API` SendGrid WebAPI key for sending emails.
* `SENDGRID_EMAIL` SendGrid Authorized Sender email.
* `SENDGRID_TEMPLATE_ID` SendGrid email template ID.
* `MS_AZURE_CV_KEY` Microsoft Azure Computer Vision API key for image search.
* `MS_AZURE_CV_URL` Microsoft Azure Computer Vision API endpoint for image search.
