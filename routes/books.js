var express = require('express');
var router = express.Router();
var asyncHandler = require('../middleware/async')
const multer  = require('multer')
const fs = require("fs")
const MainModel = require('../models/books')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const dataAll = await MainModel.listItem('', { 'task': 'all' })
  const data = await MainModel.listItem(req.query, { 'task': 'all' })
  res.status(200).json({
    success: true,
    count: dataAll.length,
    data: data
  })
}))
router.get('/:id', asyncHandler(async function (req, res, next) {
  const data = await MainModel.listItem({ id: req.params.id }, { 'task': 'one' })
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.post('/add',upload.single('image'), asyncHandler(async (req, res, next) => {
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var base64 = Buffer.from(encode_img,'base64');
  req.body.imageBook = {
    data: base64,
    contentType: req.file.mimetype
  };
  const data = await MainModel.create(req.body).catch(res =>{
    console.log(res);
  });
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.delete('/delete/:id', asyncHandler(async function (req, res, next) {
  const data = await MainModel.deleteItem({ id: req.params.id }, { 'task': 'one' })
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.put('/edit/:id', asyncHandler(async function (req, res, next) {
  let body = req.body;
  const data = await MainModel.editItem({ id: req.params.id, body: body }, { 'task': 'edit' })
  res.status(200).json({
    success: true,
    data: data
  })
}));

module.exports = router;

