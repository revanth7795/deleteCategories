const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    "name": {type: String, required: true},
    "deleted": Boolean,
    "categoryId": {type: String, required: true},
    "createdAt": {type: Date},
    "updatedAt":{type: Date}
})

product.pre('save', function(next){
    now = Date.now()
    this.updatedAt = now;
    if ( !this.createdAt ) {
      this.createdAt = now;
    }
    next();
  });

  product.statics= {
    create : function(data, cb) {
        let user = new this(data);
        user.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getone: function(query, cb) {
        this.findOne(query,cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    updateMultiple: function(query, updateData, cb) {
        this.updateMany(query, {$set: updateData}, cb);
    }
}


module.exports = mongoose.model('products', product);
