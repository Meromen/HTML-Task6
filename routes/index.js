var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('MainPage', { title: 'MainPage' });
});

router.get('/Poem', function(req, res, next) {
  res.render('Poem', { title: 'Poem' });
});

router.get('/About', function(req, res, next) {
    res.render('About', { title: 'About me' });
});

router.get('/Math', function(req, res, next) {
    res.render('Math', { title: 'Math' });
});

router.get('/JSTask', function(req, res, next) {
    res.render('JSTask', { title: 'JS Tasks' });
});

router.get('/JQueryTask', function(req, res, next) {
    res.render('JQueryT', { title: 'JQuery' });
});

router.get('/Calculator', function(req, res, next) {
    res.render('Calc', { title: 'Calculator' });
});

router.get('/GameBall', function(req, res, next) {
    res.render('GameBall', { title: 'Ball Game' });
});

router.get('/GunGame', function(req, res, next) {
    res.render('GameGun', { title: 'Gun Game' });
});

router.get('/Calendar', function(req, res, next) {
    res.render('Calendar', { title: 'Calendar' });
});

router.get('/Game2048', function(req, res, next) {
    res.render('Game2048', { title: '2048' });
});
module.exports = router;
