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
module.exports = router;
