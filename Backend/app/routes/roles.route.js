const router = require('express').Router();
const rolesController = require("../controllers/roles.contorller");
const { validateToken, checkAuthorize } = require('../middlewares/validateToken')

router.get('', validateToken, checkAuthorize(["Admin"]), rolesController.getRoles);

module.exports = router;

