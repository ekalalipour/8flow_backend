let cupCakes = [];
let nextId = 1;

const db = {};

db.addCupcake = (cupcake) => {
  const newCupcake = {id: nextId++, ...cupcake}
  cupCakes.push(newCupcake);
  return newCupcake;
}

db.getCupcakes = () => {
  return cupCakes;
};

db.getCupcakeById = (id) => {
  return cupCakes.find(cupcake => cupcake.id === id);
};

db.updateCupcake = (id, updatedCupcake) => {
  const index = cupCakes.findIndex(cupcake => cupcake.id === id);
  cupCakes[index] = {...cupCakes[index], ...updatedCupcake};
  return cupCakes[index];

};

db.deleteCupcake = (id) => {
  initialLength = cupCakes.length;
  cupCakes = cupCakes.filter(cupcake => cupcake.id !== id)
  if (initialLength > cupCakes.length) return true;
};


module.exports = db