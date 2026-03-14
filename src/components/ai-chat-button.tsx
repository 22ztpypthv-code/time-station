'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: `您好！我是智能养老顾问🌸

我可以帮您：
• 查询养老服务
• 了解相关政策
• 预约服务
• 申请守护人计划

这是一个演示平台，请问有什么可以帮您的？`,
};

// 快捷问题
const QUICK_QUESTIONS = [
  '你们提供哪些服务？',
  '如何了解相关政策？',
  '我想预约服务',
  '如何成为守护人？',
];

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message?: string) => {
    const userMessage = message || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          messages: messages.slice(1) // 排除欢迎消息
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          assistantMessage += chunk;
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'assistant') {
              lastMessage.content = assistantMessage;
            } else {
              newMessages.push({ role: 'assistant', content: assistantMessage });
            }
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '抱歉，网络出现问题，请稍后再试。',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 浮动按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-rose-primary hover:bg-rose-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all z-40 animate-bounce-soft group"
        aria-label="打开AI客服"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-safe rounded-full flex items-center justify-center text-xs animate-pulse">
          在线
        </span>
      </button>

      {/* 聊天对话框 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md h-[600px] max-h-[80vh] flex flex-col p-0 gap-0">
          {/* 头部 */}
          <DialogHeader className="p-4 border-b bg-gradient-rose text-white rounded-t-lg">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="font-semibold">玫小伴</div>
                <div className="text-xs opacity-90">智能养老顾问</div>
              </div>
              <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
                7×24小时在线
              </span>
            </DialogTitle>
          </DialogHeader>

          {/* 消息区域 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-rose-primary text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-rose-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 快捷问题 */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t bg-white">
              <div className="text-xs text-gray-500 mb-2">您可能想问：</div>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-100 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 输入区域 */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="请输入您的问题..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="bg-rose-primary hover:bg-rose-600 text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-400 mt-2 text-center">
              服务热线：400-xxx-xxxx
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
