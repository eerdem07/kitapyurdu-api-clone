const express = require('express');
const app = express();

const userRouter = require('./routes/userRoutes');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Theres no route for this url ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
