const express = require('express');
const PORT = process.env.PORT || 3005;
const app = express();
const cupcakeRoutes = require('./routes/cupcakeRoutes');


// Middleware to parse incoming request bodies as JSON
app.use(express.json());

app.use('/cupcake', cupcakeRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `${err} Express error handler caught unknown middleware error`,
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Server startup logic
// Checks if this module is the main module and starts the server
// This prevents the server from auto-starting when being 'require'd as a module
if (require.main === module) {
    app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`)
  });
};

// Exporting the Express app for testing
module.exports = app;