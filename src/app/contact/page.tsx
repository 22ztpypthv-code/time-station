'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  AlertCircle,
  Send,
  CheckCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [formType, setFormType] = useState<'cooperation' | 'complaint'>('cooperation');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 页面标题 */}
      <section className="bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">联系我们</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我们随时准备为您提供帮助
            <br />
            您的满意是我们最大的追求
          </p>
        </div>
      </section>

      {/* 联系信息 */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-rose-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">客服电话</h3>
                <a href="tel:400-xxx-xxxx" className="text-xl font-bold text-rose-500 hover:underline">
                  400-xxx-xxxx
                </a>
                <p className="text-sm text-gray-500 mt-1">9:00-18:00</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">紧急电话</h3>
                <a href="tel:138-8888-9999" className="text-xl font-bold text-orange-500 hover:underline">
                  138-8888-9999
                </a>
                <p className="text-sm text-gray-500 mt-1">24小时</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">微信客服</h3>
                <div className="text-gray-600">扫码添加</div>
                <div className="w-20 h-20 mx-auto mt-3 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">电子邮箱</h3>
                <a href="mailto:service@meihaoban.com" className="text-gray-600 hover:text-rose-500">
                  service@meihaoban.com
                </a>
                <p className="text-sm text-gray-500 mt-1">工作日24小时内回复</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 地址信息 */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                  <p className="text-gray-600">地图位置</p>
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">办公地址</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-rose-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">某市时光大道888号</div>
                      <div className="text-sm text-gray-500">时光驿站服务中心</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-rose-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-800">工作时间</div>
                      <div className="text-sm text-gray-500">周一至周五 9:00-18:00</div>
                      <div className="text-sm text-gray-500">周六周日 9:00-17:00</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="bg-rose-primary hover:bg-rose-600 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    导航前往
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* 表单区域 */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">留言反馈</h2>
            <p className="text-gray-600">我们重视您的每一条意见</p>
          </div>

          {/* 表单类型选择 */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setFormType('cooperation')}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                formType === 'cooperation'
                  ? 'bg-rose-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              合作咨询
            </button>
            <button
              onClick={() => setFormType('complaint')}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                formType === 'complaint'
                  ? 'bg-rose-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              投诉建议
            </button>
          </div>

          <Card>
            <CardContent className="p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-safe mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">提交成功！</h3>
                  <p className="text-gray-600">我们会在24小时内与您联系</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">您的姓名 *</Label>
                      <Input id="name" placeholder="请输入姓名" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">联系电话 *</Label>
                      <Input id="phone" type="tel" placeholder="请输入手机号" required />
                    </div>
                  </div>

                  {formType === 'cooperation' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="company">单位名称</Label>
                        <Input id="company" placeholder="请输入单位名称（选填）" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="intent">合作意向</Label>
                        <select id="intent" className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm">
                          <option value="">请选择合作意向</option>
                          <option value="service">服务合作</option>
                          <option value="community">社区合作</option>
                          <option value="enterprise">企业合作</option>
                          <option value="other">其他合作</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="type">问题类型 *</Label>
                        <select id="type" className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm" required>
                          <option value="">请选择问题类型</option>
                          <option value="service">服务质量问题</option>
                          <option value="staff">服务人员问题</option>
                          <option value="price">收费问题</option>
                          <option value="other">其他问题</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="order">服务订单号</Label>
                        <Input id="order" placeholder="如有订单号请填写（选填）" />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">详细内容 *</Label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      placeholder={formType === 'cooperation' ? '请详细描述您的合作意向...' : '请详细描述您遇到的问题...'}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-primary hover:bg-rose-600 text-white py-6"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    提交
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 社交媒体 */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">关注我们</h2>
            <p className="text-gray-600">获取最新资讯和服务动态</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">微信公众号</h3>
                <p className="text-sm text-gray-500">扫码关注</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">抖音号</h3>
                <p className="text-sm text-gray-500">@时光驿站</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl">🎬</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">视频号</h3>
                <p className="text-sm text-gray-500">时光驿站</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
