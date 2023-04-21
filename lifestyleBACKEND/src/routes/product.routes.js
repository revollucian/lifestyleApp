const express = require('express');
const { authentication, validate } = require('../middlewares');
const { productController } = require('../controllers');
const { productValidation } = require('../validation');

const router = express.Router();

router
  .get('/:code', validate(productValidation.productGet), authentication.permissionsUser(), productController.productGet)

module.exports = router;