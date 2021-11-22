var express = require('express');
var router = express.Router();
var asyncHandler = require('../middleware/async')
var path = require('path');
const multer  = require('multer')
const MainModel = require('../models/books')
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ file.fieldname+ file.originalname)
  }
})

var upload = multer({ storage: storage })
/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  // const dataAll = await MainModel.listItem({}, { 'task': 'all' })
  const data = await MainModel.listItem(req.query, { 'task': 'all' })
  res.status(200).json({
    success: true,
    count: data.length,
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
const cpUpload = upload.fields([{ name: 'imageBook', maxCount: 1 }, { name: 'linkDoc', maxCount: 1 }])
router.post('/add',cpUpload, asyncHandler(async (req, res, next) => {
  req.body.imageBook= 'http://localhost:3000/api/v1/books/get-file/'+ req.files.imageBook[0].filename;
  req.body.linkDoc= 'http://localhost:3000/api/v1/books/get-file/' + req.files.linkDoc[0].filename;
  const data = await MainModel.create(req.body)
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.get('/get-file/:id', asyncHandler(async (req, res, next) => {  
  res.sendFile(path.join(`E:/đồ án/backend/public/uploads/${req.params.id}`));
  return
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

