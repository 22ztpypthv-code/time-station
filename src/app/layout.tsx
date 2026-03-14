import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AIChatButton } from '@/components/ai-chat-button';

export const metadata: Metadata = {
  title: {
    default: '时光驿站',
    template: '%s | 时光驿站',
  },
  description:
    '时光驿站 - 嵌入式社区养老 + 女性就业 + 社区治理三位一体创新服务。专业居家养老、日间照料、健康管理、心理关怀，让每一位长者享受有尊严、有温度的晚年生活。',
  keywords: [
    '时光驿站',
    '养老服务',
    '居家养老',
    '日间照料',
    '守护人计划',
    '社区养老',
    '健康护理',
    '康复服务',
  ],
  authors: [{ name: '示例团队' }],
  generator: 'Coze Code',
  openGraph: {
    title: '时光驿站 | 温暖守护 每一刻美好',
    description:
      '嵌入式社区养老 + 女性就业 + 社区治理三位一体创新服务，让每一位长者享受有尊严、有温度的晚年生活。',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1 pt-16">{children}</main>
          <SiteFooter />
          <AIChatButton />
        </div>
      </body>
    </html>
  );
}
