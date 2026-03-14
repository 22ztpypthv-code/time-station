'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  BookHeart,
  Mic,
  Image,
  MessageCircle,
  Star,
  CheckCircle,
  ChevronRight,
  Heart,
  Phone,
} from 'lucide-react';

// 服务介绍
const memorialServices = [
  {
    icon: BookHeart,
    title: '人生回忆录',
    desc: '专业团队拍摄采访，AI智能整理编辑，制作精装画册珍藏一生故事',
    features: ['上门采访拍摄', '照片视频整理', 'AI文字编写', '精美排版设计', '精装画册制作'],
  },
  {
    icon: Mic,
    title: '声音银行',
    desc: '录制老人声音、笑声、叮嘱，AI训练声音模型，永久珍藏温暖声音',
    features: ['专业录音服务', '笑声叮嘱录制', 'AI声音训练', '声音模型存储', '互动功能开发'],
  },
  {
    icon: Image,
    title: '数字影像馆',
    desc: '老照片修复、视频剪辑、数字相册制作，永久存储云端随时查看',
    features: ['老照片修复', '视频剪辑制作', '数字相册制作', '云端永久存储', '家属共享查看'],
  },
  {
    icon: MessageCircle,
    title: 'AI数字人',
    desc: '基于AI技术，实现与逝去亲人的互动对话，让爱延续（高级功能）',
    features: ['AI形象生成', '语音合成', '互动对话', '表情动作', '场景定制'],
  },
];

// 价格套餐
const packages = [
  {
    name: '基础版',
    price: 2980,
    features: ['10页精装画册', '1小时采访', '20张照片修复', '基础排版设计', '电子版赠送'],
    popular: false,
  },
  {
    name: '标准版',
    price: 5980,
    features: ['30页精装画册', '3小时采访', '50张照片修复', '精美排版设计', '电子版赠送', '声音银行基础版'],
    popular: true,
  },
  {
    name: '尊享版',
    price: 9800,
    features: ['60页精装画册', '5小时深度采访', '100张照片修复', '豪华装帧设计', '电子版赠送', '声音银行永久版', '数字影像馆'],
    popular: false,
  },
];

// 制作流程
const process = [
  { step: 1, title: '预约咨询', desc: '了解需求，定制方案' },
  { step: 2, title: '上门采访', desc: '专业团队上门服务' },
  { step: 3, title: '素材整理', desc: '照片、视频、文字整理' },
  { step: 4, title: 'AI制作', desc: '智能编辑，精心制作' },
  { step: 5, title: '交付成品', desc: '精装画册，永久珍藏' },
];

// 案例展示
const cases = [
  {
    title: '王爷爷的抗战岁月',
    desc: '92岁抗战老兵的人生回忆录',
    image: '🎖️',
    tags: ['人生回忆录', '标准版'],
  },
  {
    title: '李奶奶的幸福时光',
    desc: '三代同堂的温馨记录',
    image: '👵',
    tags: ['声音银行', '数字影像馆'],
  },
  {
    title: '张爷爷的创业故事',
    desc: '从农民到企业家的奋斗史',
    image: '👨‍💼',
    tags: ['人生回忆录', '尊享版'],
  },
];

export default function MemorialPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero区域 */}
      <section className="bg-gradient-to-br from-purple-100 via-pink-50 to-rose-50 py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm mb-6">
            <Heart className="w-4 h-4 text-rose-500" />
            <span className="text-sm text-gray-700">珍贵记忆，永恒珍藏</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            数字纪念馆
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            让每一个生命都被温柔珍藏
            <br />
            用专业服务，守护珍贵记忆
          </p>
          <Button
            size="lg"
            onClick={() => setIsBookingOpen(true)}
            className="bg-rose-primary hover:bg-rose-600 text-white"
          >
            <Heart className="mr-2 h-5 w-5" />
            预约咨询
          </Button>
        </div>
      </section>

      {/* 服务介绍 */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">我们的服务</h2>
            <p className="text-gray-600">专业团队，用心记录每一个珍贵瞬间</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memorialServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-safe" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 价格套餐 */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">价格套餐</h2>
            <p className="text-gray-600">多种选择，满足不同需求</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-rose-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-rose-primary text-white text-xs px-3 py-1 rounded-bl-lg">
                    最受欢迎
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-rose-500">¥{pkg.price}</span>
                    <span className="text-gray-500 text-sm">起</span>
                  </div>
                  <ul className="space-y-3 mb-6 text-left">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-safe flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? 'bg-rose-primary hover:bg-rose-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setIsBookingOpen(true)}
                  >
                    选择套餐
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 制作流程 */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">制作流程</h2>
            <p className="text-gray-600">专业流程，精心制作</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {process.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-gray-50 rounded-xl p-6 text-center min-w-[160px]">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="font-semibold text-gray-800 mb-1">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
                {index < process.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-gray-300 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 案例展示 */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">案例展示</h2>
            <p className="text-gray-600">每一个故事都值得被珍藏</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((item, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all">
                <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    {item.image}
                  </span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-rose-100 text-rose-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">用户评价</h2>
          </div>

          <Card className="bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                "为父亲制作了人生回忆录，看着父亲讲述往事时的表情，我知道这份礼物值得。
                画册精美，服务专业，强烈推荐！"
              </p>
              <div className="font-semibold text-gray-800">陈女士</div>
              <div className="text-sm text-gray-500">标准版用户</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 预约咨询 */}
      <section className="py-16 px-4 md:px-6 bg-gradient-rose text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">预约咨询</h2>
          <p className="text-lg opacity-90 mb-8">
            专业顾问为您定制专属方案，记录珍贵回忆
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-rose-600 hover:bg-rose-50"
            >
              <Heart className="mr-2 h-5 w-5" />
              立即预约
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:400-xxx-xxxx">
                <Phone className="mr-2 h-5 w-5" />
                咨询热线：400-xxx-xxxx
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 预约弹窗 */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">预约咨询</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-4" onSubmit={(e) => {
            e.preventDefault();
            alert('预约成功！我们的顾问会尽快与您联系。');
            setIsBookingOpen(false);
          }}>
            <div className="space-y-2">
              <Label htmlFor="name">您的姓名</Label>
              <Input id="name" placeholder="请输入姓名" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">联系电话</Label>
              <Input id="phone" type="tel" placeholder="请输入手机号" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="elder">老人年龄</Label>
              <Input id="elder" type="number" placeholder="请输入老人年龄" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">期望服务</Label>
              <select id="service" className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm" required>
                <option value="">请选择服务</option>
                <option value="memoir">人生回忆录</option>
                <option value="voice">声音银行</option>
                <option value="photo">数字影像馆</option>
                <option value="ai">AI数字人</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">预约时间</Label>
              <Input id="date" type="date" required />
            </div>
            <Button type="submit" className="w-full bg-rose-primary hover:bg-rose-600 text-white">
              提交预约
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
