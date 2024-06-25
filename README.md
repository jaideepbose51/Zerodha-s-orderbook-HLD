# Trade Matching Engine

This repository contains a basic implementation of a trade matching engine using Node.js and TypeScript. The engine allows users to place buy (bid) and sell (ask) orders for a stock (in this case, "GOOGLE") and provides endpoints to view order book depth and user balances.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data Structures](#data-structures)
- [Functions](#functions)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/trade-matching-engine.git
    cd trade-matching-engine
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

The server will be running on `http://localhost:3000`.

## Usage

You can interact with the server using tools like `curl`, `Postman`, or any other HTTP client. Below are the available endpoints and their descriptions.

## API Endpoints

### 1. Place an Order

- **URL:** `/orders`
- **Method:** `POST`
- **Body Parameters:**
  - `side`: `string` ("bid" or "ask")
  - `price`: `number`
  - `quantity`: `number`
  - `userId`: `string`

- **Response:**
  ```json
  {
    "filledQuantity": number
  }
- Example:
  ``` bash
  curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
        "side": "bid",
        "price": 1500,
        "quantity": 5,
        "userId": "1"
      }'
### 2. Get Order Book Depth
- URL: '/depth'
- Method: 'GET'
- Response:
  ``` json
  {
  "depth": {
    "price": {
      "type": "bid" | "ask",
      "quantity": number
    }
  }
}
- Example:
  ```
  http://localhost:3000/depth
- Get User Balances
  - URL: '/balances/:userId'
  - Method: 'GET'
  - Response:
    '''
    {
  "balances": {
    "USD": number,
    "GOOGLE": number
  }
}
- Example
  ```
  curl http://localhost:3000/balances/1


## Data Structures

### User 
```
 interface User {
     id: string;
     balances: Balance;
 }

 interface Balance {
     [key: string]: number;
 }
```
### Orders
```interface Orders {
    userId: string;
    price: number;
    quantity: number;
}
```
## Functions
### flipBalance
#### Updates the balances of two users after a trade.
```
function flipBalance(userId1: string, userId2: string, quantity: number, price: number): void
```
## fillOrders
Matches orders and returns the remaining quantity if the order is partially filled or not filled at all.
```
function fillOrders(side: string, price: number, quantity: number, userId: string): number
