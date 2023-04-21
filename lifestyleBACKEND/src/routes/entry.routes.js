const express = require('express');
const { authentication, validate } = require('../middlewares');
const { entryController } = require('../controllers');
const { entryValidation } = require('../validation')

const router = express.Router();

router
    .get('/:date', authentication.permissionsUser(), entryController.getDailyEntry)
    .post('/addProduct', validate(entryValidation.entryAddProduct), authentication.permissionsUser(), entryController.addProductToDailyEntry)
    .post('/addArbitraryProduct', validate(entryValidation.entryAddArbitraryProduct), authentication.permissionsUser(), entryController.addArbitraryProductToDailyEntry)
    .post('/getStats', authentication.permissionsUser(), entryController.collectStatistics)

module.exports = router;