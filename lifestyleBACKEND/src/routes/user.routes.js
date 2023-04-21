const express = require('express');
const { authentication, validate } = require('../middlewares');
const { userValidation } = require('../validation')
const { userController } = require('../controllers');

const router = express.Router();

router
  .post('/login', 
    validate(userValidation.userLogin), 
    userController.userLogin)
  .post('/signup', 
    validate(userValidation.userSignUp), 
    userController.userSignUp)
  .put('/password-change',     
    validate(userValidation.userPasswordChange), 
    authentication.permissionsUser(), 
    userController.userPasswordChange)
  .put('/password-change-non-auth', 
    validate(userValidation.userPasswordChangeNonAuth), 
    userController.userPasswordChangeNonAuth)
  .put('/name-change',
    validate(userValidation.userNameChange), 
    authentication.permissionsUser(), 
    userController.userNameChange)
  .get('/profile', 
    authentication.permissionsUser(), 
    userController.userGetProfile)
  .delete('/delete-profile', 
    authentication.permissionsUser(), 
    userController.userDeleteProfile)

module.exports = router;