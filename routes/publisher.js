var express = require('express');
var router = express.Router();
var asyncHandler = require('../middleware/async')

const PublisherModel = require('../models/publisher')

/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const dataAll = await PublisherModel.listItem('', { 'task': 'all' })
  const data = await PublisherModel.listItem(req.query, { 'task': 'all' })
  res.status(200).json({
    success: true,
    count: dataAll.length,
    data: data
  })
}))
router.get('/:id', asyncHandler(async function (req, res, next) {
  const data = await PublisherModel.listItem({ id: req.params.id }, { 'task': 'one' })
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.post('/add', asyncHandler(async (req, res, next) => {
  const data = await PublisherModel.create(req.body);
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.delete('/delete/:id', asyncHandler(async function (req, res, next) {
  const data = await PublisherModel.deleteItem({ id: req.params.id }, { 'task': 'one' })
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.put('/edit/:id', asyncHandler(async function (req, res, next) {
  let body = req.body;
  const data = await PublisherModel.editItem({ id: req.params.id, body: body }, { 'task': 'edit' })
  res.status(200).json({
    success: true,
    data: data
  })
}));

module.exports = router;

