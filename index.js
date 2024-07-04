var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const cors = require("cors");
var app = express();

app.use(cors({
    origin:["https://freelancer-management-system-frontend-59pih067e.vercel.app"],
    methods :["POST","GET"],
    credentials:true
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//localhost:27017
(async () => {
    try {
        await mongoose.connect("mongodb+srv://msamji25186:vcErGiQYRxWRw2zZ@cluster0.6sdkyyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

app.get("/",(req,res)=>{
    res.json("Hello");
})

// Manually create Super Admin in the database
async function createSuperAdmin() {
    const superAdmin = await User.findOne({utype: 'Super Admin'});

    try {
        if (!superAdmin) {
        const hashedPassword = await bcrypt.hash('abdhaf123', 5);
        const newSuperAdmin = new User({
            email: 'abdul.hafiz@gmail.com',
            fullName: 'Abdul Hafiz',
            password: hashedPassword,
            utype: 'Super Admin',
            isActive: true
        });

        await newSuperAdmin.save();
        console.log("Super Admin created successfully");
        } else {
            console.log("Super Admin already exists");
        }
    } catch (error) {
        console.error("error creating Super Admin", error);
    }
}

createSuperAdmin();

const router = require('./routes/index');
app.use('/', router);

app.use(function (req, res, next) {
    next(createError(404));
});

const PORT = 5600;
app.listen(PORT, console.log(`Server running port ${PORT}`));
