import { NextRequest, NextResponse } from 'next/server';

// 模拟搜索结果（演示模式）
const DEMO_SEARCH_RESULTS = [
  {
    keywords: ['政策', '养老', '护理'],
    summary: '养老政策信息演示 - 具体政策请咨询当地社区服务中心。',
    results: [
      {
        id: '1',
        title: '养老服务政策解读（示例）',
        url: 'https://example.com/policy1',
        snippet: '各地养老政策有所不同，请咨询当地社区服务中心了解详情...',
        siteName: '示例信息平台',
        publishTime: '2024-01-15'
      },
      {
        id: '2',
        title: '长期护理保险指南（示例）',
        url: 'https://example.com/policy2',
        snippet: '长期护理保险相关政策请咨询当地社区服务中心...',
        siteName: '示例健康平台',
        publishTime: '2024-02-20'
      }
    ]
  },
  {
    keywords: ['护理', '康复', '照料'],
    summary: '养老服务护理知识包括：日常照料技巧、康复训练方法、营养膳食搭配、安全防护措施等方面。',
    results: [
      {
        id: '1',
        title: '老年人日常护理技巧',
        url: 'https://example.com/care1',
        snippet: '老年人日常护理包括个人卫生、饮食照料、活动协助等多个方面...',
        siteName: '示例健康平台',
        publishTime: '2024-03-01'
      }
    ]
  }
];

// 默认搜索结果
const DEFAULT_SEARCH_RESULT = {
  summary: '搜索结果演示模式 - 请输入具体关键词获取相关信息。',
  results: [
    {
      id: '1',
      title: '时光驿站 - 养老服务演示平台',
      url: 'https://example.com/home',
      snippet: '我们提供多种养老服务演示功能...',
      siteName: '演示官网',
      publishTime: '2024-03-15'
    }
  ]
};

export async function POST(request: NextRequest) {
  try {
    const { query, count = 10 } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: '请输入搜索内容' },
        { status: 400 }
      );
    }

    // 匹配关键词找到合适的搜索结果
    let searchResult = DEFAULT_SEARCH_RESULT;
    for (const item of DEMO_SEARCH_RESULTS) {
      if (item.keywords.some(keyword => query.includes(keyword))) {
        searchResult = { summary: item.summary, results: item.results };
        break;
      }
    }

    return NextResponse.json({
      success: true,
      ...searchResult,
      note: '演示模式 - 搜索结果为模拟数据'
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: '搜索失败，请稍后重试' },
      { status: 500 }
    );
  }
}
