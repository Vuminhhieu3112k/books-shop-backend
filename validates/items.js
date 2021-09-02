const util = require('util');
const notify = require('../configs/notify');
const {check} = require('express-validator')

const options ={
    name:{min: 5 , max: 100}
}
module.exports=[
    check('name', util.format(notify.ERROR_NAME, options.name.min , options.name.max))
        .isLength({ min: options.name.min, max: options.name.max}),
    check('phone', util.format(notify.ERROR_NAME, options.name.min , options.name.max))
        .isLength({ min: options.name.min, max: options.name.max})

]