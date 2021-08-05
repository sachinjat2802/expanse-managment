import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import expanceRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
app.use(expanceRoutes)

//const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.srpbo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;


const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

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