import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/common/ProductCard';
import EmptyState from '../components/common/EmptyState';
import SkeletonCard from '../components/common/SkeletonCard';
import { Search, BrainCircuit } from 'lucide-react';

const ShopPage = ({ onSelectProduct }) => {
    const { state, dispatch } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);

    useEffect(() => {
        if (!isShowingSuggestions) {
            let products = [...state.allProducts];
            if (searchTerm) {
                products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            if (priceFilter !== 'all') {
                products = products.filter(p => {
                    if (priceFilter === '<500') return p.price < 500000;
                    if (priceFilter === '500-1M') return p.price >= 500000 && p.price <= 1000000;
                    if (priceFilter === '>1M') return p.price > 1000000;
                    return true;
                });
            }
            setDisplayedProducts(products);
        }
    }, [searchTerm, priceFilter, state.allProducts, isShowingSuggestions]);

    const handleGetSuggestions = () => {
        setIsLoadingSuggestions(true);
        setIsShowingSuggestions(false);
        setApiError(null);
        setTimeout(() => {
            if (Math.random() < 0.2) {
                setApiError('Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.');
            } else {
                const { favorites, viewHistory, cart, allProducts } = state;
                const suggestionPool = new Set([...favorites, ...viewHistory, ...cart.keys()]);
                let suggestedProducts = [];
                if (suggestionPool.size > 0) {
                    const interestedProducts = allProducts.filter(p => suggestionPool.has(p.id));
                    const categories = new Set(interestedProducts.map(p => p.category));
                    suggestedProducts = allProducts.filter(p => categories.has(p.category) && !suggestionPool.has(p.id));
                }
                if (suggestedProducts.length < 4) {
                    const randomProducts = [...allProducts].filter(p => !suggestionPool.has(p.id) && !suggestedProducts.some(sp => sp.id === p.id)).sort(() => 0.5 - Math.random()).slice(0, 4 - suggestedProducts.length);
                    suggestedProducts.push(...randomProducts);
                }
                setDisplayedProducts(suggestedProducts.slice(0, 4));
                setIsShowingSuggestions(true);
                dispatch({ type: 'SHOW_TOAST', payload: 'Đây là những gợi ý dành riêng cho bạn!' });
            }
            setIsLoadingSuggestions(false);
        }, 1500);
    };
    
    const handleClearSuggestions = () => {
        setIsShowingSuggestions(false);
        setSearchTerm('');
        setPriceFilter('all');
    }

    return (
        <div className="animate-fade-in">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                    <div className="relative lg:col-span-3">
                        <input type="text" placeholder="Tìm kiếm khóa học..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <div className="flex items-center space-x-2 text-sm lg:col-span-2 flex-wrap">
                        <span className="font-semibold text-gray-600 mr-2">Giá:</span>
                        {['all', '<500', '500-1M', '>1M'].map(filter => 
                            <button 
                                key={filter} 
                                onClick={() => setPriceFilter(filter)} 
                                className={`px-3 py-1 rounded-full transition-colors ${priceFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {filter === 'all' ? 'Tất cả' : filter.replace('<', '< ').replace('>', '> ').replace('M', 'Tr')}
                            </button>
                        )}
                    </div>
                </div>
                <div className="mt-4 text-center border-t pt-4">
                    <button 
                        onClick={handleGetSuggestions} 
                        disabled={isLoadingSuggestions} 
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                    >
                        <BrainCircuit size={20} className="mr-2" />
                        {isLoadingSuggestions ? 'Đang tìm gợi ý...' : 'Gợi ý sản phẩm phù hợp'}
                    </button>
                </div>
            </div>
            {apiError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert">
                    <p className="font-bold">Lỗi</p>
                    <p>{apiError}</p>
                </div>
            )}
            {isShowingSuggestions && (
                <div className="bg-purple-100 border-l-4 border-purple-500 text-purple-700 p-4 rounded-md mb-6 flex justify-between items-center">
                    <p>Hiển thị các sản phẩm được gợi ý cho bạn.</p>
                    <button onClick={handleClearSuggestions} className="font-semibold hover:text-purple-900">Xóa gợi ý</button>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {state.isLoading || isLoadingSuggestions ? 
                    (Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)) : 
                    displayedProducts.length > 0 ? 
                    (displayedProducts.map(product => <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />)) : 
                    (<div className="col-span-full"><EmptyState icon={<Search size={48} />} title="Không tìm thấy sản phẩm" message="Vui lòng thử lại với từ khóa hoặc bộ lọc khác." /></div>)
                }
            </div>
        </div>
    );
};

export default ShopPage;
