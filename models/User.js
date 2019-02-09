const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    fullName: String,
    occupation: String,
    lookingFor: String,
    bio: String,
    link: String,
    imgPath: String,
    imgName: String,
    projectCreated: [
      {type: Schema.Types.ObjectId,
      ref: "Project"}
    ],

    projectInterest: [
      {type: Schema.Types.ObjectId,
      ref: "Project"}
    ],

    matchedWithProjects: [
      {type: Schema.Types.ObjectId,
      ref: "Project"}
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
