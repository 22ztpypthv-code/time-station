'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 广告数据
const ads = [
  {
    id: 1,
    title: '健康讲座进社区',
    subtitle: '专业医生团队，为您讲解养生知识',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_668b5653-ffe9-4b33-8938-d7d4bf5c9a2a.jpeg?sign=1804950235-711551e731-0-0fbd099fbbacf308cbe725971886edc3e6e42d7f993aad63a79277f538811e66',
    tag: '活动实景',
    buttonText: '查看详情',
    buttonLink: '/community',
  },
  {
    id: 2,
    title: '志愿陪伴暖人心',
    subtitle: '守护人计划，让爱与陪伴同行',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_2f33140e-e1da-472f-8c0b-d7d36ded9280.jpeg?sign=1804950235-88547527d5-0-12f40910d5dc7bf1f8ed887f101e91e0b90110157a74bc03fa6bcd34f6535c43',
    tag: '活动实景',
    buttonText: '加入守护人',
    buttonLink: '/guardian',
  },
  {
    id: 3,
    title: '专业服务 · 温暖如家',
    subtitle: '时光驿站，期待与您合作',
    image: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_cd2fecde-5da6-4160-baa2-365a396e27d4.jpeg?sign=1804950235-adf8209e64-0-bb575e7a31ae8334fe9c7e0fc88ceaad03d4e1fb1dbc069f442aaab9d03b9a32',
    tag: '广告合作',
    buttonText: '联系我们',
    buttonLink: '/contact',
  },
];

export function AdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  }, []);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const currentAd = ads[currentIndex];

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gray-100">
      {/* 广告图片 */}
      <div className="relative aspect-[3/1] w-full">
        <Image
          src={currentAd.image}
          alt={currentAd.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        
        {/* 文字内容 */}
        <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10">
          <span className="inline-block px-3 py-1 bg-rose-500 text-white text-xs rounded-full mb-3 w-fit">
            {currentAd.tag}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {currentAd.title}
          </h3>
          <p className="text-sm md:text-base text-white/90 mb-4 drop-shadow">
            {currentAd.subtitle}
          </p>
          <a
            href={currentAd.buttonLink}
            className="inline-flex items-center justify-center px-5 py-2 bg-white text-rose-500 text-sm font-medium rounded-full hover:bg-rose-50 transition-colors w-fit"
          >
            {currentAd.buttonText}
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* 左右切换按钮 */}
        <button
          onClick={goToPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
