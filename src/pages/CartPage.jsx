import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Trash2, Plus, Minus, X, ShoppingCart } from 'lucide-react'; // Đổi về lucide-react và thêm ShoppingCart
import EmptyState from '../components/common/EmptyState'; // Sửa lại đường dẫn

const CartPage = ({ onSwitchView }) => {
    const { state, dispatch } = useAppContext();

    const cartItems = useMemo(() => Array.from(state.cart.entries()).map(([id, quantity]) => ({ product: state.allProducts.find(p => p.id === id), quantity })).filter(item => item.product), [state.cart, state.allProducts]);
    
    const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0), [cartItems]);
    
    const handleUpdateQuantity = (productId, quantity) => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
    
    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
        dispatch({ type: 'SHOW_TOAST', payload: 'Giỏ hàng đã được xóa' });
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Giỏ hàng của bạn</h2>
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-right mb-4">
                            <button onClick={handleClearCart} className="text-sm text-red-500 hover:text-red-700 flex items-center justify-end ml-auto">
                                <Trash2 size={16} className="mr-1" /> Xóa tất cả
                            </button>
                        </div>
                        {cartItems.map(({ product, quantity }) => (
                            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
                                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-md object-cover" />
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-lg">{product.name}</h4>
                                    <p className="text-gray-600">{product.price.toLocaleString('vi-VN')}₫</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => handleUpdateQuantity(product.id, quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center font-semibold">{quantity}</span>
                                    <button onClick={() => handleUpdateQuantity(product.id, quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button onClick={() => handleUpdateQuantity(product.id, 0)} className="text-red-500 hover:text-red-700">
                                    <X size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Tổng cộng</h3>
                        <div className="flex justify-between mb-2"><p>Tạm tính</p><p>{cartTotal.toLocaleString('vi-VN')}₫</p></div>
                        <div className="flex justify-between mb-4"><p>Phí vận chuyển</p><p>Miễn phí</p></div>
                        <hr className="my-4" />
                        <div className="flex justify-between font-bold text-lg"><p>Tổng tiền</p><p>{cartTotal.toLocaleString('vi-VN')}₫</p></div>
                        <button className="w-full bg-blue-600 text-white font-bold py-3 mt-6 rounded-lg hover:bg-blue-700 transition-all">Tiến hành thanh toán</button>
                    </div>
                </div>
            ) : (
                <EmptyState 
                    icon={<ShoppingCart size={48} />} 
                    title="Giỏ hàng của bạn trống" 
                    message="Hãy thêm sản phẩm vào giỏ để tiến hành thanh toán." 
                    ctaText="Tiếp tục mua sắm" 
                    onCtaClick={() => onSwitchView('shop')} 
                />
            )}
        </div>
    );
};

export default CartPage;
