const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminLayout= '../views/layouts/admin.ejs'
const jwtSecret = process.env.JWT_SECRET


/**
 * CHECK LOGIN
 */
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json( { message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
    }
}



/**
 * GET /
 * ADMIN LOGIN
 */

router.get ('/admin', async (req, res) => {
    try {
        const locals = {
            title : "Admin Page",
            description: "This is a test for thew node js version of the web"
        }

            res.render('admin/index', { locals, layout: adminLayout});
    } catch (error) {
      console.log(error); 
    }
     
});

/**
 * POST /
 * ADMIN CHECKLOGIN
 */

router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne( { username });

        if(!user) {
            return res.status(401).json( { message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return res.status(401).json( { message: 'invalid credentials'});
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret);
        res.cookie('token', token, { httpOnly: true});

        res.redirect(`/dashboard`)

    } catch (error) {
      console.log(error); 
    }
     
});

/**
 * POST /
 * ADMIN REGISTER
 */

router.post('/register', async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log the request body
        const { username, password } = req.body;

        // Additional validation if needed
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User Created', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error during registration' });
    }
});

/**
 * POST /
 * ADMIN DASHBOARD
 */

router.get('/dashboard', async (req, res) => {

    res.render('admin/dashboard');

});

module.exports = router;
