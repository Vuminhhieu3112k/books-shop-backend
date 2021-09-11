var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
var asyncHandler = require('../middleware/async')

const UserModel = require('../models/users')

/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const data = await UserModel.listItem(req.query, { 'task': 'all' })
  res.status(200).json({
    success: true,
    count: data.length,
    data: data
  })
}))
router.get('/:id', asyncHandler(async function (req, res, next) {
  const data = await UserModel.listItem({ id: req.params.id }, { 'task': 'one' })
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.post('/add', asyncHandler(async (req, res, next) => {
  const data = await UserModel.create(req.body);
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.delete('/delete/:id', asyncHandler(async function (req, res, next) {
  const data = await UserModel.deleteItem({ id: req.params.id }, { 'task': 'one' })
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.put('/edit/:id', asyncHandler(async function (req, res, next) {
  let body = req.body;
  const data = await UserModel.editItem({ id: req.params.id, body: body })
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.post('/login', asyncHandler(async function (req, res, next) {
  const data = await UserModel.login(req.body);
  res.status(200).json({
    success: true,
    data: data
  })
}));
router.post('/cart/:id', asyncHandler(async (req, res, next) => {
  let body = req.body;
  const getData = await UserModel.listItem({ id: req.params.id }, { 'task': 'one' })
  if(getData.cart.length==0){
    getData.cart.push(body)
    const saveData =  await UserModel.editItem({ id: req.params.id, body: getData })
    res.status(200).json({
      success: true,
      data: saveData
    })
  } else{
    let check = true
    for await(let el of getData.cart){
      if(el._id == body._id){
        el.quantity += body.quantity
        el.price = body.price
        el.discount = body.discount
        check= false
        const saveData =  await UserModel.editItem({ id: req.params.id, body: getData })
        res.status(200).json({
          success: true,
          data: saveData
        })
      }
    }
    if(check){
      getData.cart.push(body)
      const saveData =  await UserModel.editItem({ id: req.params.id, body: getData })
      res.status(200).json({
      success: true,
      data: saveData
    })
    }
  }
}));
module.exports = router;

