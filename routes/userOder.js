var express = require('express');
var router = express.Router();
var asyncHandler = require('../middleware/async')

const UserModel = require('../models/users')
const OrderModel = require('../models/order')


/* GET users listing. */
router.post('/:id', asyncHandler(async function (req, res, next) {
  let body = req.body;
  const dataUser = await UserModel.listItem({ id: req.params.id }, { 'task': 'one' })
  body.cart =dataUser.cart; 
  await OrderModel.create(body)
  let removed = {cart:[]}
  let dataRemoved= await UserModel.editItem({ id: req.params.id, body: removed }, { 'task': 'edit' })
  res.status(200).json({
    success: true,
    data: dataRemoved
  })
}));


module.exports = router;

