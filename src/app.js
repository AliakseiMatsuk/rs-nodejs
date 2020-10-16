const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const morgan = require('morgan');
require('express-async-errors');

const winston = require('./common/logging');
const errorHandler = require('./errors/errorHandler');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
app.disable('x-powered-by');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    ':method :status :url :query Body :body size :res[content-length] - :response-time ms',
    {
      stream: winston.stream
    }
  )
);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

// Exceptions catcher
// uncaughtException catching by Winston
process.on('unhandledRejection', reason => {
  process.emit('uncaughtException', reason);
});

// throw Error('Oops!');

// Promise.reject(Error('Oops!'));

module.exports = app;
