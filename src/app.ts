import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import Routes from "./routes"
import cookieParser from "cookie-parser"


const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session);

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000;

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

//create session
/**
 * @session session setup with mongoDBStore
 * @store store session in mongoDB with uri and collection name
 * @cookie set cookie for express session
 */
app.use(
  session({
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
  })
);

app.use(cookieParser())

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))


app.use(Routes)
app.get("/", () => console.log("hello"))


const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }

mongoose.set("useFindAndModify", false)
//const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.srpbo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;


//connection with db and server start
mongoose
  .connect(`mongodb+srv://sachin:28021998@cluster0.srpbo.mongodb.net/myExpance?retryWrites=true&w=majority`, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )

  .catch(error => {
    throw error
  })


module.exports = app

