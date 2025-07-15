import React from 'react';
// Xóa 'Sparkles' khỏi dòng import này vì nó không được sử dụng
import { Github, Linkedin, Facebook, Twitter, Instagram, User } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, url: '#' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: '#' },
    { name: 'Portfolio', icon: <User size={20} />, url: '#' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: '#' },
    { name: 'Facebook', icon: <Facebook size={20} />, url: '#' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: '#' },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            {/* Sửa href="#" thành href="/" */}
            <a href="/" className="text-xl font-bold text-white flex items-center justify-center sm:justify-start mb-2">
              {/* Icon Sparkles đã bị xóa khỏi đây, vì vậy cũng xóa import ở trên */}
               EduAI
            </a>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} ANTOREE Project. All Rights Reserved.
            </p>
             <p className="text-xs text-gray-500 mt-1">
              Một sản phẩm cho bài kiểm tra kỹ thuật Frontend.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-gray-700"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
