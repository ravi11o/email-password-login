var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true}
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if(this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next()
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model('User', userSchema);