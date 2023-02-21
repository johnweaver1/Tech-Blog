const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/', withAuth, async (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'description',
      'title',
      'date_created'],
    include: [
      {
        include: {
          model: User,
          attributes: ['name'],
        },
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  try {
      const updatePost = await Post.update({
          where: {
          user_id: req.session.user_id,
          description: req.session.description,
          }
      });
      res.status(200).json(updatePost);
  } catch (err) {
      res.status(400).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
