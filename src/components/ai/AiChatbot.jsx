import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext'; // Import useAppContext
import { MessageSquare, X, Send } from 'lucide-react'; // Import các icon cần thiết

const AiChatbot = () => {
  const { state } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Xin chào! Tôi là trợ lý AI của ANTOREE. Bạn cần tìm khóa học nào?', sender: 'ai' }]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isAiTyping) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAiTyping(true);

    const productList = state.allProducts.map(p => ({ id: p.id, name: p.name, category: p.category, description: p.shortDescription })).join('\n');
    const conversationHistory = messages.map(m => `${m.sender}: ${m.text}`).join('\n');

    const prompt = `Bạn là một trợ lý tư vấn khóa học thân thiện và chuyên nghiệp tên là ANTOREE.
    Dưới đây là danh sách các khóa học hiện có:
    ${productList}

    Đây là lịch sử cuộc trò chuyện:
    ${conversationHistory}
    user: ${inputValue}

    Dựa vào yêu cầu của người dùng và danh sách khóa học, hãy đưa ra một câu trả lời tự nhiên, hữu ích. Nếu bạn gợi ý một khóa học, hãy nêu rõ tên của nó. Đừng bịa ra các khóa học không có trong danh sách.
    ai:`;

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
            throw new Error(`Lỗi API: ${response.status} ${response.statusText}.`);
        }

        const result = await response.json();
        let aiResponse = "Xin lỗi, tôi chưa thể xử lý yêu cầu này. Bạn có thể thử lại không?";
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
            aiResponse = result.candidates[0].content.parts[0].text;
        }
        setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
        console.error("Chatbot error:", error);
        setMessages(prev => [...prev, { text: `Đã có lỗi xảy ra: ${error.message}. Vui lòng kiểm tra lại.`, sender: 'ai' }]);
    } finally {
        setIsAiTyping(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 z-40" aria-label="Mở chatbot tư vấn"><MessageSquare size={24} /></button>
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col animate-fade-in-up z-40">
          <div className="p-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center"><h4 className="font-semibold">✨ AI Tutor</h4><button onClick={() => setIsOpen(false)}><X size={20} /></button></div>
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'} mb-2`}>
                <div className={`rounded-lg px-3 py-2 max-w-xs ${msg.sender === 'ai' ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}>{msg.text}</div>
              </div>
            ))}
            {isAiTyping && <div className="flex justify-start mb-2"><div className="rounded-lg px-3 py-2 bg-gray-200 text-gray-800">...</div></div>}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-2 border-t flex items-center">
            <input type="text" placeholder="Hỏi về khóa học..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500" disabled={isAiTyping}/>
            <button type="submit" className="ml-2 p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50" disabled={isAiTyping}><Send size={20} /></button>
          </form>
        </div>
      )}
    </>
  );
}

export default AiChatbot;