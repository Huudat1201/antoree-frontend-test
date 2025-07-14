import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const ProductCard = React.memo(({ product, onSelect }) => {
    const { state, dispatch } = useAppContext();
    const isFavorite = state.favorites.has(product.id);

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id });
        dispatch({ type: 'SHOW_TOAST', payload: isFavorite ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích' });
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch({ type: 'ADD_TO_CART', payload: product });
        dispatch({ type: 'SHOW_TOAST', payload: `Đã thêm "${product.name}"` });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group flex flex-col">
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover cursor-pointer" onClick={() => onSelect(product)} />
                <button onClick={handleToggleFavorite} className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/70 text-gray-700 hover:bg-white'}`}><Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} /></button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 truncate cursor-pointer" onClick={() => onSelect(product)}>{product.name}</h3>
                <p className="text-gray-600 mt-1 flex-grow text-sm">{product.shortDescription}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500"><Star size={16} className="text-yellow-400 mr-1" fill="currentColor" /><span>{product.rating} ({product.reviews} đánh giá)</span></div>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-xl font-bold text-blue-600">{product.price.toLocaleString('vi-VN')}₫</p>
                    <button onClick={handleAddToCart} className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors"><ShoppingCart size={20} /></button>
                </div>
            </div>
        </div>
    );
});

export default ProductCard;