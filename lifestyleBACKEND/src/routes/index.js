const express = require('express');
const userRoute = require('./user.routes');
const productRoute = require('./product.routes');
const entryRoute = require('./entry.routes');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/entries',
    route: entryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;