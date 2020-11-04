const logger = require('./common/logging');
const app = require('./app');
const { PORT } = require('./common/config');
const { connectDB } = require('./common/db');

process.on('unhandledRejection', reason => {
  process.emit('uncaughtException', reason);
});

connectDB(() => {
  logger.info('Successfully connect to DB');
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
