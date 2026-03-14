'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  X,
  ExternalLink,
  Loader2,
  Sparkles,
  FileText,
  Calendar,
  MessageCircle,
  Building2,
} from 'lucide-react';

// 热门搜索推荐
const hotSearches = [
  { text: '国家养老政策', icon: FileText, category: '政策' },
  { text: '日常护理注意事项', icon: Sparkles, category: '护理' },
  { text: '驿站服务内容', icon: Building2, category: '服务' },
  { text: '老年人日常沟通技巧', icon: MessageCircle, category: '沟通' },
  { text: '护理保险咨询', icon: Calendar, category: '政策' },
  { text: '失能老人照护指南', icon: Sparkles, category: '护理' },
];

interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  siteName?: string;
  publishTime?: string;
}

interface SearchResponse {
  success: boolean;
  summary: string;
  results: SearchResult[];
}

interface WebSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WebSearch({ isOpen, onClose }: WebSearchProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    setIsLoading(true);
    setError('');
    setSearchData(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: finalQuery,
          count: 10,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '搜索失败');
      }

      setSearchData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '搜索失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHotSearch = (text: string) => {
    setQuery(text);
    handleSearch(text);
  };

  const handleClose = () => {
    setQuery('');
    setSearchData(null);
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Search className="w-5 h-5 text-rose-500" />
            智能搜索
          </DialogTitle>
        </DialogHeader>

        {/* 搜索框 */}
        <div className="flex gap-2 mt-2">
          <div className="relative flex-1">
            <Input
              placeholder="搜索政策、护理知识、服务内容..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pr-10 h-11"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            onClick={() => handleSearch()}
            disabled={isLoading || !query.trim()}
            className="bg-rose-500 hover:bg-rose-600 text-white h-11 px-6"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              '搜索'
            )}
          </Button>
        </div>

        {/* 热门搜索 */}
        {!searchData && !isLoading && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">热门搜索</p>
            <div className="flex flex-wrap gap-2">
              {hotSearches.map((item) => (
                <button
                  key={item.text}
                  onClick={() => handleHotSearch(item.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 transition-colors"
                >
                  <item.icon className="w-3.5 h-3.5 text-rose-400" />
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 搜索结果 */}
        <div className="flex-1 overflow-y-auto mt-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-rose-500 animate-spin mb-3" />
              <p className="text-sm text-gray-500">正在搜索...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {searchData && (
            <div className="space-y-4">
              {/* AI摘要 */}
              {searchData.summary && (
                <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-100">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-rose-500" />
                      <span className="text-sm font-medium text-rose-600">智能摘要</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {searchData.summary}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* 搜索结果列表 */}
              <div>
                <p className="text-xs text-gray-500 mb-3">
                  找到 {searchData.results.length} 条相关结果
                </p>
                <div className="space-y-3">
                  {searchData.results.map((result, index) => (
                    <a
                      key={result.id || index}
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-white border border-gray-100 rounded-lg hover:shadow-md hover:border-rose-100 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm group-hover:text-rose-600 transition-colors line-clamp-2">
                            {result.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {result.snippet}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            {result.siteName && (
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {result.siteName}
                              </span>
                            )}
                            {result.publishTime && (
                              <span>{result.publishTime}</span>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-rose-400 flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
