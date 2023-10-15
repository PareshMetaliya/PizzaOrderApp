const mongoose = require("mongoose");

const { Schema } = mongoose;

const PizzaSchema = new Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
      },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pizza", PizzaSchema);
