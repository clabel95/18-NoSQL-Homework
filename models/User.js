const { Schema, model } = require("mongoose");
const validator = require("validator");
const userSchema = new Schema(
    {
      //this is a string that holds the users username.
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      //this is a string that holds the users email and also validates the emial with the provided regex validator.
      email: {
        type: String,
        required: true,
        unique: true,
        //this validate value was taken from homework #17 
        validate: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        
      },
      //this holds an array of objects with the link of thought id.
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      //this holds an array of objects with the link of user id.
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  
  const User = model("User", userSchema);
  
  module.exports = User;