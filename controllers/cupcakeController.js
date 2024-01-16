const db = require('../data/db');

const addCupcake = (req, res, next) => {
  try {
    const {name, price, description, ingredients} = req.body;

    // Validation for mandatory fields: name and priceasic Validation
    if (!name || typeof name !== 'string' || !price || typeof price !== 'number') {
      return res.status(405).json({error: 'Invalid input data'})
    }

    // Validation for optional fields: description and ingredients
    if ((description && typeof description !== 'string') ||
    (ingredients && (!Array.isArray(ingredients) || !ingredients.every(ingredient => typeof ingredient === 'string')))) {
    return res.status(405).json({ error: 'Invalid input data'});
    }

    const newCupcake = {name, price, description, ingredients };
    const addedCupcake = db.addCupcake(newCupcake);
    res.status(201).json(addedCupcake)

  } catch(err) {
      console.error(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in addCupcake',
          status: 500,
          message: { err: 'cupcakeController in addCupcake: check server log for details' },
        });
  }
};

const getCupcakes = (req, res, next) => {
  try {
    const result = db.getCupcakes();
    res.status(200).json({message: "Succesful operation", data: result});

  } catch(err) {
      console.error(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in getCupcake',
          status: 500,
          message: { err: 'cupcakeController in getCupcake: check server log for details' },
        });
  }
};

const getCupcakeById = (req, res, next) => {
  try {
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
      console.error(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in getCupcakeById',
          status: 500,
          message: { err: 'cupcakeController in getCupcakeById: check server log for details' },
        });
  }
};

const updateCupcake = (req, res, next) => {
  try{
    const cupcakeId = parseInt(req.params.cupcakeId);
    const cupcakeData = req.body;
    const {name, price, description, ingredients} = req.body;

    // Validation for mandatory fields: name and price
    if (!name || typeof name !== 'string' || !price || typeof price !== 'number') {
      return res.status(405).json({error: 'Validation exception'})
    }

    // Validation for optional fields: description and ingredients
    if ((description && typeof description !== 'string') ||
    (ingredients && (!Array.isArray(ingredients) || !ingredients.every(ingredient => typeof ingredient === 'string')))) {
    return res.status(405).json({ error: 'Validation exception'});
    }

    // Check if Id is a valid integer
    if (isNaN(cupcakeId)){
      return res.status(400).json({message: "Invalid ID supplied"})
    }

    const result = db.updateCupcake(cupcakeId, cupcakeData);

    // Check if the cupcake was found and updated
    if(!result) {
      return res.status(404).json({message: "Cupcake not found"})
    }

    res.status(200).json({message: "Succesful operation", data: result});

  } catch(err) {
      console.error(err);
        return next({
          log: 'Express error handler caught error in cupcakeController in updateCupcake',
          status: 500,
          message: { err: 'cupcakeController in updateCupcake: check server log for details' },
        });
  }
};

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
      console.error(err);
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