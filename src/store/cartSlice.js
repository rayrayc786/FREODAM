import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isOpen: false
    },
    reducers: {
        addToCart: (state, action) => {
            const { product, size } = action.payload;
            const existingItem = state.items.find(item => item.id === product.id && item.size === size);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, size, quantity: 1 });
            }
            state.isOpen = true;
        },
        removeFromCart: (state, action) => {
            const { id, size } = action.payload;
            state.items = state.items.filter(item => !(item.id === id && item.size === size));
        },
        updateQuantity: (state, action) => {
            const { id, size, quantity } = action.payload;
            const item = state.items.find(i => i.id === id && i.size === size);
            if (item) {
                item.quantity = Math.max(1, quantity);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
