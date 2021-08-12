"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//create session
/**
 * @session session setup with mongoDBStore
 * @store store session in mongoDB with uri and collection name
 * @cookie set cookie for express session
 */
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    //store session in db
    store: new MongoDBStore({
        uri: `mongodb+srv://sachin:28021998@cluster0.srpbo.mongodb.net/myExpance?retryWrites=true&w=majority`,
        collection: "mySessions",
    }),
    cookie: {
        path: '/',
        httpOnly: true,
        expires: false,
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
    }
}));
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(routes_1.default);
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, };
mongoose_1.default.set("useFindAndModify", false);
//const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.srpbo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
//connection with db and server start
mongoose_1.default
    .connect(`mongodb+srv://sachin:28021998@cluster0.srpbo.mongodb.net/myExpance?retryWrites=true&w=majority`, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch(error => {
    throw error;
});
