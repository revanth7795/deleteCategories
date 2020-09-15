const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    "name": {type: String, required: true},
    "deleted": Boolean,
    "createdAt": {type: Date},
    "updatedAt":{type: Date}
})

category.pre('save', function(next){
    now = Date.now()
    this.updatedAt = now;
    if ( !this.createdAt ) {
      this.createdAt = now;
    }
    next();
  });

  category.statics= {
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
    }
}


module.exports = mongoose.model('categories', category);
