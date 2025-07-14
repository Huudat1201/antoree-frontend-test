import React, { useState } from 'react';

// Import Context và các Hooks cần thiết
import { AppProvider, useAppContext } from './context/AppContext';

// Import các component Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer'; // Thêm Footer

// Import các component chung
import ProductModal from './components/common/ProductModal';
import Toast from './components/common/Toast';
import AiChatbot from './components/ai/AiChatbot';

// Import các trang (Pages)
import ShopPage from './pages/ShopPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';

// Import file CSS chính (chứa các chỉ thị của Tailwind)
import './index.css';

/**
 * AppLayout component chịu trách nhiệm cho cấu trúc layout chính của trang web
 * và logic chuyển đổi giữa các trang.
 */
function AppLayout() {
    const { dispatch } = useAppContext();
    const [currentView, setCurrentView] = useState('shop');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Hàm này được truyền xuống các component con để khi người dùng
    // click vào một sản phẩm, modal chi tiết sẽ hiện ra.
    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        dispatch({ type: 'ADD_TO_VIEW_HISTORY', payload: product.id });
    };

    // Dựa vào state `currentView`, quyết định sẽ render trang nào.
    const renderContent = () => {
        switch (currentView) {
            case 'favorites':
                return <FavoritesPage onSelectProduct={handleSelectProduct} onSwitchView={setCurrentView} />;
            case 'cart':
                return <CartPage onSwitchView={setCurrentView} />;
            default:
                return <ShopPage onSelectProduct={handleSelectProduct} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <Header currentView={currentView} setCurrentView={setCurrentView} />
            
            {/* Phần nội dung chính của trang sẽ thay đổi tùy theo `currentView` */}
            <main className="container mx-auto p-4 md:p-8 flex-grow">
                {renderContent()}
            </main>
            
            <Footer />
            
            {/* Các component này là "global", có thể xuất hiện trên bất kỳ trang nào */}
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <Toast />
            <AiChatbot />
        </div>
    );
}

/**
 * Đây là component gốc của toàn bộ ứng dụng.
 * Nhiệm vụ của nó là bọc AppLayout trong AppProvider
 * để tất cả các component con có thể truy cập vào state chung.
 */
export default function App() {
    return (
        <AppProvider>
            <AppLayout />
        </AppProvider>
    );
}
