'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/services', label: '服务商城' },
  { href: '/service-tracking', label: '服务追踪', highlight: true },
  { href: '/guardian', label: '守护人计划' },
  { href: '/face-register', label: '人脸录入', highlight: true },
  { href: '/policy', label: '政策专区' },
  { href: '/memorial', label: '数字纪念馆' },
  { href: '/community', label: '社区服务点' },
  { href: '/contact', label: '联系我们' },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      {/* 主导航栏 */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-11">
          {/* 左侧：品牌标识 */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            {/* 精致的玫瑰花图标 - 更好看的设计 */}
            <svg viewBox="0 0 32 32" className="w-6 h-6 flex-shrink-0">
              {/* 外层花瓣 */}
              <ellipse cx="16" cy="14" rx="10" ry="9" fill="#E91E63"/>
              <ellipse cx="16" cy="12" rx="8" ry="7" fill="#F06292"/>
              <ellipse cx="16" cy="10" rx="6" ry="5" fill="#F48FB1"/>
              <ellipse cx="16" cy="9" rx="4" ry="3" fill="#FCE4EC"/>
              {/* 花心 */}
              <circle cx="16" cy="8" r="2" fill="#FFEB3B"/>
              {/* 茎 */}
              <path d="M16 23 L16 30" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
              {/* 叶子 */}
              <path d="M16 26 Q12 24 10 27" stroke="#66BB6A" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M16 25 Q20 23 22 26" stroke="#66BB6A" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
            
            {/* 品牌名 + 域名 */}
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-gray-800 tracking-tight">
                时光驿站
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5">meihaoban.com</span>
            </div>
          </Link>

          {/* 右侧：菜单按钮 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-gray-500 hover:text-gray-700"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 展开菜单 */}
      {isMenuOpen && (
        <div className="bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            {/* 导航链接 */}
            <nav className="grid grid-cols-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-2 py-2 text-center text-xs rounded transition-colors ${
                    item.highlight
                      ? 'text-rose-500 font-medium bg-rose-50 hover:bg-rose-100'
                      : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* 操作按钮 */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <a href="tel:400-xxx-xxxx" className="flex-1">
                <button className="w-full py-2 text-xs border border-rose-200 text-rose-500 rounded-full hover:bg-rose-50 transition-colors">
                  <Phone className="w-3 h-3 inline mr-1" />
                  电话咨询
                </button>
              </a>
              <Link href="/services" className="flex-1">
                <button className="w-full py-2 text-xs bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  立即预约
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
