import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    userdata: JSON.parse(localStorage.getItem("user")),
    // userdata: localStorage.getItem("user"),
  },
  reducers: {
    addProduct: (state, action) => {
      const { _id, extras, size } = action.payload;

      // Find the index of the product in the cart by _id, extras, and size
      const productIndex = state.products.findIndex(
        (product) =>
          product._id === _id &&
          product.extras.toString() === extras.toString() &&
          product.size === size
      );

      if (productIndex !== -1) {
        // If the product is already in the cart, increment its quantity
        state.products[productIndex].quantity += 1;
      } else {
        state.products.push(action.payload);
      }

      state.quantity = state.products.length;
      state.total = 0;
      state.products.forEach((product) => {
        const price = product.price || 0;
        const quantity = product.quantity || 0;
        state.total += price * quantity;
      });
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    incrementQuantity: (state, action) => {
      const { id, extras, size } = action.payload;

      // Find the index of the product in the cart by _id, extras, and size
      const productIndex = state.products.findIndex(
        (product) =>
          product._id === id &&
          product.extras.toString() === extras.toString() &&
          product.size === size
      );

      if (productIndex !== -1) {
        // If the product is already in the cart, increment its quantity
        state.products[productIndex].quantity += 1;
      }
      state.quantity = state.products.length;
      state.total = 0;
      state.products.forEach((product) => {
        const price = product.price || 0;
        const quantity = product.quantity || 0;
        state.total += price * quantity;
      });
    },

    decrementQuantity: (state, action) => {
      const { id, size, extras } = action.payload;
      const cartItem = state.products.find(
        (item) =>
          item._id === id &&
          item.size === size &&
          JSON.stringify(item.extras) === JSON.stringify(extras)
      );
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }

      state.quantity = state.products.length;
      state.total = 0;
      state.products.forEach((product) => {
        const price = product.price || 0;
        const quantity = product.quantity || 0;
        state.total += price * quantity;
      });
    },

    deleteProduct: (state, action) => {
      const { id, size, extras } = action.payload;

      // Use the filter method to create a new array without the product to be deleted
      state.products = state.products.filter(
        (product) =>
          !(
            product._id === id &&
            product.size === size &&
            JSON.stringify(product.extras) === JSON.stringify(extras)
          )
      );

      state.quantity = state.products.length;
      state.total = 0;
      state.products.forEach((product) => {
        const price = product.price || 0;
        const quantity = product.quantity || 0;
        state.total += price * quantity;
      });
    },


    setUserdata:(state,action)=>{
      state.userdata=action.payload;
    },
    logoutUserdata:(state)=>{
      state.userdata=null;
    }
  },
});

export const {
  addProduct,
  reset,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  setUserdata,
  logoutUserdata
} = cartSlice.actions;
export default cartSlice.reducer;
