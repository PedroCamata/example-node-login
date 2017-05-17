'use strict';

const path = require('path')
, router = require('express').Router()
, session = require('express-session')
, auth = require(path.join( __dirname, "../middlewares/auth"));

//Session
router.use(session({secret: 'login-secret',resave: false, saveUninitialized: true}));

router.get('/login', (req, res) => {
    let msg = req.query.m;
    res.render('login', {msg: msg});
});

router.get('/register', (req, res) => {
    res.render('register.html');
});

router.get('/dashboard', auth, (req, res) => {
    let firstname = req.session.user.firstname;
    res.render('dashboard', {name: firstname});
});

const User_route = require(path.join(__dirname, '../controllers/user.js'));
router.use(User_route);

module.exports = router;