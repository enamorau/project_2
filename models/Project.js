const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  
  projectName:String,
  lookingfor:String,
  description:String,
  budget:String,
  imgPath: String,
  imgName: String,
  
  projectOwner:[
    {type: Schema.Types.ObjectId,
    ref: "User"}
  ],

  userInterest:[
    {type: Schema.Types.ObjectId,
    ref: "User"}
  ],
  matchedWithUsers: [
    {type: Schema.Types.ObjectId,
    ref: "User"}
  ],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

