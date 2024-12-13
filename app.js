// NPM PACKAGES
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const path = require("path");
const MongoStore = require('connect-mongo');

const app = express();

const Post = require('./models/post');
const Email = require('./models/mail');
const SessionID = require('./models/sessions');

const auth = require('./controllers/passport');
const mongoose = require('./controllers/mongodb');
const webPages = require('./routes/webPages');
const editor = require('./routes/editorPages');
const blogPages = require('./routes/blogPages');
const compose = require('./routes/composePost');
const engagement = require('./routes/userEngage');
const submission = require('./routes/submit');
const Data = require("./models/data");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.3qs.co.ke",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

// PACKAGE INITIALIZATION

app.set('view engine', 'ejs');
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(cookieParser(process.env.COOKIE_SECRET, {maxAge:60*1000*30,})); //session lasts 30 minutes
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: "mongodb://" +
            process.env.LOCATION + ":27017/" +
            process.env.DB_NAME
    }),
    cookie: {
        maxAge: 1000 * 60 * 60, // would expire after 30 minutes
        httpsOnly: true, // The cookie only accessible by the web server
        httpOnly: true, // The cookie only accessible by the web server
        signed: true, // Indicates if the cookie should be signed
        secure: true,
        sameSite: 'strict',
        domain:"https://3qs.co.ke",
        path: "/"
    }
}));
app.use(express.static('public'));
app.use(methodOverride("_method", {methods:["GET", "POST"]}));

app.use('/', auth);
app.use('/', editor);
app.use('/', webPages);
app.use('/', blogPages);
app.use('/', compose);
app.use('/', engagement);
app.use('/', submission);

// const job = schedule.scheduleJob('29 11 15 * *', async (req,res) => {
//     const days = ['','Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
//     let dates = await SessionID.aggregate([
//         {
//             $project: {
//                 year: {
//                     $year: "$visitedAt"
//                 },
//                 month: {
//                     $month: "$visitedAt"
//                 },
//                 day: {
//                     $dayOfMonth: "$visitedAt"
//                 },
//                 date: {
//                     $arrayElemAt: [
//                         days, {
//                             $dayOfWeek: "$visitedAt"
//                         }
//                     ]
//                 },
//                 hour: {
//                     $hour: {
//                         date: "$visitedAt",
//                         timezone: "Africa/Nairobi"
//                     },
//                 },
//                 minute: {
//                     $minute: {
//                         date: "$visitedAt",
//                         timezone: "Africa/Nairobi"
//                     },
//                 },
//                 locale: {
//                     $toString: "$location"
//                 },
//                 session: {
//                     $toString: "$sessionID"
//                 },
//                 ip: {
//                     $toString: "$ipAddress"
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: {
//                     year: "$year",
//                     month: "$month",
//                     day: "$day",
//                     date: "$date",
//                     hour: "$hour",
//                     minute: "$minute",
//                     locale: "$locale",
//                     ip: "$ip",
//                     uniqueID: "$session"
//                 },
//                 // count: { $sum: 1 }
//             },
//         },
//         {
//             $sort: {
//                 '_id.day': 1,
//             },
//         },
//     ]);

    //console.log(dates[0]._id.uniqueID)

    // let newData = [];
    // for (let x=0; x<dates.length; x++){
    //     let existingID = await Data.find({uniqueID: dates[x]._id.uniqueID})
    //     if(existingID.length){
    //         console.log('Found')
    //     } else {
    //         let savedData = await new Data({
    //             year: dates[x]._id.year,
    //             month: dates[x]._id.month,
    //             day: dates[x]._id.day,
    //             date: dates[x]._id.date,
    //             hour: dates[x]._id.hour,
    //             minute: dates[x]._id.minute,
    //             locale: dates[x]._id.locale,
    //             ip: dates[x]._id.ip,
    //             uniqueID: dates[x]._id.uniqueID
    //         })
    //         newData.push(savedData)
    //         //console.log()
    //     }
    // }

//     newData.forEach(x => {
//         x.save().then(()=>{
//             newData = []
//             //console.log('Saved')
//         }).catch(err=>{
//             //console.log('Failed to save')
//             return res.sendStatus(500);
//         })
//     })
// });

app.get('/', async(req,res)=>{

    let first3 = await Post.find().sort({_id: -1}).limit(3);

    res.render('website/index', {
            first3:first3
        }
    )
});

app.post('/write', passport.authenticate('local', {failureRedirect:'/'}), (req,res)=>{
    res.redirect('/index');
})

// app.post('/write', (req,res)=>{
//     res.redirect('/index');
// })

app.listen(3000, function() {
    console.log("Server started on port 3000");
});