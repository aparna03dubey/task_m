const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/tasks", taskRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB connected"))
.catch(err => console.log(err))

app.listen(5000, ()=>{
    console.log("Server running on port 5000")
})