import { useAppContext } from '../../context/AppContext';
import { Search, Heart, ShoppingCart, Sparkles } from 'lucide-react';

const Header = ({ currentView, setCurrentView }) => {
    const { state } = useAppContext();
    const navItems = [
        { id: 'shop', label: 'Khám phá', icon: <Search /> },
        { id: 'favorites', label: 'Yêu thích', icon: <Heart />, count: state.favorites.size },
        { id: 'cart', label: 'Giỏ hàng', icon: <ShoppingCart />, count: state.cart.size },
    ];
    return (
        <header className="bg-white shadow-sm sticky top-0 z-30">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('shop'); }} className="text-2xl font-bold text-blue-600 flex items-center">
                    ANTOREE
                </a>
                <div className="flex items-center space-x-2 sm:space-x-6">
                    {navItems.map(item => (
                        <button key={item.id} onClick={() => setCurrentView(item.id)} className={`p-2 rounded-md relative transition-colors ${currentView === item.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {item.icon}
                            <span className="hidden sm:inline ml-2">{item.label}</span>
                            {item.count > 0 && (<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{item.count}</span>)}
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    );
};
export default Header;