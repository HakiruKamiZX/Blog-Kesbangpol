const express = require('express');
const router = express.Router();
const Post = require('../models/post')


/**
 * GET /
 * HOME
 */
router.get ('', async (req, res) => {
    const locals = {
        title : "Kesbangpol Blog",
        description: "This is a test for thew node js version of the web"
    }
 
    try {
        const data = await Post.find()
        res.render('index', { locals, data});
    } catch (error) {
      console.log(error)  
    }
     
});









router.get('/about', (req,res) => {
    res.render('about');
});

module.exports = router;



/** function InsertPostData () {
    Post.insertMany([
        {
            title: "Building a Kesbangpol Blog",
            body: "This is the example text of a body"
        },
        {
            title: "New Documentation",
            body: "This is the example text of a body"
        },
        {
            title: "Building a Kesbangpol Blog",
            body: "This is the example text of a body"
        },
        {
            title: "Building a Kesbangpol Blog",
            body: "This is the example text of a body"
        },
        {
            title: "This is an actual test duhhhh",
            body: "This is the example text of a body"
        },
        {
            title: "Test 1",
            body: "This is the example text of a body"
        },
        {
            title: "Building a Kesbangpol Blog",
            body: "This is the example text of a body"
        },
        {
            title: "Runnnnn Nowww this is a test",
            body: "This is the example text of a body"
        },
        {
            title: "Building a Kesbangpol Blog",
            body: "This is the example text of a body"
        },
        {
            title: "Building a Kesbangpol Blog",
            body: "This is the example text of a body"
        },
    ])
}
InsertPostData(); */