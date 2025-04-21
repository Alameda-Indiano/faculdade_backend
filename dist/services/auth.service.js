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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
exports.authService = {
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield user_repository_1.userRepository.findByEmail(email);
            if (!user)
                throw new Error('Usuário não encontrado.');
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch)
                throw new Error('Senha inválida.');
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            //@ts-ignore
            const token = jsonwebtoken_1.default.sign({ user: userWithoutPassword }, process.env.JWT_SECRET, {
                expiresIn: (_a = process.env.JWT_EXPIRES_IN) !== null && _a !== void 0 ? _a : '1d',
            });
            return { user: userWithoutPassword, token };
        });
    }
};
