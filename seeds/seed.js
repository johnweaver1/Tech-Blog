const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const users = [
  {
      name: "John",
      password: "john1"
  },
  {
      name: "chase",
      password: "chase1"
  },
  {    name: "weaver",
      password: "weaver1"
  },

]

const posts = [
  {
      title: "I shouldn't have skipped class",
      description: "Eh, but I'm fine",
      date_created: "1/22/2022",
      user_id: 1
  },
  {
      title: "This class definitely won't stress me out",
      description: "it did",
      date_created: "11/10/2022",
      user_id: 2
  },
  {
      title: "Help I'm stuck in a computer",
      description: "Can anyone read this?",
      date_created: "01/20/2023",
      user_id: 2
  },
  {
      title: "Just out here blogging about class",
      description: "Css is crazy riiiiiiiiiight?",
      date_created: "2/14/2023",
      user_id: 3
  },
]

const comments = [
  {
      comment_body: "Keep working it'll get better!",
      post_id: 1,
  },
  {
      comment_body: "it will!",
      post_id: 2,
  },
  {
      comment_body: "Top men are on it!",
      post_id: 3,
  },
  {
      comment_body: "Have you ever looked at a css file? It's crazy!",
      post_id: 4,

  },

]

const seedDatabase = async () => {
  try{
    await sequelize.sync({force:true})
    await User.bulkCreate(users,{
        individualHooks:true
    });
    await Post.bulkCreate(posts);
    await Comment.bulkCreate(comments);
    process.exit(0);
} catch(err){
    console.log(err)
}
}

seedDatabase();
