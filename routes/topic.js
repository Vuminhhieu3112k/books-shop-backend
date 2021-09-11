var express = require('express');
var router = express.Router();
var asyncHandler = require('../middleware/async')

const MainModel = require('../models/topic')

/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
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
router.post('/add', asyncHandler(async (req, res, next) => {
  const data = await MainModel.create(req.body);
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

