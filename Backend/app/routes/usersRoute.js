const router = require('express').Router();
const usersController = require("../controllers/usersConroller");

router.post('/', usersController.addUser);

router.post('/login', usersController.login);

module.exports = router;

