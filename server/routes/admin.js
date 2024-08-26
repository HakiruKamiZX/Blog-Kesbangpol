const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/User');

const adminLayout= '../views/layouts/admin.ejs'

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
 * GET /
 * ADMIN CHECKLOGIN
 */

router.post ('/admin', async (req, res) => {
    try {

        const { username, password } = req.body;
        console.log(req.body);
            res.redirect('/admin');
    } catch (error) {
      console.log(error); 
    }
     
});

module.exports = router;
