import { createSlice } from '@reduxjs/toolkit';
import initialProducts from '../data/products.json';

// Local storage helper
const getStoredProducts = () => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : initialProducts;
};

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: getStoredProducts(),
        filters: {
            category: 'All',
            sortBy: 'Newest',
            search: ''
        }
    },
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
            localStorage.setItem('products', JSON.stringify(action.payload));
        },
        addProduct: (state, action) => {
            state.items.unshift(action.payload);
            localStorage.setItem('products', JSON.stringify(state.items));
        },
        updateProduct: (state, action) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
                localStorage.setItem('products', JSON.stringify(state.items));
            }
        },
        deleteProduct: (state, action) => {
            state.items = state.items.filter(p => p.id !== action.payload);
            localStorage.setItem('products', JSON.stringify(state.items));
        },
        toggleStock: (state, action) => {
            const product = state.items.find(p => p.id === action.payload);
            if (product) {
                product.inStock = !product.inStock;
                localStorage.setItem('products', JSON.stringify(state.items));
            }
        },
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        }
    }
});

export const { setProducts, addProduct, updateProduct, deleteProduct, toggleStock, setFilter } = productSlice.actions;
export default productSlice.reducer;
