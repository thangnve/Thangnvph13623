var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Uploads', function(req, res, next) {
  res.render('Uploads', { title: 'Express' });
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if(file.mimetype == 'image/jpeg'){
      cb(null, 'Uploads/');
    }else {
      cb(new Error("Chỉ được Upload File JPG"), false)
    }
  },

  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({storage: storage ,
  limits: {
    files: 5,
    fileSize: 2 * 1024 * 1024 ,}} ).array('avatar');

router.post("/Uploads", function(req, res, next){
  upload(req, res, function (err) {
    if (err) {
      res.send("File tối thiểu 2MB hoặc upload tối đa 5 file jpg");
      return;
    }
    else {
      res.send("Wow, Bạn đã Uploads Thành Công Rồi");

    }
  })
});
module.exports = router;
