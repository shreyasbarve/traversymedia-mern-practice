const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // references to the Model which is specified
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true } // automatically adds the createdAt and updatedAt fields
);

module.exports = mongoose.model("Goal", goalSchema);
