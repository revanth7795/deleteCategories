var categoryModel = require('../models/categories');
var productModel = require('../models/products');
const config = require('../config/config').get(process.env.NODE_ENV);

exports.saveCategories = function (req, res, next) {
    categoryModel.get({deleted: false}, async function (err, data) {
        if (!err && !data.length) {
            let categories = config.categories; // getting default categories data from config file to save in DB
            let products = config.products; // getting default products data from config file to save in DB
            for(let category of categories){
                let categorySaved = await saveCategories(category)
                for(let product of products[category]){
                    await saveProduct({name: product, deleted: false, categoryId: categorySaved._id});
                }
            }
        }
    })    
}

function saveCategories(category){ // save categories function which accepts category name and save the record
    return new Promise((resolve,reject)=>{
        categoryModel.create({name: category, deleted: false}, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function saveProduct(productData){ // save product function which accepts product object including categoryId and save the record
    return new Promise((resolve,reject)=>{
        productModel.create(productData, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

exports.deleteCategory = function (req, res, next) {
    let query = {
        name: req.body.categoryName
    }
    categoryModel.get(query, function (err, data) { // get categoryId based on the category name to delete products
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            let categoryId = data[0]._id
            productModel.updateMultiple({categoryId: categoryId},{deleted: true}, function (err, data) { // delete products by category ID
                if (err) {
                    res.status(500).json({
                        error: err
                    })
                } else {
                    productModel.get({categoryId: categoryId, deleted: true}, function (err, data) { // fetching deleted products by category ID used to delete
                        if (err) {
                            res.status(500).json({
                                error: err
                            })
                        } else {
                            res.status(200).json({ success: true, data: data})
                        }
                    })
                }
            })
        }
    })
}


