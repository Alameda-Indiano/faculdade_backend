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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
const SALT_ROUNDS = 10;
exports.userService = {
    createUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield user_repository_1.userRepository.findByEmail(data.email);
        if (existing) {
            throw new Error('Email já cadastrado.');
        }
        const hashedPassword = yield bcrypt_1.default.hash(data.password, SALT_ROUNDS);
        const newUser = yield user_repository_1.userRepository.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        const { password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        return userWithoutPassword;
    }),
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_repository_1.userRepository.findAll();
        return users.map((_a) => {
            var { password } = _a, rest = __rest(_a, ["password"]);
            return rest;
        });
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_repository_1.userRepository.findById(id);
        if (!user)
            return null;
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        return userWithoutPassword;
    }),
    updateUser: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield user_repository_1.userRepository.findById(id);
        if (!existing)
            throw new Error('Usuário não encontrado.');
        if (data.email && data.email !== existing.email) {
            const emailTaken = yield user_repository_1.userRepository.findByEmail(data.email);
            if (emailTaken) {
                throw new Error('Email já cadastrado por outro usuário.');
            }
        }
        let password = data.password;
        if (password) {
            password = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        }
        const updated = yield user_repository_1.userRepository.update(id, Object.assign(Object.assign({}, data), { password }));
        const { password: _ } = updated, userWithoutPassword = __rest(updated, ["password"]);
        return userWithoutPassword;
    }),
    deleteUser: user_repository_1.userRepository.delete,
};
