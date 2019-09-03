const router = require('express').Router();
const usersController = require("../controllers/users.conroller");
const { validateToken, checkAuthorize } = require('../middlewares/validateToken');

router.post('/register', usersController.addUser); //register

router.post('/login', usersController.login);

router.get('', validateToken, checkAuthorize("Admin"), usersController.getUsers);

router.get('/:id', usersController.getSingleUser);
router.delete('/:id', usersController.deleteUser);
router.put('/:id', usersController.updateUser);

module.exports = router;

