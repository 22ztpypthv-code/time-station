import { NextRequest, NextResponse } from 'next/server';

// 模拟服务数据
const mockService = {
  id: 'SVC-2024031501',
  guardianId: 'G001',
  guardianName: '李阿姨',
  guardianPhone: '138****5678',
  elderlyId: 'E001',
  elderlyName: '王大爷',
  elderlyAddress: '某小区12号楼502室',
  serviceType: '上门助浴',
  scheduledTime: '2024-03-15 14:00',
  estimatedDuration: '1.5小时',
  currentStatus: 'service_in_progress',
  location: {
    lat: 41.7120,
    lng: 123.4250,
    timestamp: new Date().toISOString(),
  },
};

// GET - 获取服务详情或列表（演示模式）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get('serviceId');

  if (serviceId) {
    return NextResponse.json({
      success: true,
      data: mockService,
    });
  }

  return NextResponse.json({
    success: true,
    data: [mockService],
  });
}

// POST - 更新服务状态（演示模式）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // 演示模式：直接返回成功
    return NextResponse.json({
      success: true,
      data: {
        status: 'updated',
        updatedAt: new Date().toISOString(),
        message: '演示模式 - 操作成功',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '操作失败' },
      { status: 500 }
    );
  }
}
