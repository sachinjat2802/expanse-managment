"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        requird: true,
    },
    phone: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.model("User", userSchema);
