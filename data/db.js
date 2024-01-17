let cupCakes = []; // Array to store cupcake objects
let nextId = 1; // Variable to keep track of the next ID to assign to a new cupcake

const db = {};

// Adds a new cupcake to the store and returns it
db.addCupcake = (cupcake) => {
  const newCupcake = {id: nextId++, ...cupcake}
  cupCakes.push(newCupcake);
  return newCupcake;
}

// Returns an array of all cupcakes
db.getCupcakes = () => {
  return cupCakes;
};

// Finds and returns a cupcake by its ID, or undefined if not found
db.getCupcakeById = (id) => {
  return cupCakes.find(cupcake => cupcake.id === id);
};

// Updates a cupcake by ID. Returns the updated cupcake, or null if not found
db.updateCupcake = (id, updatedCupcake) => {
  const index = cupCakes.findIndex(cupcake => cupcake.id === id);
  if (index === -1) {
    // Cupcake not found
    return null;
  }

  cupCakes[index] = {...cupCakes[index], ...updatedCupcake};
  return cupCakes[index];
};

// Deletes a cupcake by ID. Returns true if deletion was successful, false otherwise
db.deleteCupcake = (id) => {
  initialLength = cupCakes.length;
  cupCakes = cupCakes.filter(cupcake => cupcake.id !== id)
  if (initialLength > cupCakes.length) return true;
};

// Resets the database to its initial state
db.reset = () => {
  cupCakes.length = 0;
  nextId = 1;
};

module.exports = db;
