const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config()

let server;
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.info('Connected to MongoDB', process.env.MONGO_URL);
  server = app.listen(process.env.API_PORT, () => {
    console.info(`Listening to port ${process.env.API_PORT}`);
  });
});

const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
};
  
const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};
  
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
  
process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
        server.close();
    }
});