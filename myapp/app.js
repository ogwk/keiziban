var express = require('express'),
    app = express();
    post = require('./routes/post');

var logger = require('morgan');//npm install morganでインストール済み
//var methodOverride = require('method-override');

const basicAuth = require('express-basic-auth')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//middleware
app.use(express.json());
app.use(express.urlencoded()); //画面からデータがとれる
//app.use(express.methodOverride());

app.use(logger('dev'));//log
//app.use(app.router);　・・Express4では不要

app.use(basicAuth({
    users: { 'admin': 'password' }
}))

//routing

app.get('/', post.index, {users: users});//ログイン画面
//app.post('/posts/list', post.list);//一覧表示
app.get('/posts/list', post.list);//一覧表示
app.post('/posts/list/create', post.create);//追加
app.post('/posts/list/destroy', post.destroy);//全削除
//app.use(express.static(__dirname + '/views'));
/*
app.use(function(req, res, next){
    console.log('my custom middleware');
    next();//次のミドルウェアへ
});
*/

//app.get('/', function(req,res){
//    res.render('posts/index');
//});

app.get('/list', function(req,res){
    res.render('list');
});

app.post('/create', function(req, res){
    res.send(req.body.name);
})

app.listen(8000);
console.log("server starting...");