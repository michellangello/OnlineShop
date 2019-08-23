const router = require('express').Router();
const usersController = require("../controllers/users.conroller");
const { validateToken } = require('../middlewares/validateToken');

router.post('/register', usersController.addUser); //register

router.post('/login', usersController.login);

router.get('', validateToken, usersController.getUsers);

router.get('/:id', usersController.getSingleUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router;

