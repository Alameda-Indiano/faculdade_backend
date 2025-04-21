"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
exports.userController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.userService.createUser(req.body);
                return res.status(201).json({
                    success: true,
                    message: 'Usuário criado com sucesso.',
                    data: user,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Erro interno do servidor.',
                });
            }
        });
    },
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.userService.getUsers();
                return res.json({
                    success: true,
                    message: 'Usuários encontrados com sucesso.',
                    data: users,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Erro interno do servidor.',
                });
            }
        });
    },
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.userService.getUserById(id);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuário não encontrado.',
                    });
                }
                return res.json({
                    success: true,
                    message: 'Usuário encontrado com sucesso.',
                    data: user,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Erro interno do servidor.',
                });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.userService.updateUser(id, req.body);
                return res.json({
                    success: true,
                    message: 'Usuário atualizado com sucesso.',
                    data: user,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Erro interno do servidor.',
                });
            }
        });
    },
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield user_service_1.userService.deleteUser(id);
                return res.status(200).json({
                    success: true,
                    message: 'Usuário removido com sucesso.',
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Erro interno do servidor.',
                });
            }
        });
    },
};
