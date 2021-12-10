const mongoose = require('../mongo_db_config')


const userSchema = mongoose.Schema({
      id: { 
            type: mongoose.SchemaTypes.ObjectId,
            default: () => new mongoose.Types.ObjectId()
      },
      firstName: String,
      familyName: String,
      authUserId: String,
      mobile: String,
      email: String,
      chatId: String,
      userTypeId: Number,
      statusTypeId: Number,
      isDeleted: {
            type: Boolean,
            default: false
      },
      insertedAt: {
            type: Date,
            default: () => Date.now()
      },
      updatedAt: {
            type: Date,
            default: () => Date.now()
      }
})

userSchema.methods.getFullName = function(){
      return `${this.firstName} ${this.familyName}`
}

userSchema.pre('save', function(next){
      this.updatedAt = Date.now()
      next()
})

const User = mongoose.model('User', userSchema);
module.exports = User