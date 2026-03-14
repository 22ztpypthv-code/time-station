'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import {
  Sparkle,
  HeartPulse,
  Trophy,
  RefreshCw,
  Flame,
  Star,
  ArrowRight,
  ShoppingCart,
} from 'lucide-react';

// 服务分类
const categories = [
  { id: 'all', label: '全部' },
  { id: 'hard', label: '硬服务' },
  { id: 'soft', label: '软服务' },
];

// 功能入口数据
const featureCards = [
  {
    id: 'hot',
    title: '一周热门',
    icon: Flame,
    bgColor: 'bg-orange-50',
    iconBg: 'bg-gradient-to-br from-orange-400 to-red-400',
  },
  {
    id: 'care',
    title: '照护服务',
    icon: HeartPulse,
    bgColor: 'bg-blue-50',
    iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-400',
  },
  {
    id: 'rank',
    title: '口碑榜单',
    icon: Trophy,
    bgColor: 'bg-amber-50',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-400',
  },
  {
    id: 'new',
    title: '新品服务',
    icon: Sparkle,
    bgColor: 'bg-purple-50',
    iconBg: 'bg-gradient-to-br from-purple-400 to-pink-400',
  },
];

// 服务数据 - 演示模式
const services = [
  {
    id: 'bath',
    name: '上门助浴',
    tag: '热门服务',
    category: ['hard'],
    rating: 5,
    reviews: 128,
    target: '失能老人',
    description: '专业护理人员上门提供助浴服务',
    hot: true,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_049ec598-ece6-4472-80f6-40a3c6f3702e.jpeg?sign=1804949649-0e64915485-0-ba35d0c1c1b756f7cf8847e24e674d4465312e1884c443c49b1a058b98bc343f',
  },
  {
    id: 'medical',
    name: '医疗陪诊',
    tag: '热门服务',
    category: ['hard'],
    rating: 5,
    reviews: 96,
    target: '全体老人',
    description: '专业陪诊人员陪同就医全流程',
    hot: true,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_80564c50-08c3-4825-b6d7-67e69758bf81.jpeg?sign=1804949650-5398137dc4-0-20fa02446dbe865dd4cf0dae9e8aeca6a932a6164335ca663e878191e28c21a8',
  },
  {
    id: 'rehab',
    name: '康复护理',
    tag: '专业服务',
    category: ['hard'],
    rating: 5,
    reviews: 156,
    target: '失能老人',
    description: '为失能老人提供专业康复护理',
    hot: false,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_c3612707-7e1f-4d87-8699-2f9ca9a4f9bf.jpeg?sign=1804949651-ecc1528cae-0-e3bc1da175efe4335d384343748c62fe53c7c943883127a3f70e3b6028ed793b',
  },
  {
    id: 'renovation',
    name: '适老化改造',
    tag: '专业服务',
    category: ['hard'],
    rating: 5,
    reviews: 64,
    target: '全体老人',
    description: '对居家环境进行适老化改造',
    hot: false,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_0019151b-2755-48ff-b190-3bc6d5b87a4b.jpeg?sign=1804949648-2ae27877d7-0-1df5cc17d7744dc6c1dc11fa883419535d60df4d0fbc53944e77c5fb271cc758',
  },
  {
    id: 'cleaning',
    name: '深度保洁',
    tag: '增值服务',
    category: ['hard'],
    rating: 4.8,
    reviews: 89,
    target: '全体老人',
    description: '专业保洁团队深度清洁服务',
    hot: false,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_471db6df-2f42-4777-81fc-779e8786ef8a.jpeg?sign=1804949669-e88a5b1a20-0-5cec3334b9d18a0880034e3f63d0608d0ba3816794034ab9d093ef6185a6e883',
  },
  {
    id: 'meal',
    name: '暖心共食',
    tag: '热门服务',
    category: ['hard'],
    rating: 4.9,
    reviews: 234,
    target: '全体老人',
    description: '营养餐食送餐上门或堂食',
    hot: true,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_8c542fb3-cbc0-423e-a14a-a6a81706e40f.jpeg?sign=1804949669-d564f69042-0-afc0ce3dfae369d40f1882f6387b6d20938ca585a43dfaec91c4406f9d312df7',
  },
  {
    id: 'memoir',
    name: '人生回忆录',
    tag: '热门',
    category: ['soft'],
    rating: 5,
    reviews: 45,
    target: '老人及家庭',
    description: '拍摄采访制作精装画册',
    hot: true,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_f68ad157-b21c-46ec-b814-28a7366b1279.jpeg?sign=1804949668-69233b235f-0-56a76663a36c98f70e36d27cc8c4817702559750b08e5da576b7f239df7338c7',
  },
  {
    id: 'voice',
    name: '声音银行',
    tag: '新品',
    category: ['soft'],
    rating: 5,
    reviews: 32,
    target: '老人及家庭',
    description: '录制声音AI训练永久珍藏',
    hot: false,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_1b84ca6d-3606-46e5-b195-05ca55f137e5.jpeg?sign=1804949668-d9a42fecf3-0-3bccddce3aabeca9844caa28bda5694e5c091dc5598dde5b2ea1814801aef267',
  },
  {
    id: 'salon',
    name: '心理疗愈',
    tag: '新品',
    category: ['soft'],
    rating: 4.9,
    reviews: 67,
    target: '中年女性',
    description: '心理疗愈、瑜伽、茶艺体验',
    hot: false,
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_ab0eceb9-f5d4-4c73-9cfa-e826f829c333.jpeg?sign=1804951545-8d302337dc-0-66b3a6db009729b8d7bfd0c6fd6b4cbd35ab5314870d91c7205f9bcc5db53a98',
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const filteredServices = services.filter(
    (service) => activeCategory === 'all' || service.category.includes(activeCategory)
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">服务商城</h1>
          <p className="text-sm text-gray-500">专业养老服务演示平台</p>
        </div>
      </header>

      {/* 功能入口 */}
      <section className="py-4 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-3">
            {featureCards.map((card) => (
              <div
                key={card.id}
                className={`${card.bgColor} rounded-xl p-3 text-center cursor-pointer hover:shadow-md transition-shadow`}
              >
                <div className={`${card.iconBg} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-800">{card.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分类筛选 */}
      <section className="py-3 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full ${
                  activeCategory === cat.id
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-white text-gray-600'
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedService(service)}
              >
                <div className="relative h-40">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  {service.hot && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      热门
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{service.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {service.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({service.reviews}评价)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务详情弹窗 */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-md">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedService.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="ml-1">{selectedService.rating}</span>
                  </div>
                  <span className="text-gray-400">{selectedService.reviews} 条评价</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-700">
                    📌 演示模式：这是一个功能展示，具体服务请线下咨询。
                  </p>
                </div>
                <Button className="w-full bg-rose-500 hover:bg-rose-600">
                  了解详情
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
