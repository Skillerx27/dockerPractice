const express = require("express")
// Using Node.js `require()`
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config");
const cors = require("cors")




const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

const mongoURL = `mongodb://${MONGO_IP}:${MONGO_PORT}`

const connectWithTry = () => {
    mongoose.connect(mongoURL, {
        // userNewUrlParser : true,
        // useUnifiedTopology: true,
        // useFindAndModify:false
    })
        .then(() => {
            console.log("successfully connected to DB")
        }).catch(err => {
            console.log("Error", err)
            setTimeout(connectWithTry, 5000)
        })
}


connectWithTry();


const redis = require('redis')
const session = require('express-session')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port : REDIS_PORT
})
app.use(cors())
app.enable('trust proxy')
app.use(
    session({
        store: new RedisStore({ client: redisClient ,
            cookie:{
                httpOnly: true,
            }
        }),
        saveUninitialized: false,
        secret : SESSION_SECRET,
        secure: false,
        resave: false,
    })
)

// app.use(session({ secret: 'somevalue' , maxAge : 4000}));
// app.use(session({
   
//     store: new RedisStore({
//         client : redisClient,
//         cookie:{
//             secure : false,
//             resave : false,
//             saveUninitialized : false,
//             httpOnly : true,
//         }
//     }),
//     secret : SESSION_SECRET,
// }))


app.use(express.json())



app.get("/api/v1", (req, res) => {
    res.send(
        "<h2>Backend Is Running</h2>"
    )
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})