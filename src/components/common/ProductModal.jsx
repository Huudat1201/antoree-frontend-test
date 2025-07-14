import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShoppingCart, Heart, Star, Sparkles, X } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
    const { state, dispatch } = useAppContext();
    const [aiDescription, setAiDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setAiDescription('');
    }, [product]);

    if (!product) return null;
    const isFavorite = state.favorites.has(product.id);

    const handleToggleFavorite = () => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id });
        dispatch({ type: 'SHOW_TOAST', payload: isFavorite ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích' });
    };

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        dispatch({ type: 'SHOW_TOAST', payload: `Đã thêm "${product.name}"` });
    };

    const handleGenerateDescription = async () => {
        setIsGenerating(true);
        setAiDescription('');
        const prompt = `Với vai trò là một chuyên gia tư vấn giáo dục, hãy viết một mô tả chi tiết, hấp dẫn và thuyết phục cho khóa học có tên "${product.name}". Mô tả ngắn của khóa học là: "${product.shortDescription}".
        
        Cấu trúc bài viết cần bao gồm:
        1.  **Đoạn mở đầu:** Giới thiệu tổng quan và thu hút về khóa học.
        2.  **Bạn sẽ học được gì?** Liệt kê các kiến thức và kỹ năng cốt lõi (dưới dạng gạch đầu dòng).
        3.  **Khóa học này dành cho ai?** Nêu rõ các đối tượng phù hợp.
        4.  **Tại sao nên chọn khóa học này?** Nêu bật những điểm độc đáo, lợi ích vượt trội.
        
        Sử dụng ngôn ngữ chuyên nghiệp, tích cực và tập trung vào lợi ích của người học.`;

        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error(`Lỗi API: ${response.status} ${response.statusText}. Có thể bạn chưa cung cấp API Key hợp lệ.`);
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setAiDescription(text.replace(/\n/g, '<br />').replace(/\*/g, '•'));
            } else {
                setAiDescription("Rất tiếc, không thể tạo mô tả lúc này. Phản hồi từ AI không hợp lệ.");
            }
        } catch (error) {
            console.error("Error generating description:", error);
            setAiDescription(`Đã xảy ra lỗi: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <div className="relative"><img src={product.image.replace('600x400', '800x400')} alt={product.name} className="w-full h-64 object-cover rounded-t-xl" /><button onClick={onClose} className="absolute top-4 right-4 bg-white/70 rounded-full p-2 hover:bg-white transition-all"><X size={24} className="text-gray-700" /></button></div>
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                    <div className="flex items-center mt-2 text-gray-600 flex-wrap"><Star size={20} className="text-yellow-400 mr-1" fill="currentColor" /><span className="font-semibold">{product.rating}</span><span className="mx-2">·</span><span>{product.reviews.toLocaleString('vi-VN')} đánh giá</span><span className="mx-2">·</span><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{product.category}</span></div>
                    <p className="text-3xl font-bold text-blue-600 my-4">{product.price.toLocaleString('vi-VN')}₫</p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: aiDescription || product.longDescription }}></p>
                        {isGenerating && <div className="mt-4 text-center text-blue-600">Đang tạo mô tả...</div>}
                    </div>

                    <div className="mt-4 text-center">
                        <button onClick={handleGenerateDescription} disabled={isGenerating} className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-teal-500 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto">
                            <Sparkles size={16} className="mr-2" />
                            {isGenerating ? 'Đang xử lý...' : '✨ Tạo mô tả bằng AI'}
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <button onClick={handleAddToCart} className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"><ShoppingCart size={20} className="mr-2" /> Thêm vào giỏ hàng</button>
                        <button onClick={handleToggleFavorite} className={`flex-1 font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center ${isFavorite ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}><Heart size={20} className="mr-2" fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Đã yêu thích' : 'Thêm vào yêu thích'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
   