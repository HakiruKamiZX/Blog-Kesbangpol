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
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json( { message: 'Unauthorized'});
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
 * GET /
 * ADMIN DASHBOARD
 */

router.get('/dashboard', authMiddleware ,async (req, res) => {

    try {
        const locals =  {
            title: 'Dashboard',
            description : 'Admin Dashbaord For Kesbangpol Blog'
        }


        const data = await Post.find();
        res.render(`admin/dashboard`, {
            locals,
            data,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
        
    }
});


/**
 * GET /
 * ADMIN - Create New Post
 */

router.get('/add-post', authMiddleware ,async (req, res) => {

    try {
        const locals =  {
            title: 'Add Post',
            description : 'Admin Dashbaord For Kesbangpol Blog'
        }


        const data = await Post.find();
        res.render(`admin/add-post`, {
            locals,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
        
    }
});


/**
 * POST /
 * ADMIN - Create New Post
 */

router.post('/add-post', authMiddleware ,async (req, res) => {
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });

            await Post.create(newPost);
            res.redirect('/dashboard');
         
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
        
    }
});

/**
 * GET /
 * ADMIN - Edit Post
 */

router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
  
      const locals = {
        title: "Edit Post",
        description: "Test Blog for Kesbangpol"
      };
  
      const data = await Post.findOne({ _id: req.params.id });
  
      res.render('admin/edit-post', {
        locals,
        data,
        layout: adminLayout
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });

/**
 * PUT /
 * ADMIN - Create New Post
 */

router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
  
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      });
  
      res.redirect(`/edit-post/${req.params.id}`);
  
    } catch (error) {
      console.log(error);
    }
  
  });

module.exports = router;
