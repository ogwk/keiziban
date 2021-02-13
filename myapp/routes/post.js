const Post = require('../node-postgres/add');
//basic認証


const admins = {
    'username':{password:'password'}
};




exports.index=function(req,res,next){
    const user = auth(req);
    if(!user || !admins[user.name] || admins[user.name].password !== user.pass){
        response.set('WWW-Authenticate', 'Basic realm="example"');
        return response.status(401).send();
    }else{
        res.render('posts/index');
    }
    return next();
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