const util = require('util');
const notify = require('../configs/notify');
const {check} = require('express-validator')

const options ={
    username:   {min: 5 , max: 100},
    name:       {min: 5 , max: 100},
    password:   {min: 5 , max: 20},
    enum:       ['user']

}
module.exports=[
    check('username', util.format(notify.ERROR_NAME, options.username.min , options.username.max))
        .isLength({ min: options.username.min, max: options.username.max}),
    check('name', util.format(notify.ERROR_NAME, options.name.min , options.name.max))
        .isLength({ min: options.name.min, max: options.name.max}),
    check('role', util.format(notify.ERROR_ROLE))
        .isIn(options.enum),
    check('password', util.format(notify.ERROR_NAME, options.password.min , options.password.max))
        .isLength({ min: options.password.min, max: options.password.max}),
]