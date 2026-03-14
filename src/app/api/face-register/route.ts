import { NextRequest, NextResponse } from 'next/server';

// POST - 人脸信息录入（演示模式）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userType } = body;

    // 演示模式：直接返回成功
    return NextResponse.json({
      success: true,
      data: {
        faceId: `FACE_${Date.now()}`,
        registeredAt: new Date().toISOString(),
        message: '人脸信息录入成功（演示模式）',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '人脸录入失败，请重试' },
      { status: 500 }
    );
  }
}

// GET - 获取人脸信息（演示模式）
export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
    message: '演示模式 - 无实际数据',
  });
}
