import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-gray-50/80 to-pink-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          抱歉，页面未找到
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
