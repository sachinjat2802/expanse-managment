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
exports.deleteExpance = exports.updateExpance = exports.addExpance = exports.getExpance = void 0;
const expance_1 = __importDefault(require("../../models/expance"));
//get expance with filters
/**
 * @method getExpance: shows expance
 * @body req :(name,amount)(limit)(skip)(sortBy.orderBy)
 * @body res :(Expances json)
 * @status code (responce code)
 */
const getExpance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const match = {};
    const sort = {};
    let _a = req.query, { sortBy, orderBy } = _a, clauses = __rest(_a, ["sortBy", "orderBy"]);
    const limit = req.query.limit;
    const skip = req.query.skip;
    if (query.name) {
        match.name = query.name;
    }
    if (query.amount) {
        match.amount = query.amount;
    }
    if (sortBy && orderBy) {
        sort[sortBy.toString()] = orderBy === 'desc' ? -1 : 1;
    }
    try {
        const expances = yield expance_1.default.find(match).limit(limit * 1).skip(skip * 1).sort(sort);
        res.status(200).json({ expances });
    }
    catch (error) {
        throw error;
    }
});
exports.getExpance = getExpance;
// add expance
/**
 * @method addExpance :used to add expance
 * @body req : name, amount
 * @body res :status 200 and msg :expance andded and expance data
 */
const addExpance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const expance = new expance_1.default({
            name: body.name,
            amount: body.amount
        });
        const newExpance = yield expance.save();
        res
            .status(201)
            .json({ message: "Expance added", expance: newExpance });
    }
    catch (error) {
        throw error;
    }
});
exports.addExpance = addExpance;
// update expance
/**
 * @method : updateExpance  update expance
 * @param req :id
 * @body req : name and amount
 * @body res : message:Expance updated  and updated expance
 *
 */
const updateExpance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateExpance = yield expance_1.default.findByIdAndUpdate({ _id: id }, body, { new: true });
        res.status(200).json({
            message: "Expance updated",
            expance: updateExpance,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateExpance = updateExpance;
//delete Expance
/**
 * @Method
 * @param req id
 * @body res message:Expance deleted and shows deletedExpance
 */
const deleteExpance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedExpance = yield expance_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({
            message: "Expance deleted",
            expance: deletedExpance,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteExpance = deleteExpance;
