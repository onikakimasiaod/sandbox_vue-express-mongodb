const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET Posts

//'/' equals /api/posts
router.get('/', async (req,res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//CREATE Post

router.post('/',async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({ //insertOne --> belongs to MongoDB
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//DELETE Post
router.delete('/:id',async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@cluster.yieqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true});
    return client.db('Cluster').collection('posts');
}

module.exports = router;