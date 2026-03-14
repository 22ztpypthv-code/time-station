import { NextRequest, NextResponse } from 'next/server';

// 模拟AI客服响应（演示模式）
const DEMO_RESPONSES = [
  {
    keywords: ['服务', '有什么', '提供'],
    response: `您好！时光驿站是一个养老服务演示平台。

🏠 **服务类型**
1. 上门助浴服务
2. 医疗陪诊服务
3. 康复护理服务
4. 适老化改造服务
5. 深度保洁服务
6. 营养餐饮服务

💝 **增值服务**
1. 人生回忆录
2. 声音银行
3. 心理疗愈沙龙

这是一个功能演示，实际服务以线下咨询为准。`
  },
  {
    keywords: ['优惠', '政策', '服务'],
    response: `您好！关于养老政策信息：

📋 **说明**
这是一个演示平台，具体的政策信息请咨询当地社区服务中心。

📞 **建议渠道**
- 社区服务中心官网
- 社区服务中心窗口
- 社区服务中心窗口

我们提供的是演示功能，实际政策以实际情况为准。`
  },
  {
    keywords: ['守护人', '申请', '加入'],
    response: `感谢您对守护人计划的关注！

👩 **守护人类型**
- 核心守护人：提供日常照料、活动组织等服务
- 活力守护人：提供陪诊、云陪护等服务

📋 **基本要求**
- 有爱心、耐心、责任心
- 能够提供稳定服务
- 接受相关培训

这是一个演示功能，实际申请流程以线下为准。`
  },
  {
    keywords: ['预约', '下单', '预约服务'],
    response: `您好！预约服务演示：

📱 **在线预约**
访问"服务商城"页面，选择所需服务

📞 **电话咨询**
工作时间可拨打客服电话

⚠️ 这是演示功能，实际预约请线下咨询。`
  },
  {
    keywords: ['紧急', '急救', '120', '摔倒', '晕倒'],
    response: `⚠️ **紧急情况**

如果您遇到紧急情况，请立即：
1. 拨打 **120** 急救电话
2. 或拨打 **110** 报警电话

请保持冷静，等待专业救援！`
  }
];

// 默认响应
const DEFAULT_RESPONSE = `您好！我是智能养老顾问 🌸

这是一个养老服务演示平台。

您可以咨询：
- 🏠 服务项目介绍
- 📋 守护人计划
- 📞 联系方式

请问有什么可以帮您的？`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: '消息不能为空' }, { status: 400 });
    }

    // 匹配关键词找到合适的响应
    let responseText = DEFAULT_RESPONSE;
    for (const item of DEMO_RESPONSES) {
      if (item.keywords.some(keyword => message.includes(keyword))) {
        responseText = item.response;
        break;
      }
    }

    // 模拟流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // 模拟打字效果
        const words = responseText.split('');
        for (const word of words) {
          controller.enqueue(encoder.encode(word));
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: '服务暂时不可用' },
      { status: 500 }
    );
  }
}
