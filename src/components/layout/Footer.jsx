import React from 'react';
import { Github, Linkedin, Facebook, Sparkles } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com' },
    { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://facebook.com' },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright Info */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <a href="#" className="text-xl font-bold text-white flex items-center justify-center sm:justify-start mb-2">
               ANTOREE
            </a>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} ANTOREE Project. All Rights Reserved.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
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
