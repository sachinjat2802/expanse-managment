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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpance = exports.updateExpance = exports.addExpance = exports.getExpance = void 0;
const expance_1 = __importDefault(require("../../models/expance"));
const getExpance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expances = yield expance_1.default.find();
        res.status(200).json({ expances });
    }
    catch (error) {
        throw error;
    }
});
exports.getExpance = getExpance;
const addExpance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const expance = new expance_1.default({
            name: body.name,
            amount: body.amount,
        });
        const newExpance = yield expance.save();
        const allExpances = yield expance_1.default.find();
        res
            .status(201)
            .json({ message: "Expance added", expance: newExpance, expancess: allExpances });
    }
    catch (error) {
        throw error;
    }
});
exports.addExpance = addExpance;
const updateExpance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateExpance = yield expance_1.default.findByIdAndUpdate({ _id: id }, body);
        const allExpances = yield expance_1.default.find();
        res.status(200).json({
            message: "Expance updated",
            expance: updateExpance,
            expances: allExpances,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateExpance = updateExpance;
const deleteExpance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedExpance = yield expance_1.default.findByIdAndRemove(req.params.id);
        const allExpance = yield expance_1.default.find();
        res.status(200).json({
            message: "Expance deleted",
            expance: deletedExpance,
            expances: allExpance,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteExpance = deleteExpance;
