const db = require('../data/db');
const request = require('supertest');
const app = require('../server');

describe('POST /cupcake', () => {
  beforeEach(() => {
    db.reset(); 
  });

  test('should add a new cupcake and return 201 status', async () => {
    const newCupcake = { name: 'Chocolate', price: 2.5, description: 'Delicious chocolate cupcake', ingredients: ['chocolate', 'flour', 'sugar'] };

    const response = await request(app)
      .post('/cupcake')
      .send(newCupcake);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newCupcake.name);
    expect(response.body.price).toBe(newCupcake.price);

    // Optionally, check if the cupcake was added to the database
    const addedCupcake = db.getCupcakeById(response.body.id);
    expect(addedCupcake).toMatchObject(newCupcake);
    });

    test('should return 405 status for invalid input data', async () => {
      const invalidCupcake = { name: 123, price: 'hello' };
      const response = await request(app)
        .post('/cupcake')
        .send(invalidCupcake);

      expect(response.statusCode).toBe(405);
      expect(response.body).toEqual({ error: 'Invalid input data' });

      // Optionally, check that no cupcake was added to the database
      const cupcakes = db.getCupcakes();
      expect(cupcakes.length).toBe(0);
    });
});

describe("GET /cupcake", () => {
  beforeEach(async () => {
    db.reset();
    await request(app)
    .post('/cupcake')
    .send({ name: 'Chocolate', price: 2.5, description: 'Delicious chocolate cupcake', ingredients: ['chocolate', 'flour', 'sugar'] }); 
  });

  test('Should retrieve all the cupcakes and return 200 status', async () => {
    const response = await request(app).get('/cupcake');

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data).toMatchObject([{ 
        name: 'Chocolate',
        price: 2.5,
        description: 'Delicious chocolate cupcake',
        ingredients: ['chocolate', 'flour', 'sugar'] 
      }]);
  });
});

describe('PUT /cupcake/:cupcakeId', () => {
  let cupcakeId;

  beforeEach(async () => {
    db.reset();
    const response = await request(app)
      .post('/cupcake')
      .send({ name: 'Chocolate', price: 2.5 });
    cupcakeId = response.body.id; 
  });

  test('should update a cupcake and by id and return 200 status', async () => {
    const updatedCupcake = {name: "Rasberry", price: 3};
    const updatedResposne = await request(app)
      .put(`/cupcake/${cupcakeId}`)
      .send(updatedCupcake);

    expect(updatedResposne.statusCode).toBe(200);
    expect(updatedResposne.body.data).toHaveProperty('id', cupcakeId);
    expect(updatedResposne.body.data.name).toBe(updatedCupcake.name);
    expect(updatedResposne.body.data.price).toBe(updatedCupcake.price);

    // fetching the cupcake again to verify the update
    const getResponse = await request(app).get(`/cupcake/${cupcakeId}`);
    expect(getResponse.body.data.name).toBe(updatedCupcake.name);
    expect(getResponse.body.data.price).toBe(updatedCupcake.price);
  });

  test('should return 405 status for invalid input data', async () => {
    const invalidCupcake = { name: 123, price: 'hello' };
    const response = await request(app)
    .put(`/cupcake/${cupcakeId}`)
    .send(invalidCupcake);

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({ error: 'Validation exception' });

    // Optionally, check that no cupcake was added to the database
    const existingCupcakes = db.getCupcakeById(cupcakeId);
    expect(existingCupcakes).toBeDefined();
  });

  test('should return 400 status for invalid numeric cupcake ID', async () => {
    const response = await request(app)
      .put('/cupcake/invalid-id')
      .send({ name: 'Vanilla', price: 3 });
  
    expect(response.statusCode).toBe(400);
  });
  
  test('should return 404 status for non-existent cupcake ID', async () => {
    const response = await request(app)
      .put('/cupcake/999') // Assuming 999 is a non-existent ID
      .send({ name: 'Vanilla', price: 3 });
  
    expect(response.statusCode).toBe(404);
  });
  
  test('should allow updates with all mandatory fields', async () => {
    const updateData = { name: 'New Flavor', price: 3.5 };
    const response = await request(app)
      .put(`/cupcake/${cupcakeId}`)
      .send(updateData);
  
    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe(updateData.name);
    expect(response.body.data.price).toBe(updateData.price);
    // Optionally, check other fields to ensure they are correctly updated or unchanged
  });
});

describe('DELETE /cupcake/:cupcakeId', () => {
  let cupcakeId;

  beforeEach(async () => {
    db.reset();
    const response = await request(app)
      .post('/cupcake')
      .send({ name: 'Chocolate', price: 2.5 });
    cupcakeId = response.body.id;
  });

  test('should successfully delete a cupcake and return 200 status', async () => {
    const response = await request(app)
      .delete(`/cupcake/${cupcakeId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Succesful operation');

    // Optionally, verify that the cupcake no longer exists in the database
    const deletedCupcake = db.getCupcakeById(cupcakeId);
    expect(deletedCupcake).toBeUndefined();
  });

  test('should return 400 status for invalid numeric cupcake ID', async () => {
    const response = await request(app)
      .delete('/cupcake/invalid-id');

    expect(response.statusCode).toBe(400);
  });

  test('should return 404 status for non-existent cupcake ID', async () => {
    const nonExistentId = 999; // Assuming 999 is a non-existent ID
    const response = await request(app)
      .delete(`/cupcake/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
  });
});
