const db = require('../data/db');

// Handler for adding a new cupcake
const addCupcake = (req, res, next) => {
  try {
    const {name, price, description, ingredients} = req.body;

    // Validation for mandatory fields: name and price
    if (!name || typeof name !== 'string' || !price || typeof price !== 'number') {
      return res.status(405).json({error: 'Invalid input data'})
    }

    // Validation for optional fields: description and ingredients
    if ((description && typeof description !== 'string') ||
    (ingredients && (!Array.isArray(ingredients) || !ingredients.every(ingredient => typeof ingredient === 'string')))) {
    return res.status(405).json({ error: 'Invalid input data'});
    }

      // Add cupcake to database and return the added cupcake
    const newCupcake = {name, price, description, ingredients };
    const addedCupcake = db.addCupcake(newCupcake);
    res.status(201).json(addedCupcake)

  } catch(err) {
      console.log(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in addCupcake',
          status: 500,
          message: { err: 'cupcakeController in addCupcake: check server log for details' },
        });
  }
};

// Handler for retrieving all cupcakes
const getCupcakes = (req, res, next) => {
  try {
    const result = db.getCupcakes();
    res.status(200).json({message: "Succesful operation", data: result});

  } catch(err) {
      console.log(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in getCupcake',
          status: 500,
          message: { err: 'cupcakeController in getCupcake: check server log for details' },
        });
  }
};

// Handler for retrieving a cupcake by its ID
const getCupcakeById = (req, res, next) => {
  try {
    // Parse the ID from request parameters and validate it
    const id = parseInt(req.params.cupcakeId);
    
    const cupcake = db.getCupcakeById(id);

    // Check if Id is a valid integer
    if (isNaN(id)){
      return res.status(400).json({message: "Invalid ID supplied"})
    }

    if (!cupcake) {
      return res.status(404).json({message: "Cupcake not found"})
    }

    res.status(200).json({message: "Succesful operation", data: cupcake})

  } catch(err) {
      console.log(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in getCupcakeById',
          status: 500,
          message: { err: 'cupcakeController in getCupcakeById: check server log for details' },
        });
  }
};

// Handler for updating a cupcake's details by its ID
const updateCupcake = (req, res, next) => {
  try{
    const cupcakeId = parseInt(req.params.cupcakeId);
    const {name, price, description, ingredients} = req.body;

    // Check if Id is a valid integer
    if (isNaN(cupcakeId)){
      return res.status(400).json({message: "Invalid ID supplied"})
    }

    // Validation for mandatory fields: name and price
    if (!name || typeof name !== 'string' || !price || typeof price !== 'number') {
      return res.status(405).json({error: 'Validation exception'})
    }

    // Validation for optional fields: description and ingredients
    if ((description && typeof description !== 'string') ||
    (ingredients && (!Array.isArray(ingredients) || !ingredients.every(ingredient => typeof ingredient === 'string')))) {
    return res.status(405).json({ error: 'Validation exception'});
    }

    const updatedCupcake = { name, price, description, ingredients };
    const result = db.updateCupcake(cupcakeId, updatedCupcake);

    // Check if the cupcake was found and updated
    if(!result) {
      return res.status(404).json({message: "Cupcake not found"})
    }

    res.status(200).json({message: "Succesful operation", data: result});

  } catch(err) {
      console.log(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in updateCupcake',
          status: 500,
          message: { err: 'cupcakeController in updateCupcake: check server log for details' },
        });
  }
};

// Handler for deleting a cupcake by its ID
const deleteCupcake = (req, res, next) => {
  try {
    const cupcakeId = parseInt(req.params.cupcakeId);

    // Check if Id is a valid integer
    if (isNaN(cupcakeId)){
      return res.status(400).json({message: "Invalid ID supplied"})
    }

    const wasDeleted = db.deleteCupcake(cupcakeId);

    if (!wasDeleted) {
      return res.status(404).json({message: "Cupcake not found"})
    }

    return res.status(200).json({"message": "Succesful operation"})

  } catch(err) {
      console.log(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in deleteCupcake',
          status: 500,
          message: { err: 'cupcakeController in deleteCupcake: check server log for details' },
        });
  }
};

module.exports = {
  addCupcake,
  getCupcakes,
  getCupcakeById,
  updateCupcake,
  deleteCupcake
};