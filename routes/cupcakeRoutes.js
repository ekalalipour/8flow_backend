const express = require('express');
const router = express.Router();

const {addCupcake, getCupcakes, getCupcakeById, updateCupcake, deleteCupcake} = require('../controllers/cupcakeController');

/**
 * POST /cupcake
 * Route to add a new node to the tree structure.
 * The request body should include 'name' and 'price' properties.
 * The addCupcake handler function will process the request.
 */
router.post('/', addCupcake);

/**
 * GET /cupcake
 * Route to retrieve the entire cupCakes array.
 * The getTree handler function will process the request.
 */
router.get('/', getCupcakes);

router.get('/:cupcakeId', getCupcakeById);

router.put('/:cupcakeId', updateCupcake);

router.delete('/:cupcakeId', deleteCupcake);

module.exports = router;