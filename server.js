const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const cupcakeRoutes = require('./routes/cupcakeRoutes');


// Middleware to parse incoming request bodies as JSON
app.use(express.json());

app.use('/cupcake', cupcakeRoutes);

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


app.listen(PORT, ()=>{
  console.log(`Server is running on ${PORT}...`)
});