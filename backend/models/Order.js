const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    products:{
      type: [],
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
      required: true,
    },
    method: {
      type: Number,
      required: true,
    },
    deliveredAt:{
        type:Date,
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
