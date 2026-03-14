'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import {
  Heart,
  Users,
  Award,
  Gift,
  BookOpen,
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Phone,
  Target,
  FileCheck,
  Shield,
  Camera,
} from 'lucide-react';

// 四类人群数据 - 添加配图
const roleTypes = [
  {
    title: '40+中女',
    subtitle: '核心守护人',
    benefits: ['养心养颜', '组织活动', '日常照料'],
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_4fdf5760-7926-4f8c-8b9e-c5d72b4cb8a3.jpeg?sign=1804950917-a71e83727b-0-8dd8bec40d111cee9fdb47b310537e4a258d3e15b78e4cbaad84fb4121fe10fd',
  },
  {
    title: '30+独居女性',
    subtitle: '活力守护人',
    benefits: ['宠物托付', '陪诊就医', '云陪护'],
    color: 'from-purple-500 to-fuchsia-500',
    bgColor: 'bg-purple-50',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_b178511e-16a3-419c-836c-a47a32197baf.jpeg?sign=1804953693-59bae30dbe-0-20050eb20d856383092955130e06e1d4b8806d385f968b2e38f5e52656eb8011',
  },
  {
    title: '轻度失能老人',
    subtitle: '被守护人',
    benefits: ['日常照料', '讲述故事', '精神慰藉'],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_c3612707-7e1f-4d87-8699-2f9ca9a4f9bf.jpeg?sign=1804949651-ecc1528cae-0-e3bc1da175efe4335d384343748c62fe53c7c943883127a3f70e3b6028ed793b',
  },
  {
    title: '老人子女',
    subtitle: '买单守护者',
    benefits: ['远程照护', '资源链接', '安心托付'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_fa2f406b-fe94-4acf-b638-e9a9d845426b.jpeg?sign=1804950891-70b4915d20-0-3bbbcb6930fb214783313ecebf2d6f5c4c88eb4de42435fcdc5f3ed5e6c72df9',
  },
];

// 权益数据 - 增加"自我价值认同"
const benefits = [
  {
    icon: Gift,
    title: '灵活就业收入',
    desc: '按服务获得报酬，多劳多得',
    bgColor: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
  },
  {
    icon: Sparkles,
    title: '积分兑换服务',
    desc: '服务积分可兑换自身所需服务',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
  {
    icon: BookOpen,
    title: '免费培训认证',
    desc: '专业护理技能培训，获得认证',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    icon: Award,
    title: '荣誉勋章体系',
    desc: '优秀守护人获得荣誉认可',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
  },
  {
    icon: Users,
    title: '社区社交网络',
    desc: '加入守护人社区，互助成长',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    icon: Target,
    title: '自我价值认同',
    desc: '时光驿站里个人价值最大化',
    bgColor: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-500',
  },
];

// 申请条件
const requirements = [
  '年龄30-60岁',
  '居住在本地社区',
  '无犯罪记录',
  '有爱心、耐心、责任心',
  '身体健康，能提供服务',
];

// 申请流程
const process = [
  { step: 1, title: '在线申请', desc: '填写申请表单', bgColor: 'bg-rose-50' },
  { step: 2, title: '资料审核', desc: '3个工作日内反馈', bgColor: 'bg-purple-50' },
  { step: 3, title: '人脸录入', desc: '安全认证验证', bgColor: 'bg-indigo-50', link: '/face-register' },
  { step: 4, title: '培训考核', desc: '专业护理培训', bgColor: 'bg-blue-50' },
  { step: 5, title: '认证通过', desc: '获得守护人证书', bgColor: 'bg-green-50' },
  { step: 6, title: '接单服务', desc: '开始提供服务', bgColor: 'bg-amber-50' },
];

// 守护人故事
const stories = [
  {
    name: '李阿姨',
    age: 52,
    role: '核心守护人',
    image: '👩',
    content: '加入守护人计划后，我不仅获得了收入，更找到了人生价值。每次看到老人们的笑容，我就觉得一切都值得。',
    services: 128,
    rating: 5,
  },
  {
    name: '张女士',
    age: 38,
    role: '活力守护人',
    image: '👩‍💼',
    content: '作为独居女性，我理解老人的孤独。通过陪诊服务，我帮助了很多人，也收获了友谊和成长。',
    services: 89,
    rating: 5,
  },
];

export default function GuardianPage() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero区域 - 移动端优化 */}
      <section className="bg-gradient-to-br from-rose-100 via-pink-50 to-purple-50 py-6 md:py-10 px-3 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/80 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-sm mb-3 md:mb-4">
            <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-rose-500" />
            <span className="text-[10px] md:text-xs text-gray-700">社区互助计划</span>
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
            守护人计划
          </h1>
          <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-5 max-w-md mx-auto leading-relaxed">
            激活社区闲置人力，重建邻里互助温情
            <br className="hidden md:block" />
            让每个人都能成为守护者，也能被守护
          </p>
          <Button
            size="lg"
            onClick={() => setIsApplyOpen(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white h-10 md:h-11 px-5 md:px-6"
          >
            <Heart className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">立即申请成为守护人</span>
          </Button>
        </div>
      </section>

      {/* 四类人群双向赋能 - 移动端优化 */}
      <section className="py-4 md:py-8 px-3 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3 md:mb-6">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-0.5 md:mb-1">四类人群 双向赋能</h2>
            <p className="text-[10px] md:text-xs text-gray-500">守护与被守护，共建温暖社区</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {roleTypes.map((role, index) => (
              <div
                key={index}
                className={`${role.bgColor} rounded-lg md:rounded-xl overflow-hidden group hover:shadow-md transition-all border border-gray-100`}
              >
                {/* 配图区域 - 移动端优化 */}
                <div className="relative h-24 md:h-28 overflow-hidden">
                  <Image
                    src={role.image}
                    alt={role.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-1.5 md:bottom-2 left-1.5 md:left-2 right-1.5 md:right-2 text-white">
                    <div className="text-[10px] md:text-xs font-semibold">{role.title}</div>
                    <div className="text-[9px] md:text-[10px] opacity-90">{role.subtitle}</div>
                  </div>
                </div>
                
                {/* 权益列表 - 移动端优化 */}
                <div className="p-2 md:p-2.5">
                  {role.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-1 md:gap-1.5 text-[10px] md:text-[11px] text-gray-600 mb-0.5 md:mb-1">
                      <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 积分激励体系 - 移动端优化 */}
      <section className="py-4 md:py-8 px-3 md:px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3 md:mb-6">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-0.5 md:mb-1">积分激励体系</h2>
            <p className="text-[10px] md:text-xs text-gray-500">服务越多，收获越多</p>
          </div>
          
          {/* 移动端横向滚动 */}
          <div className="flex md:flex-row items-center justify-start md:justify-center gap-1.5 md:gap-2 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0 scrollbar-hide">
            {['服务时长', '累积积分', '兑换服务/礼品', '荣誉认证'].map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
                <div className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-center min-w-[75px] md:min-w-[100px] ${
                  index === 0 ? 'bg-rose-100 text-rose-600' :
                  index === 1 ? 'bg-purple-100 text-purple-600' :
                  index === 2 ? 'bg-blue-100 text-blue-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  <div className="text-[10px] md:text-xs font-semibold">{item}</div>
                </div>
                {index < 3 && <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-300 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 守护人权益 - 移动端优化 */}
      <section className="py-4 md:py-8 px-3 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3 md:mb-6">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-0.5 md:mb-1">守护人权益</h2>
            <p className="text-[10px] md:text-xs text-gray-500">成为守护人，享受多重权益</p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`${benefit.bgColor} p-2 md:p-3 rounded-lg md:rounded-xl text-center hover:shadow-sm transition-all`}
              >
                <div className={`w-7 h-7 md:w-9 md:h-9 mx-auto mb-1.5 md:mb-2 rounded-full ${benefit.iconBg} flex items-center justify-center`}>
                  <benefit.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${benefit.iconColor}`} />
                </div>
                <h3 className="font-medium text-gray-800 text-[10px] md:text-xs mb-0.5 md:mb-1">{benefit.title}</h3>
                <p className="text-[9px] md:text-[10px] text-gray-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 申请条件 - 移动端优化 */}
      <section className="py-4 md:py-8 px-3 md:px-6 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-3 md:mb-6">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-0.5 md:mb-1">申请条件</h2>
            <p className="text-[10px] md:text-xs text-gray-500">我们期待有爱心的您加入</p>
          </div>
          
          <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-1.5 md:gap-2 p-2 md:p-2.5 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-[11px] md:text-xs">{req}</span>
                </div>
              ))}
            </div>
            
            {/* 证书提示 - 移动端优化 */}
            <div className="mt-2 md:mt-3 flex items-center gap-1.5 md:gap-2 p-2 md:p-2.5 bg-amber-50 rounded-lg border border-amber-100">
              <FileCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 flex-shrink-0" />
              <span className="text-amber-700 text-[10px] md:text-xs">部分服务需提供专业职业证书</span>
            </div>
          </div>
        </div>
      </section>

      {/* 申请流程 - 移动端优化 */}
      <section className="py-4 md:py-8 px-3 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3 md:mb-6">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-0.5 md:mb-1">申请流程</h2>
            <p className="text-[10px] md:text-xs text-gray-500">简单六步，成为守护人</p>
          </div>
          
          {/* 移动端横向滚动 */}
          <div className="flex md:flex-row items-center justify-start md:justify-center gap-1.5 md:gap-3 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0 scrollbar-hide">
            {process.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
                {'link' in item ? (
                  <a href={item.link} className={`${item.bgColor} rounded-lg md:rounded-xl p-3 md:p-4 text-center min-w-[85px] md:min-w-[120px] hover:shadow-md transition-all cursor-pointer`}>
                    <div className="w-6 h-6 md:w-7 md:h-7 mx-auto mb-1.5 md:mb-2 rounded-full bg-white text-indigo-500 flex items-center justify-center font-bold text-[10px] md:text-xs shadow-sm">
                      {item.step}
                    </div>
                    <div className="font-semibold text-gray-800 text-[10px] md:text-xs mb-0.5 flex items-center justify-center gap-0.5">
                      {item.title}
                      <Camera className="w-2.5 h-2.5 md:w-3 md:h-3 text-indigo-400" />
                    </div>
                    <div className="text-[9px] md:text-[10px] text-gray-500">{item.desc}</div>
                  </a>
                ) : (
                  <div className={`${item.bgColor} rounded-lg md:rounded-xl p-3 md:p-4 text-center min-w-[85px] md:min-w-[120px]`}>
                    <div className="w-6 h-6 md:w-7 md:h-7 mx-auto mb-1.5 md:mb-2 rounded-full bg-white text-rose-500 flex items-center justify-center font-bold text-[10px] md:text-xs shadow-sm">
                      {item.step}
                    </div>
                    <div className="font-semibold text-gray-800 text-[10px] md:text-xs mb-0.5">{item.title}</div>
                    <div className="text-[9px] md:text-[10px] text-gray-500">{item.desc}</div>
                  </div>
                )}
                {index < process.length - 1 && (
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-300 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 守护人故事 - 移动端优化 */}
      <section className="py-4 md:py-8 px-3 md:px-6 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3 md:mb-6">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-0.5 md:mb-1">守护人故事</h2>
            <p className="text-[10px] md:text-xs text-gray-500">听听他们的真实分享</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {stories.map((story, index) => (
              <Card key={index} className="overflow-hidden bg-white">
                <CardContent className="p-3 md:p-5">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="text-2xl md:text-4xl">{story.image}</div>
                    <div>
                      <div className="font-semibold text-gray-800 text-xs md:text-sm">{story.name}</div>
                      <div className="text-[10px] md:text-xs text-gray-500">{story.age}岁 · {story.role}</div>
                      <div className="flex gap-0.5 mt-0.5 md:mt-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-[10px] md:text-xs leading-relaxed mb-1.5 md:mb-2">"{story.content}"</p>
                  <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500">
                    <span>已服务 {story.services} 人次</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 安全认证入口 - 移动端优化 */}
      <section className="py-4 md:py-8 px-3 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 md:p-5 border border-indigo-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-0.5">安全认证</h3>
                <p className="text-[10px] md:text-xs text-gray-500">完成人脸录入，保障服务安全</p>
                <p className="text-[9px] md:text-[10px] text-gray-400 mt-0.5">用于服务身份验证，避免纠纷</p>
              </div>
              <a
                href="/face-register"
                className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-600 text-white px-3 md:px-4 py-2 rounded-lg text-[10px] md:text-xs font-medium transition-colors flex items-center gap-1"
              >
                <Camera className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>立即录入</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 立即申请 - 移动端优化 */}
      <section className="py-6 md:py-8 px-3 md:px-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base md:text-lg lg:text-xl font-bold mb-1.5 md:mb-2">成为守护人，传递温暖</h2>
          <p className="text-xs md:text-sm opacity-90 mb-4 md:mb-5">
            加入我们，用爱心和专业点亮每一位长者的生活
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => setIsApplyOpen(true)}
              className="bg-white text-rose-600 hover:bg-rose-50 h-10 md:h-11 px-5 md:px-6"
            >
              <Heart className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">立即申请</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/20 h-10 md:h-11 px-5 md:px-6 bg-transparent"
              asChild
            >
              <a href="tel:400-xxx-xxxx" className="flex items-center">
                <Phone className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="font-bold text-xs md:text-sm">400-xxx-xxxx</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 申请弹窗 - 精致紧凑 */}
      <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <DialogContent className="max-w-sm max-h-[80vh] overflow-y-auto p-0">
          {/* 标题区 */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-3 text-white">
            <DialogTitle className="text-sm font-medium text-center">守护人申请</DialogTitle>
            <p className="text-[10px] text-white/80 text-center mt-0.5">加入我们，传递温暖</p>
          </div>
          
          <form className="p-4 space-y-2.5" onSubmit={(e) => {
            e.preventDefault();
            alert('申请已提交！我们将在3个工作日内与您联系。');
            setIsApplyOpen(false);
          }}>
            {/* 基本信息 */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="name" className="text-[10px] text-gray-500 mb-0.5 block">姓名</Label>
                <Input id="name" placeholder="请输入" required className="h-8 text-xs bg-gray-50 border-gray-100 focus:border-rose-300" />
              </div>
              <div>
                <Label htmlFor="age" className="text-[10px] text-gray-500 mb-0.5 block">年龄</Label>
                <Input id="age" type="number" placeholder="请输入" required className="h-8 text-xs bg-gray-50 border-gray-100 focus:border-rose-300" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="phone" className="text-[10px] text-gray-500 mb-0.5 block">联系电话</Label>
                <Input id="phone" type="tel" placeholder="请输入手机号" required className="h-8 text-xs bg-gray-50 border-gray-100 focus:border-rose-300" />
              </div>
              <div>
                <Label htmlFor="identity" className="text-[10px] text-gray-500 mb-0.5 block">身份信息</Label>
                <Input id="identity" placeholder="身份证后4位" required className="h-8 text-xs bg-gray-50 border-gray-100 focus:border-rose-300" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="community" className="text-[10px] text-gray-500 mb-0.5 block">居住社区</Label>
              <Input id="community" placeholder="请输入您居住的社区" required className="h-8 text-xs bg-gray-50 border-gray-100 focus:border-rose-300" />
            </div>
            
            <div>
              <Label htmlFor="type" className="text-[10px] text-gray-500 mb-0.5 block">申请类型</Label>
              <select id="type" className="w-full h-8 rounded-md border border-gray-100 bg-gray-50 px-2.5 text-xs focus:border-rose-300" required>
                <option value="">请选择</option>
                <option value="core">核心守护人（40+中女）</option>
                <option value="active">活力守护人（30+独居女性）</option>
              </select>
            </div>
            
            <div>
              <Label className="text-[10px] text-gray-500 mb-1 block">可提供服务</Label>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 bg-gray-50 rounded-md p-2">
                {['日常照料', '陪诊就医', '组织活动', '宠物托管'].map((s) => (
                  <label key={s} className="flex items-center gap-1.5 text-[11px] text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 w-3 h-3 text-rose-500 focus:ring-rose-300" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white h-9 text-xs rounded-lg mt-3">
              提交申请
            </Button>
            
            <p className="text-[9px] text-gray-400 text-center">
              提交即表示同意《守护人服务协议》
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
