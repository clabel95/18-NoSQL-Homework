const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
      //this will create a new id whenever a new thougth is created.
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => {
          return new Types.ObjectId();
        },
      },
      //this holds the string that is the reaction.
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      //this holds the string of the username of the user who wrote the reaction.
      username: {
        type: String,
        required: true,
      },
      //this shows when the reaction was created. 
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
        },
      },
    },
    {
      toJSON: {virtuals: true },
    }
);

const thoughtSchema = new Schema(
    {
      //this holds the string of a thought.
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      //this shows when the thought was created.
      createdAt: {
        type: Date,
        default: Date.now,
      },
      //this holds a sting of the username for the user that posted the thought.
      username: {
        type: String,
        required: true,
      },
      //this holds an array of all the reactions that users have to the thought.
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
  );  
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;