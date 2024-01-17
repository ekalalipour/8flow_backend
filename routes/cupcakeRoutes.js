const express = require('express');
const router = express.Router();

const {
  addCupcake, 
  getCupcakes, 
  getCupcakeById, 
  updateCupcake, 
  deleteCupcake
} = require('../controllers/cupcakeController');

/**
 * POST /cupcake
 * Route to add a new cupcake.
 */
router.post('/', addCupcake);

/**
 * GET /cupcake
 * Route to retrieve the entire cupCakes array.
 */
router.get('/', getCupcakes);

/**
 * GET /cupcake/:cupcakeId
 * Route to retrieve a specific cupcake by its ID.
 */
router.get('/:cupcakeId', getCupcakeById);

/**
 * PUT /cupcake/:cupcakeId
 * Route to update an existing cupcake's details by its ID.
 * The cupcakeId parameter in the URL specifies the ID of the cupcake to update.
 */
router.put('/:cupcakeId', updateCupcake);

/**
 * DELETE /cupcake/:cupcakeId
 * Route to delete a specific cupcake by its ID.
 */
router.delete('/:cupcakeId', deleteCupcake);

module.exports = router;