import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';      
import ProductCard from '../components/common/ProductCard';
import EmptyState from '../components/common/EmptyState';
import { Heart } from 'lucide-react';

const FavoritesView = ({ onSelectProduct, onSwitchView }) => {
    const { state } = useAppContext();
    const favoriteProducts = useMemo(() => state.allProducts.filter(p => state.favorites.has(p.id)), [state.favorites, state.allProducts]);
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Sản phẩm yêu thích</h2>
            {favoriteProducts.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{favoriteProducts.map(product => <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />)}</div>) : (<EmptyState icon={<Heart size={48} />} title="Danh sách yêu thích trống" message="Hãy khám phá và thêm các khóa học bạn quan tâm nhé!" ctaText="Khám phá ngay" onCtaClick={() => onSwitchView('shop')} />)}
        </div>
    );
};

export default FavoritesView;