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
  MapPin,
  Phone,
  Clock,
  Navigation,
  Calendar,
  Users,
  ChevronRight,
} from 'lucide-react';

// 服务点数据
const servicePoints = [
  {
    name: 'A社区服务点',
    address: '某社区服务中心',
    phone: '示例电话',
    hours: '周一至周五 9:00-17:00',
    services: ['日间照料', '健康讲座', '文娱活动'],
    coordinates: { lat: 41.75, lng: 123.45 },
  },
  {
    name: 'B社区服务点',
    address: '某社区活动中心',
    phone: '示例电话',
    hours: '周一至周五 9:00-17:00',
    services: ['健康检查', '助餐服务', '康复训练'],
    coordinates: { lat: 41.76, lng: 123.46 },
  },
  {
    name: 'C社区服务点',
    address: '某社区服务中心',
    phone: '示例电话',
    hours: '周一至周五 9:00-17:00',
    services: ['心理咨询', '法律援助', '文体活动'],
    coordinates: { lat: 41.74, lng: 123.47 },
  },
  {
    name: 'D社区服务点',
    address: '某社区服务中心',
    phone: '示例电话',
    hours: '周一至周五 9:00-17:00',
    services: ['居家护理', '上门服务', '医疗陪诊'],
    coordinates: { lat: 41.75, lng: 123.48 },
  },
];

// 流动驿站时间表
const mobileSchedule = [
  { day: '周一', community: 'A社区', location: '示例地点' },
  { day: '周二', community: 'B社区', location: '示例地点' },
  { day: '周三', community: 'C社区', location: '示例地点' },
  { day: '周四', community: 'D社区', location: '示例地点' },
  { day: '周五', community: 'E社区', location: '示例地点' },
];

export default function CommunityPage() {
  const [selectedPoint, setSelectedPoint] = useState<typeof servicePoints[0] | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 页面标题 */}
      <section className="bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">社区服务点</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            流动驿站，服务到家
            <br />
            就近享受专业养老服务
          </p>
        </div>
      </section>

      {/* 地图展示区 */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden">
            <div className="h-64 md:h-96 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-green-safe mx-auto mb-4" />
                <p className="text-gray-600 text-lg">地图加载中...</p>
                <p className="text-gray-500 text-sm mt-2">
                  点击下方服务点查看详情
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 服务点列表 */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">服务网点</h2>
            <p className="text-gray-600">选择就近服务点</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {servicePoints.map((point, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedPoint(point)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-safe flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{point.name}</h3>
                        <p className="text-sm text-gray-500">{point.hours}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {point.address}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {point.phone}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {point.services.map((service, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 流动驿站时间表 */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">流动驿站时间表</h2>
            <p className="text-gray-600">每周轮转，服务到社区</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">时间</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">社区</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">地点</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-800">操作</th>
                </tr>
              </thead>
              <tbody>
                {mobileSchedule.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-rose-500" />
                        {item.day}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{item.community}</td>
                    <td className="py-4 px-4 text-gray-600">{item.location}</td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        预约服务
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 服务预约 */}
      <section className="py-16 px-4 md:px-6 bg-gradient-safe text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">预约社区服务</h2>
          <p className="text-lg opacity-90 mb-8">
            选择就近服务点，享受专业养老服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-green-safe hover:bg-green-50"
            >
              <Calendar className="mr-2 h-5 w-5" />
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

      {/* 服务点详情弹窗 */}
      <Dialog open={!!selectedPoint} onOpenChange={() => setSelectedPoint(null)}>
        <DialogContent className="max-w-md">
          {selectedPoint && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-safe" />
                  {selectedPoint.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">地址</div>
                    <div className="text-gray-800">{selectedPoint.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">电话</div>
                    <a href={`tel:${selectedPoint.phone}`} className="text-rose-500 hover:underline">
                      {selectedPoint.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">服务时间</div>
                    <div className="text-gray-800">{selectedPoint.hours}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 mb-2">提供服务</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPoint.services.map((service, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bg-green-safe hover:bg-green-600 text-white" asChild>
                    <a href={`tel:${selectedPoint.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      拨打电话
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedPoint(null);
                      setIsBookingOpen(true);
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    预约服务
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 预约弹窗 */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">预约社区服务</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-4" onSubmit={(e) => {
            e.preventDefault();
            alert('预约成功！我们会尽快与您联系确认。');
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
              <Label htmlFor="community">选择社区</Label>
              <select id="community" className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm" required>
                <option value="">请选择社区</option>
                {servicePoints.map((p) => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">服务类型</Label>
              <select id="service" className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm" required>
                <option value="">请选择服务</option>
                <option value="daycare">日间照料</option>
                <option value="meal">助餐服务</option>
                <option value="health">健康检查</option>
                <option value="activity">文娱活动</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">预约时间</Label>
              <Input id="date" type="date" required />
            </div>
            <Button type="submit" className="w-full bg-green-safe hover:bg-green-600 text-white">
              提交预约
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
