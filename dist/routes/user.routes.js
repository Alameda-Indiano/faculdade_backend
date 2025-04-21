"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
//@ts-ignore
router.use(auth_middleware_1.authenticateToken);
//@ts-ignore
router.post('/', user_controller_1.userController.create);
//@ts-ignore
router.get('/', user_controller_1.userController.findAll);
//@ts-ignore
router.put('/:id', user_controller_1.userController.update);
//@ts-ignore
router.get('/:id', user_controller_1.userController.findOne);
//@ts-ignore
router.delete('/:id', user_controller_1.userController.remove);
exports.default = router;
