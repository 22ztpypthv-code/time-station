'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Ticket,
  HeartPulse,
  Briefcase,
  ChevronRight,
  CheckCircle,
  Download,
  HelpCircle,
  Calculator,
} from 'lucide-react';

// 政策卡片数据 - 演示模式
const policies = [
  {
    icon: Ticket,
    title: '养老服务优惠',
    items: [
      { label: '详情请咨询', value: '当地社区服务中心' },
    ],
    desc: '请咨询当地社区服务中心了解具体政策',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: HeartPulse,
    title: '护理保险',
    items: [
      { label: '详情请咨询', value: '当地社区服务中心' },
    ],
    desc: '请咨询当地社区服务中心了解具体政策',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Briefcase,
    title: '创业支持',
    items: [
      { label: '详情请咨询', value: '当地人社部门' },
    ],
    desc: '请咨询当地人社部门了解具体政策',
    color: 'from-purple-500 to-fuchsia-500',
  },
];

// 服务流程 - 演示模式
const voucherProcess = [
  { step: 1, title: '咨询政策', desc: '咨询当地社区服务中心' },
  { step: 2, title: '准备材料', desc: '准备相关证明材料' },
  { step: 3, title: '提交申请', desc: '按要求提交申请' },
  { step: 4, title: '等待审核', desc: '等待审核结果' },
];

// FAQ数据 - 演示模式
const faqs = [
  {
    q: '如何了解服务优惠政策？',
    a: '请咨询当地社区服务中心了解具体申请流程和条件。',
  },
  {
    q: '如何了解护理保险政策？',
    a: '请咨询当地社区服务中心了解具体的护理保险政策信息。',
  },
  {
    q: '服务优惠可以叠加使用吗？',
    a: '请咨询当地社区服务中心了解具体的服务券使用规则。',
  },
  {
    q: '外地户籍老人如何获得服务？',
    a: '请咨询当地社区服务中心了解具体的服务范围和政策。',
  },
  {
    q: '如何查询护理保险资格？',
    a: '请咨询当地社区服务中心了解相关信息。',
  },
];

// 资格自测问题 - 演示模式
const quizQuestions = [
  {
    id: 'age',
    question: '您的年龄是？',
    options: ['60岁以下', '60-70岁', '70-80岁', '80岁以上'],
  },
  {
    id: 'living',
    question: '您的居住情况是？',
    options: ['独居', '与子女同住', '养老机构', '其他'],
  },
  {
    id: 'health',
    question: '您的身体状况是？',
    options: ['自理', '需要部分帮助', '需要较多帮助', '不确定'],
  },
];

export default function PolicyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">政策信息专区</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            了解相关养老政策信息
            <br />
            具体政策请咨询当地相关部门
          </p>
        </div>
      </section>

      {/* 政策卡片 */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-r ${policy.color} p-4 text-white`}>
                  <policy.icon className="w-8 h-8 mb-2" />
                  <h3 className="text-lg font-bold">{policy.title}</h3>
                </div>
                <CardContent className="p-4">
                  {policy.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b last:border-0">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold text-gray-800">{item.value}</span>
                    </div>
                  ))}
                  <p className="text-sm text-gray-500 mt-3">{policy.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 流程说明 */}
      <section className="py-8 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">申请流程</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {voucherProcess.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-rose-600 font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 资格自测 */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <Calculator className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">资格自测（演示）</h2>
            <p className="text-gray-600">这是一个演示功能，结果仅供参考</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              {!showResult ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {quizQuestions[currentQuestion].question}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      问题 {currentQuestion + 1} / {quizQuestions.length}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-3 text-left"
                        onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">评估完成</h3>
                  <p className="text-gray-600 mb-4">
                    这是一个演示功能，具体政策资格请咨询当地社区服务中心。
                  </p>
                  <Button onClick={resetQuiz}>重新测试</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 px-4 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">常见问题</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <HelpCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{faq.q}</h3>
                      <p className="text-gray-600 text-sm">{faq.a}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-12 px-4 md:px-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">了解更多政策信息</h2>
          <p className="text-white/90 mb-6">
            请咨询当地社区服务中心获取最新政策信息
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-rose-600 hover:bg-rose-50">
                联系我们
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                查看服务
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
