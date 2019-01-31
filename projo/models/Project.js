const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  email: String,
  password: String,
  projectName:String,
  lookingfor:String,
  description:String,
  budget:String,
  imgPath: String,
  imgName: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

