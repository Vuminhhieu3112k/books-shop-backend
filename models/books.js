const MainModel = require('../schemas/books')

module.exports = {
    listItem: (params, option) => {
        const queryFind = { ...(params || {}) }
        let find, select, sort
        //Find fields
        let removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(params => delete queryFind[params])
        // let queryStr = JSON.stringify(queryFind);
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`);
        const keys = Object.keys(params);
        if(params.name){
            params.name = JSON.parse(params.name);
        };
        if(params.description){
            params.description = JSON.parse(params.description);
        }
        find = params;
        //Select fields
        console.log(find);
        if (params.select) {
            select = params.select.split(',').join(' ')
        }
        // return MainModel.find({ name: {'$regex' : 'a', '$options' : 'i'} })
        //Sort fields
        if (params.sort) {
            sort = params.sort.split(',').join('')
        }
        //Pagination
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || 3;
        const skip = (page - 1) * limit;

        if (option.task == 'all') {
            if (params.page) {
                return MainModel
                    .find(find)
                    .select(select)
                    .sort(sort)
                    .skip(skip).limit(limit)
            } else {
                return MainModel
                    .find(find)
                    .select(select)
                    .sort(sort)
            }
        }
        if (option.task == 'one') {
            return MainModel
                .findById(params.id)
        }
    },
    create: (item) => {
        return new MainModel(item).save()
    },
    deleteItem: (params, option) => {
        if (option.task == 'one') {
            return MainModel
                .deleteOne({ _id: params.id })
        }
    },
    editItem: (params, option) => {
        if (option.task == 'edit') {
            return MainModel
                .updateOne({ _id: params.id }, params.body)

        }
    }
}