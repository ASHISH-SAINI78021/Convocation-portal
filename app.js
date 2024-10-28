const express = require("express");
const dotenv = require("dotenv");
const main = require("./config.js");
const cors = require("cors");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const session = require("express-session");
const store = require("connect-mongo");
const authRoute = require("./routes/authRoute.js");
const alumniRoute = require("./routes/alumniRoute.js");
const User = require("./Model/user.js");
dotenv.config();
const app = express();

const fs = require("fs")
const path = require("path");


const uploadDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


app.use(cors({
    origin : true ,
    credentials : true
}));

app.use(session({
    secret : process.env.secret ,
    resave : false ,
    saveUninitialized : false ,
    cookie : {
        secure : false , 
        maxAge : 600000
    } ,
    store : store.create({
        mongoUrl : process.env.url
    })
}));
const uploadRoutes = require('./routes/upload');

app.use(passport.initialize()); // used to initialise passport
app.use(passport.session()); // used to persist session


// strategy
passport.use(new googleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID ,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET ,
    callbackURL : `${process.env.FRONTEND_URL}/api/v1/auth/google/callback`
} , 
(accessToken , refreshToken , profile , done)=> {
    console.log(accessToken);
    done(null , profile); // passes the profile data to serializeUser
}));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user , done)=> {
    done(null , user);
});

// used to decode the received cookie and persist session
passport.deserializeUser((user , done)=> {
    done(null , user);
});


app.use(express.json());
app.use("/uploads", express.static("uploads"));

main();
app.get("/" , (req , res)=> {
    res.send("Hello");
});

app.use("/api/v1/auth" , authRoute);
app.use("/api/v1/alumni" , alumniRoute);


app.use('/upload', uploadRoutes);


app.listen(process.env.PORT , ()=> {
    console.log("app is listening...");
});