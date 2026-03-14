'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WebSearch } from '@/components/web-search';
import { AdBanner } from '@/components/ad-banner';
import {
  ChevronRight,
  Phone,
  Calendar,
  Shield,
  Star,
  Quote,
  Search,
  Users,
  MapPin,
  Camera,
} from 'lucide-react';

// 核心服务数据 - 演示模式
const coreServices = [
  {
    name: '上门助浴',
    desc: '专业护理服务',
    href: '/services#bath',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_f0c92197-0743-4399-b4d7-f5a4d080658c.jpeg?sign=1804950887-627f97b3df-0-7c4628ba3212dd8873c8b152b3b2c0d1b6be7a4c8565e5d305c6ef658ddef43a',
  },
  {
    name: '医疗陪诊',
    desc: '贴心陪护服务',
    href: '/services#medical',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_7ad1663d-c406-42fc-be17-2a66883e13f7.jpeg?sign=1804950900-8e85e1e36f-0-095c0dfb6595e6c756763ab315b0e3bd3b058bb3ea5fb17c2f4d3d711e07d19d',
  },
  {
    name: '康复护理',
    desc: '专业康复指导',
    href: '/services#rehab',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_cddb5bc3-a2d0-4162-8fba-f0005ffcd69a.jpeg?sign=1804950890-3ab9b18227-0-17fe064db0aa72c130f35359a07da7e7a292902354f2020eee4c2bb31e5dcd88',
  },
  {
    name: '人生回忆录',
    desc: '珍藏美好记忆',
    href: '/services#memoir',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_fa2f406b-fe94-4acf-b638-e9a9d845426b.jpeg?sign=1804950891-70b4915d20-0-3bbbcb6930fb214783313ecebf2d6f5c4c88eb4de42435fcdc5f3ed5e6c72df9',
  },
  {
    name: '心理疗愈',
    desc: '心灵关怀服务',
    href: '/services#salon',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_ab0eceb9-f5d4-4c73-9cfa-e826f829c333.jpeg?sign=1804951545-8d302337dc-0-66b3a6db009729b8d7bfd0c6fd6b4cbd35ab5314870d91c7205f9bcc5db53a98',
  },
  {
    name: '守护人计划',
    desc: '灵活就业机会',
    href: '/guardian',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_4fdf5760-7926-4f8c-8b9e-c5d72b4cb8a3.jpeg?sign=1804950917-a71e83727b-0-8dd8bec40d111cee9fdb47b310537e4a258d3e15b78e4cbaad84fb4121fe10fd',
  },
];

// 政策信息数据 - 演示模式
const policies = [
  {
    title: '养老服务优惠',
    desc: '详情请咨询当地社区服务中心',
    color: 'from-rose-500 to-pink-500',
  },
  {
    title: '机构养老服务',
    desc: '详情请咨询当地社区服务中心',
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: '护理保险',
    desc: '详情请咨询当地社区服务中心',
    color: 'from-green-500 to-emerald-500',
  },
];

// 社区活动数据
const activities = [
  {
    title: '公益日活动',
    date: '每周三',
    desc: '免费健康检查、法律咨询',
    image: '🏥',
  },
  {
    title: '心理疗愈沙龙',
    date: '每月第一周六',
    desc: '瑜伽、插花、茶艺体验',
    image: '🧘‍♀️',
  },
  {
    title: '健康讲座',
    date: '每月15日',
    desc: '健康知识普及',
    image: '📚',
  },
  {
    title: '守护人培训',
    date: '每月末',
    desc: '护理技能培训',
    image: '🎓',
  },
];

// 用户评价数据
const testimonials = [
  {
    name: '王女士',
    role: '用户家属',
    content: '护理员非常专业，照顾我母亲很用心，我们全家都很放心。',
    rating: 5,
  },
  {
    name: '李大爷',
    role: '服务用户',
    content: '日间照料中心的活动很丰富，我在这里认识了很多朋友，每天都过得很开心。',
    rating: 5,
  },
  {
    name: '张先生',
    role: '用户家属',
    content: '感谢贴心服务，让我能够安心工作，父亲的晚年生活有了保障。',
    rating: 5,
  },
];

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-[#FAFAFA]">
      {/* Hero Banner - 移动端优化 */}
      <section className="relative bg-gradient-to-br from-rose-50 via-gray-50/80 to-pink-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-5 md:py-10">
          {/* 移动端：统计数据在顶部 */}
          <div className="flex justify-center gap-3 mb-4 md:hidden">
            <div className="bg-white rounded-lg px-3 py-2 text-center shadow-sm">
              <div className="text-base font-bold text-rose-500">5000+</div>
              <div className="text-gray-500 text-[10px]">服务家庭</div>
            </div>
            <div className="bg-white rounded-lg px-3 py-2 text-center shadow-sm">
              <div className="text-base font-bold text-orange-500">200+</div>
              <div className="text-gray-500 text-[10px]">守护人</div>
            </div>
            <div className="bg-white rounded-lg px-3 py-2 text-center shadow-sm">
              <div className="text-base font-bold text-green-500">98%</div>
              <div className="text-gray-500 text-[10px]">满意度</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            {/* 左侧文字 */}
            <div className="flex-1 text-center md:text-left w-full">
              <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full mb-2 text-[10px] md:text-[11px]">
                <Shield className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500" />
                <span className="text-gray-600">专业养老服务提供商</span>
              </div>
              
              {/* 标题 */}
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 leading-snug">
                <span className="text-gray-700">予人玫瑰，手留余香</span>
              </h1>
              <p className="text-sm md:text-base font-medium text-rose-500 mb-2">
                彼此守护，温暖社区
              </p>
              
              <p className="text-[10px] md:text-[11px] text-gray-500 mb-3 max-w-sm mx-auto md:mx-0">
                嵌入式社区养老 + 女性就业 + 社区治理，三位一体创新服务
              </p>

              {/* 搜索入口 */}
              <div className="w-full md:max-w-md mx-auto md:mx-0 mb-3">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left group border border-gray-100"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-rose-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs md:text-sm text-gray-600 group-hover:text-gray-800 transition-colors truncate block">
                      搜索护理知识...
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded flex-shrink-0">
                    搜索
                  </span>
                </button>
              </div>
            </div>

            {/* 右侧数据 - 仅桌面端显示 */}
            <div className="hidden md:flex gap-2">
              <div className="bg-gray-100 rounded-lg p-2.5 text-center min-w-[60px]">
                <div className="text-base md:text-lg font-bold text-rose-500">5000+</div>
                <div className="text-gray-500 text-[9px]">服务家庭</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-2.5 text-center min-w-[60px]">
                <div className="text-base md:text-lg font-bold text-orange-500">200+</div>
                <div className="text-gray-500 text-[9px]">专业守护人</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-2.5 text-center min-w-[60px]">
                <div className="text-base md:text-lg font-bold text-green-500">98%</div>
                <div className="text-gray-500 text-[9px]">满意度</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心行动按钮区 - 移动端优化 */}
      <section className="py-3 px-3 md:px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <Link href="/services" className="block">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg md:rounded-xl p-3 md:p-5 text-white hover:shadow-lg transition-all group">
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <span className="font-bold text-xs md:text-base">立即预约服务</span>
                </div>
                <p className="text-[10px] md:text-[11px] text-white/80 hidden md:block">专业上门 · 品质保障</p>
                <div className="mt-1.5 md:mt-2 flex items-center text-[10px] md:text-[11px] text-white/90 group-hover:translate-x-1 transition-transform">
                  <span>立即预约</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </Link>
            <Link href="/guardian" className="block">
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg md:rounded-xl p-3 md:p-5 text-white hover:shadow-lg transition-all group">
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <span className="font-bold text-xs md:text-base">申请守护人</span>
                </div>
                <p className="text-[10px] md:text-[11px] text-white/80 hidden md:block">灵活就业 · 技能培训</p>
                <div className="mt-1.5 md:mt-2 flex items-center text-[10px] md:text-[11px] text-white/90 group-hover:translate-x-1 transition-transform">
                  <span>立即申请</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 新功能快捷入口 - 移动端优化 */}
      <section className="py-2 px-3 md:px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <Link href="/service-tracking" className="block">
              <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-800 text-xs md:text-sm">服务追踪</span>
                      <Badge className="bg-blue-100 text-blue-600 text-[9px] md:text-[10px] px-1.5 py-0 h-4">新</Badge>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 truncate">实时查看服务进度</p>
                  </div>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
              </div>
            </Link>
            <Link href="/face-register" className="block">
              <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-800 text-xs md:text-sm">人脸录入</span>
                      <Badge className="bg-purple-100 text-purple-600 text-[9px] md:text-[10px] px-1.5 py-0 h-4">新</Badge>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 truncate">安全认证身份验证</p>
                  </div>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 广告轮播区 */}
      <section className="py-2 px-3 md:px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <AdBanner />
        </div>
      </section>

      {/* 核心服务入口 - 移动端优化 */}
      <section className="py-4 md:py-6 px-3 md:px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div>
              <h2 className="text-sm md:text-base font-bold text-gray-800">核心服务</h2>
              <p className="text-[10px] md:text-[11px] text-gray-500 mt-0.5">专业、贴心、全方位的养老服务</p>
            </div>
            <Link href="/services">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-rose-500 text-[10px] md:text-xs h-6 md:h-7">
                查看全部
                <ChevronRight className="ml-0.5 w-2.5 h-2.5 md:w-3 md:h-3" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-2.5">
            {coreServices.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="group hover:shadow-md transition-all cursor-pointer overflow-hidden border-0 bg-white">
                  <div className="relative aspect-square">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1 md:bottom-2 md:left-2 md:right-2">
                      <p className="text-white/80 text-[9px] md:text-[10px] truncate">{service.desc}</p>
                    </div>
                  </div>
                  <CardContent className="p-1.5 md:p-2">
                    <h3 className="font-medium text-gray-800 text-[10px] md:text-xs text-center truncate">{service.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 政策信息专区 - 移动端优化 */}
      <section className="py-4 md:py-6 px-3 md:px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div>
              <h2 className="text-sm md:text-base font-bold text-gray-800">政策信息</h2>
              <p className="text-[10px] md:text-[11px] text-gray-500 mt-0.5">了解相关养老政策</p>
            </div>
            <Link href="/policy">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-rose-500 text-[10px] md:text-xs h-6 md:h-7">
                了解更多
                <ChevronRight className="ml-0.5 w-2.5 h-2.5 md:w-3 md:h-3" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
            {policies.map((policy, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className={`bg-gradient-to-r ${policy.color} p-2.5 md:p-3 text-white`}>
                  <div className="text-[10px] md:text-xs font-medium mb-0.5">{policy.title}</div>
                </div>
                <CardContent className="p-2 md:p-2.5">
                  <p className="text-gray-500 text-[10px] md:text-[11px]">{policy.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 社区活动 - 移动端优化 */}
      <section className="py-4 md:py-6 px-3 md:px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3 md:mb-4">
            <h2 className="text-sm md:text-base font-bold text-gray-800">社区活动</h2>
            <p className="text-[10px] md:text-[11px] text-gray-500 mt-0.5">丰富您的精神文化生活</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5">
            {activities.map((activity, index) => (
              <Card key={index} className="hover:shadow-md transition-all group bg-white border-0">
                <CardContent className="p-2 md:p-3 text-center">
                  <div className="text-xl md:text-2xl mb-1 md:mb-1.5 group-hover:scale-110 transition-transform">
                    {activity.image}
                  </div>
                  <h3 className="font-medium text-gray-800 text-[10px] md:text-xs mb-0.5">{activity.title}</h3>
                  <p className="text-rose-500 text-[9px] md:text-[10px] font-medium mb-0.5">{activity.date}</p>
                  <p className="text-gray-500 text-[9px] md:text-[10px]">{activity.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 用户见证 - 移动端优化 */}
      <section className="py-4 md:py-6 px-3 md:px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3 md:mb-4">
            <h2 className="text-sm md:text-base font-bold text-gray-800">用户评价</h2>
            <p className="text-[10px] md:text-[11px] text-gray-500 mt-0.5">来自真实用户的反馈</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border-0">
                <CardContent className="p-2.5 md:p-3">
                  <Quote className="w-4 h-4 md:w-5 md:h-5 text-rose-200 mb-1 md:mb-1.5" />
                  <p className="text-gray-600 text-[10px] md:text-xs mb-1.5 md:mb-2 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex gap-0.5 mb-1 md:mb-1.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-[9px] md:text-[10px]">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-[10px] md:text-xs">{testimonial.name}</div>
                      <div className="text-[9px] md:text-[10px] text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 行动召唤 - 移动端优化 */}
      <section className="py-4 md:py-6 px-3 md:px-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-1.5">开始您的养老无忧之旅</h2>
          <p className="text-[10px] md:text-xs opacity-90 mb-3 md:mb-4">
            专业团队，贴心服务，让每一位长者享受幸福晚年
          </p>
          <div className="flex flex-wrap gap-2 md:gap-2.5 justify-center">
            <Link href="/contact">
              <Button size="sm" variant="outline" className="bg-white text-rose-600 hover:bg-rose-50 border-0 h-7 md:h-8 px-3 md:px-4 text-[10px] md:text-xs">
                <Phone className="mr-1 md:mr-1.5 h-3 w-3 md:h-3.5 md:w-3.5" />
                联系我们
              </Button>
            </Link>
            <Link href="/services">
              <Button size="sm" className="bg-white text-rose-600 hover:bg-rose-50 h-7 md:h-8 px-3 md:px-4 text-[10px] md:text-xs">
                <Calendar className="mr-1 md:mr-1.5 h-3 w-3 md:h-3.5 md:w-3.5" />
                立即预约
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 搜索弹窗 */}
      <WebSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
