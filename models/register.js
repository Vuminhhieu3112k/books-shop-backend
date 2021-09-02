const MainModel = require('../schemas/users')

module.exports = {

    select: (item) => {
        return MainModel.count({username: item.username})
    },
    create: (item) => {
        return new MainModel(item).save()
    }
}