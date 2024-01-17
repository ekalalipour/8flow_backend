# Cupcake Store API
## Description
#### The Cupcake Store API is a versatile and user-friendly interface designed to manage a virtual cupcake store's inventory and orders. This RESTful API allows clients to interact with a server to perform a variety of tasks such as adding new cupcake varieties to the store, retrieving details about available cupcakes, updating existing cupcake information, and deleting cupcakes from the store's inventory.

### Key features and capabilities of the API include:

- **Create**: Add new and unique cupcake varieties to the store's inventory, complete with details like name, price, description, and ingredients.
- **Read**: Fetch detailed listings of all cupcakes or retrieve information about a specific cupcake using its unique ID.
- **Update**: Modify existing cupcake details to keep up with changes in recipes, pricing, or any other attributes.
- **Delete**: Remove cupcakes from the inventory, useful for discontinuing certain varieties or managing stock.

#### This API is built using the Node.js and Express.js ecosystem, ensuring a fast and scalable solution for the cupcake store's backend needs. 

## Installation
### Follow these steps to install and set up the project:
```
# Clone the repository

# Navigate to the repository directory
cd 8flow_backend

# Install dependencies
npm install
```
## Usage
### Instructions on how to run and use the application:
```
# To start the server
npm start

# with nodemon
npm run dev
```
## API Endpoints
Detailed list of available API endpoints:

### POST `/cupcake`
- **Description**: Adds a new cupcake to the store.
- **Body**: Requires a `name` (string) and `price` (number). Optional fields include `description` (string) and `ingredients` (array of strings).

### GET `/cupcake`
- **Description**: Retrieves a list of all cupcakes.
- **Response**: Returns an array of cupcake objects.

### GET `/cupcake/{cupcakeId}`
- **Description**: Retrieves a specific cupcake by its ID.
- **Parameters**: `cupcakeId` (integer) - The ID of the cupcake to retrieve.
- **Response**: Returns a single cupcake object if found.

### PUT `/cupcake/{cupcakeId}`
- **Description**: Updates an existing cupcake by its ID.
- **Parameters**: `cupcakeId` (integer) - The ID of the cupcake to update.
- **Body**: Can update `name`, `price`, `description`, and/or `ingredients`.
- **Response**: Returns the updated cupcake object if the update is successful.

### DELETE `/cupcake/{cupcakeId}`
- **Description**: Deletes a specific cupcake by its ID.
- **Parameters**: `cupcakeId` (integer) - The ID of the cupcake to delete.
- **Response**: Confirmation message if the deletion is successful.

# Testing
  The Cupcake Store API includes a comprehensive suite of automated tests, developed using Jest and Supertest.  
  Jest is utilized for its powerful testing capabilities and ease of use, while Supertest is employed for testing HTTP endpoints, ensuring each API route behaves as expected.     
    
  These tests cover various functionalities of the API, verifying that all endpoints respond correctly under a range of conditions, including both typical use cases and edge cases.
### Run the following command:
```
npm test
```
