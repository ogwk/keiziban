const Post = require('../node-postgres/add');
//basic認証

exports.index=function(req,res,next){    
    res.render('posts/index');
};

exports.list=function(req,res){
    
    Post.findAll().then((posts) => {
        res.render('posts/list', {posts: posts});
    });
};

exports.destroy=function(req,res){
    Post.findAll().then((posts) => {
        for (var i = 0; i < posts.length; i++){
            var DeleteData = posts[i];
            var name = posts.content;
            DeleteData.destroy().then(() => {
                console.log(name + "が削除されました。");
            });
        }
        res.redirect('/posts/list');
    });
};


exports.create=function(req,res){
    Post.create({
        content: req.body.content,
        trackingCookie: null,
        postedBy: req.user
    }).then(() => {
        res.redirect('/posts/list');
        console.log('データが追加されました。')
    });
};