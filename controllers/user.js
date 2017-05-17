'use strict';

const router = require('express').Router()
, path = require('path')
, bodyParser = require('body-parser')
, User = require(path.join(__dirname, '/../models/User.js'));

// BodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/api/register', (req, res) => {
    
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    let newuser = new User();
    newuser.email = email;
    newuser.password = password;
    newuser.firstname = firstname;
    newuser.lastname = lastname;

    newuser.save((err, savedUser) => {
        if(err) {
            console.log(err);
            return res.status(406).send('Error: ' + err);
        }

        res.redirect('/login?m=Your account has been created');
    });
});


router.post('/api/login', (req, res) => {

    let login_email = req.body.email;
    let login_password = req.body.password;

    let login_query = {
        email: login_email,
        password: login_password
    };

    User.findOne(login_query, (err, user) => {
        if(err) return console.log("Server Error: db");

        if(user) {
            console.log("User successfully logged in");
            req.session.user = user;
            res.redirect('/dashboard');
        } else {
            console.log("Invalid email or password");
            res.status(401).redirect('/login?m=Invalid Email or Password');
        }
    });
});

router.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.status(200).redirect('/login?m=You have successfully logout');
});

module.exports = router;