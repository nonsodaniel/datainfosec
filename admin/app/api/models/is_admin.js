const mongoose = require("mongoose");

//Define a schema

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    state: {
      type: String,
      trim: true,
      required: true
    },
    dob: {
      type: String,
      trim: true,
      required: true
    },
    staff_dp: {
      type: String,
      required: false,
      trim: true
    },


  },
  { timestamps: true }
);


module.exports = mongoose.model("Admin", AdminSchema);
