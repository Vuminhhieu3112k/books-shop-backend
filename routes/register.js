var express = require('express');
var router = express.Router();
var asyncHandler = require('../middleware/async')
const {validationResult}=  require('express-validator')

const MainModel = require('../models/register')
const Validate = require('../validates/register')
/* GET users listing. */

router.post('/add',Validate,asyncHandler(async (req, res, next) => {
  let errors = validationResult(req).errors;
  errors.forEach(element => {
    delete element.value
    delete element.location
  })
  if(errors.length != 0){
    res.status(400).json({
      success: false,
      message: errors
    })
    return
  }
  const select = await MainModel.select(req.body);
  if(select != 0){
    res.status(400).json({
      success: false,
      message: "userName exist"
    })
    return
  }
  const data = await MainModel.create(req.body);
  res.status(400).json({
    success: false,
    message: data
  })
}))

module.exports = router;

