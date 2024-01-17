# Cupcake Store API
## Description
### A brief description of the Cupcake Store API. Explain the main purpose and any unique features or capabilities of the API.

## Installation
### Follow these steps to install and set up the project:
```
# Clone the repository
git clone YOUR_REPOSITORY_URL

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

# For development mode (if applicable)
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
## How to run the tests included in the project:
```
npm test
```
