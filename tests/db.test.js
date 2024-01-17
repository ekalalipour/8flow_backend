const db = require('../data/db');

describe('db operations', () => {
  beforeEach(() => {
    db.reset();
  });

  // the initial state of cupCakes is empty
  test('getCupcakes returns initial cupcake list', () => {
    expect(db.getCupcakes()).toEqual([]);
  });

  test('addCupcake adds a new cupcake with a unique id', () => {
    const cupcakeToAdd = { name: "orange", price: 10 };
    db.addCupcake(cupcakeToAdd);

    const cupcakes = db.getCupcakes();
    expect(cupcakes.length).toBe(1);
    expect(cupcakes[0]).toEqual({ id: 1, ...cupcakeToAdd });
  });

  test('getCupcakeById retrieves a cupcake with a matching id', () => {
    const cupcakeToAdd = { name: "orange", price: 10 };
    db.addCupcake(cupcakeToAdd);

    const cupcake = db.getCupcakeById(1);
    expect(cupcake).toEqual({ id: 1, ...cupcakeToAdd})
  })
  
  test('updateCake allows for updating a cupcake by id', () => {
    const cupcakeToAdd = { name: "orange", price: 10 };
    db.addCupcake(cupcakeToAdd);

    const updatedCupcake = {name: "apple", price: 11};
    const updated = db.updateCupcake(1, updatedCupcake );
    expect(updated).toEqual({ id: 1, ...updatedCupcake})
  })

  test('deleteCupcake removes the specified cupcake from the list by id', () => {
    const cupcakeToAdd = { name: "orange", price: 10 };
    const cupcakeToAdd2 = { name: "apple", price: 11 };
    db.addCupcake(cupcakeToAdd);
    db.addCupcake(cupcakeToAdd2);

    db.deleteCupcake(1);
    const cupCakes = db.getCupcakes();
    expect(cupCakes.length).toBe(1);
    expect(cupCakes).toEqual([{id:2, ...cupcakeToAdd2}]);
  });

});

