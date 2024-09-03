const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


/**
 * GET /
 * HOME
 */
router.get ('', async (req, res) => {
    try {
        const locals = {
            title : "Kesbangpol Blog",
            description: "This is a test for thew node js version of the web"
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt : -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { 
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
    });

    
    } catch (error) {
      console.log(error); 
    }
     
});

/**router.get ('', async (req, res) => {
    const locals = {
        title : "Kesbangpol Blog",
        description: "This is a test for thew node js version of the web"
    }
 
    try {
        const data = await Post.find()
        res.render('index', { locals, data});
    } catch (error) {
      console.log(error); 
    }
     
});**/


/**
 * GET /
 * Post.id
 */

router.get ('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({_id: slug});

        const locals = {
            title : data.title,
            description: "This is a test for thew node js version of the web"
        }

        res.render('post', { locals, data});
    } catch (error) {
      console.log(error); 
    }
     
});


/**
 * Post /
 * Search
 */

router.post ('/search', async (req, res) => {
    try {
        const locals = {
            title : "search",
            description: "This is a test for thew node js version of the web"
        }

        let SearchTerm = req.body.SearchTerm;
        const searchNoSpecialChar = SearchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, `i`)}},
                { body: { $regex: new RegExp(searchNoSpecialChar, `i`)}}
            ]

        });


        res.render("search_page",{
            data,
            locals
        });
    } catch (error) {
      console.log(error); 
    }
     
});


router.get('/about', (req,res) => {
    res.render('about');
});



execute: async () => {
    let timeout = 25;
    while (mongoose.connection.readyState === 0) {
        if (timeout === 0) {
            console.log('timeout');
            throw new Error(
                'timeout occured with mongoose connection',
            );
        }
        await mongoose.connect(mongoToken, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        timeout--;
    }
    console.log(
        'Database connection status:',
        mongoose.connection.readyState,
    );
}

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