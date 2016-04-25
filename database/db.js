/*
* .find({ occupation: /host/ })
 .where('name.last').equals('Ghost')
 .where('age').gt(17).lt(66)
 .where('likes').in(['vaporizing', 'talking'])
 .limit(10)
 .sort('-occupation')
 .select('name occupation')
 .exec(callback);
* */
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/chihuo');
var Schema = mongoose.Schema;
// 用户信息
var userSchema = new Schema({
    name: String,
    password: String,
    nickName : String
});
// 热门知识推荐
var knowledge = new Schema({
    url : String,
    imageUrl : String,
    viewCount : Number,
    commentCount : Number,
    text : String
});
// 热门戏曲
var opera = new Schema({
    url : String,
    imageUrl : String,
    viewCount : Number,
    commentCount : Number,
    text : String
});
// 找朋友信息推荐
var friends = new Schema({
    lookForPerson : String,
    lostPerson : String,
    address : String,
    status : String
});
exports.user = db.model('users', userSchema);
exports.knowledge = db.model('knowledge1', knowledge);
exports.opera = db.model('opera_1', opera);
exports.friends = db.model('friends1', friends);