'use client';

import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* 主要内容区 - 移动端优化 */}
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 py-4 md:py-5">
        <div className="flex flex-col lg:flex-row justify-between gap-4 md:gap-6">
          {/* 左侧区域 */}
          <div className="flex-1">
            {/* 品牌标识区 - 移动端优化 */}
            <div className="mb-2 md:mb-3">
              <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                {/* 精致的玫瑰花图标 */}
                <svg viewBox="0 0 32 32" className="w-4 h-4 md:w-5 md:h-5">
                  <ellipse cx="16" cy="14" rx="10" ry="9" fill="#E91E63"/>
                  <ellipse cx="16" cy="12" rx="8" ry="7" fill="#F06292"/>
                  <ellipse cx="16" cy="10" rx="6" ry="5" fill="#F48FB1"/>
                  <ellipse cx="16" cy="9" rx="4" ry="3" fill="#FCE4EC"/>
                  <circle cx="16" cy="8" r="2" fill="#FFEB3B"/>
                  <path d="M16 23 L16 30" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 26 Q12 24 10 27" stroke="#66BB6A" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M16 25 Q20 23 22 26" stroke="#66BB6A" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
                <span className="text-xs md:text-sm font-bold text-gray-800">时光驿站</span>
              </div>
              <p className="text-[10px] md:text-[11px] text-gray-400 ml-5 md:ml-7">温暖守护 每一刻美好</p>
            </div>

            {/* 导航链接区 - 移动端优化 */}
            <div className="mb-2 md:mb-3">
              <nav className="flex flex-wrap items-center gap-x-2 md:gap-x-3 gap-y-0.5 md:gap-y-1 text-[10px] md:text-xs text-gray-600">
                <Link href="/about" className="hover:text-rose-500 transition-colors">关于我们</Link>
                <span className="text-gray-200">|</span>
                <Link href="/contact" className="hover:text-rose-500 transition-colors">联系我们</Link>
                <span className="text-gray-200">|</span>
                <Link href="/join" className="hover:text-rose-500 transition-colors">加入我们</Link>
                <span className="text-gray-200">|</span>
                <Link href="/privacy" className="hover:text-rose-500 transition-colors">隐私政策</Link>
              </nav>
            </div>

            {/* 声明文字区 - 移动端优化 */}
            <div className="mb-2 md:mb-3 text-[10px] md:text-[11px] text-gray-400 leading-relaxed space-y-0.5">
              <p>本平台所展示的服务信息仅供参考，具体服务内容以实际提供为准。</p>
              <p>未经书面授权，任何单位或个人不得转载、复制本站内容。</p>
            </div>

            {/* 联系方式区 - 移动端优化 */}
            <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-0.5 md:gap-y-1 text-[10px] md:text-[11px] text-gray-400">
              <div className="flex items-center gap-0.5 md:gap-1">
                <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 md:w-3 md:h-3">
                  <rect x="1" y="1" width="14" height="14" rx="2" fill="#E91E63"/>
                  <path d="M4 8h8M8 4v8" stroke="white" strokeWidth="1.5"/>
                </svg>
                <span>客服热线：400-xxx-xxxx</span>
              </div>
              <span>投诉建议：service@example.com</span>
            </div>
          </div>

          {/* 右侧区域 - 新媒体矩阵 - 移动端优化 */}
          <div className="flex-shrink-0">
            <div className="flex gap-2 md:gap-4 justify-start lg:justify-end">
              {/* APP下载 */}
              <div className="text-center">
                <div className="w-11 h-11 md:w-14 md:h-14 bg-white rounded-lg flex items-center justify-center mb-0.5 md:mb-1 border border-gray-100 shadow-sm">
                  <div className="w-7 h-7 md:w-9 md:h-9 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 text-white">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                </div>
                <span className="text-[9px] md:text-[10px] text-gray-500">APP下载</span>
              </div>

              {/* 微信公众号 */}
              <div className="text-center">
                <div className="w-11 h-11 md:w-14 md:h-14 bg-white rounded-lg flex items-center justify-center mb-0.5 md:mb-1 border border-gray-100 shadow-sm">
                  <div className="w-7 h-7 md:w-9 md:h-9 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 text-white">
                      <circle cx="8" cy="10" r="5" fill="currentColor"/>
                      <circle cx="16" cy="12" r="5" fill="currentColor"/>
                      <circle cx="6" cy="9" r="1" fill="white"/>
                      <circle cx="10" cy="9" r="1" fill="white"/>
                      <circle cx="14" cy="11" r="1" fill="white"/>
                      <circle cx="18" cy="11" r="1" fill="white"/>
                    </svg>
                  </div>
                </div>
                <span className="text-[9px] md:text-[10px] text-gray-500">微信公众号</span>
              </div>

              {/* 小红书 */}
              <div className="text-center">
                <div className="w-11 h-11 md:w-14 md:h-14 bg-white rounded-lg flex items-center justify-center mb-0.5 md:mb-1 border border-gray-100 shadow-sm">
                  <div className="w-7 h-7 md:w-9 md:h-9 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 text-white">
                      <rect x="3" y="5" width="18" height="14" rx="3" fill="currentColor"/>
                      <text x="12" y="14" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">小红书</text>
                    </svg>
                  </div>
                </div>
                <span className="text-[9px] md:text-[10px] text-gray-500">小红书</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 虚线分割 */}
      <div className="border-t border-dashed border-gray-200"></div>

      {/* 底部版权区 - 移动端优化 */}
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 py-2 md:py-2.5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-1.5 text-[10px] md:text-[11px] text-gray-400">
          <div className="text-center md:text-left">
            <span>Copyright 2024-2026 时光驿站演示平台</span>
            <span className="mx-1 md:mx-1.5">|</span>
            <span>仅供功能演示</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
