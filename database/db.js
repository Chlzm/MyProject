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
var db = mongoose.connect('mongodb://localhost/data');
var Schema = mongoose.Schema;
// 用户信息
var userScheMa = new Schema({
    name: String,
    password: String
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
exports.user = db.model('users', userScheMa);
exports.knowledge = db.model('knowledge1', knowledge);
exports.opera = db.model('opera_1', opera);