const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
          where: {
            // use the ID from the session
            user_id: req.session.user_id
          },
          attributes: [
            'id',
            'title',
            'date_created',
            'description'
        
          ],

            include: [
              {
                model: User,
                attributes: ['name'],
              },
            ],
          });
        const post = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', { 
            ...post,
            logged_in: req.session.logged_in
            
          });
        } catch (err) {
          res.status(500).json(err);
        }


    });

    module.exports = router