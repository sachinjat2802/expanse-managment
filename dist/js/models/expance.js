"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * @schema for expance db
 */
const expanceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.model("Expance", expanceSchema);
