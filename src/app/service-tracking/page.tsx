'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MapPin,
  Clock,
  User,
  Camera,
  CheckCircle,
  Phone,
  MessageCircle,
  Navigation,
  Play,
  Square,
  FileImage,
  FileVideo,
  Eye,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

// 动态导入地图组件（避免SSR问题）
const ServiceMap = dynamic(
  () => import('@/components/service-map').then((mod) => mod.ServiceMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-gray-500">地图加载中...</p>
        </div>
      </div>
    ),
  }
);

// 服务状态枚举
type ServiceStatus =
  | 'guardian_departing'    // 守护人出发
  | 'guardian_arrived'      // 守护人已到达
  | 'elderly_confirmed'     // 被守护人确认
  | 'service_starting'      // 服务开始
  | 'service_in_progress'   // 服务进行中
  | 'service_ended'         // 服务结束
  | 'elderly_verified';     // 被守护人确认结束

// 服务状态配置
const statusConfig: Record<ServiceStatus, {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  icon: typeof MapPin;
}> = {
  guardian_departing: {
    label: '守护人出发',
    description: '守护人正在前往服务地点',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: Navigation,
  },
  guardian_arrived: {
    label: '守护人已到达',
    description: '守护人已到达服务地点',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    icon: MapPin,
  },
  elderly_confirmed: {
    label: '被守护人确认',
    description: '被守护人已确认守护人身份',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: CheckCircle,
  },
  service_starting: {
    label: '服务开始',
    description: '服务即将开始',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    icon: Play,
  },
  service_in_progress: {
    label: '服务进行中',
    description: '服务正在进行中',
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
    icon: Clock,
  },
  service_ended: {
    label: '服务结束',
    description: '服务已完成，等待确认',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    icon: Square,
  },
  elderly_verified: {
    label: '已确认完成',
    description: '服务已确认完成',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    icon: CheckCircle,
  },
};

// 状态顺序
const statusOrder: ServiceStatus[] = [
  'guardian_departing',
  'guardian_arrived',
  'elderly_confirmed',
  'service_starting',
  'service_in_progress',
  'service_ended',
  'elderly_verified',
];

// 模拟服务数据
const mockService = {
  id: 'SVC-2024031501',
  guardian: {
    name: '李阿姨',
    avatar: '👩',
    phone: '138****5678',
    rating: 5,
    services: 128,
  },
  elderly: {
    name: '王大爷',
    avatar: '👴',
    address: '某小区12号楼502室',
    phone: '139****1234',
  },
  serviceType: '上门助浴',
  scheduledTime: '2024-03-15 14:00',
  estimatedDuration: '1.5小时',
  currentStatus: 'service_in_progress' as ServiceStatus,
  location: {
    lat: 41.7120,
    lng: 123.4250,
  },
};

// 模拟位置轨迹数据
const mockTrajectory = [
  { lat: 41.7050, lng: 123.4180, time: '13:30', status: 'guardian_departing' },
  { lat: 41.7080, lng: 123.4200, time: '13:45', status: 'guardian_departing' },
  { lat: 41.7100, lng: 123.4230, time: '13:55', status: 'guardian_departing' },
  { lat: 41.7120, lng: 123.4250, time: '14:00', status: 'guardian_arrived' },
];

// 影像记录类型
interface MediaRecord {
  id: string;
  type: 'photo' | 'video';
  timestamp: string;
  thumbnail?: string;
  url?: string;
  status: ServiceStatus;
  description: string;
}

// 模拟影像记录
const mockMediaRecords: MediaRecord[] = [
  {
    id: 'M001',
    type: 'photo',
    timestamp: '14:00',
    thumbnail: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_666ea24d-678b-4596-99ec-af817c4ad4e4.jpeg?sign=1804991406-c352d5f46d-0-8c2050d904f9588dd82419052d6161310072a1317ca9e1e0822ae0cc78847699',
    url: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_666ea24d-678b-4596-99ec-af817c4ad4e4.jpeg?sign=1804991406-c352d5f46d-0-8c2050d904f9588dd82419052d6161310072a1317ca9e1e0822ae0cc78847699',
    status: 'guardian_arrived',
    description: '守护人到达现场，开始服务准备',
  },
  {
    id: 'M002',
    type: 'photo',
    timestamp: '14:02',
    thumbnail: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_1dc3d9fc-e57f-4020-973a-c777f8201b15.jpeg?sign=1804991407-4d755f1f1b-0-f113468fc92b12e64407f3ea89004a68918523827b5eb4370de3bd3e58a74b83',
    url: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_1dc3d9fc-e57f-4020-973a-c777f8201b15.jpeg?sign=1804991407-4d755f1f1b-0-f113468fc92b12e64407f3ea89004a68918523827b5eb4370de3bd3e58a74b83',
    status: 'elderly_confirmed',
    description: '被守护人确认服务开始',
  },
  {
    id: 'M003',
    type: 'photo',
    timestamp: '14:15',
    thumbnail: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_6bf02a92-8250-441a-8308-05694d1dbf0f.jpeg?sign=1804991408-7e3976dbac-0-1c00a5a4b3a0a1f3a2e20b14ac0f7ef5a4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9',
    url: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_6bf02a92-8250-441a-8308-05694d1dbf0f.jpeg?sign=1804991408-7e3976dbac-0-1c00a5a4b3a0a1f3a2e20b14ac0f7ef5a4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9',
    status: 'service_in_progress',
    description: '服务进行中',
  },
  {
    id: 'M004',
    type: 'video',
    timestamp: '14:30',
    status: 'service_in_progress',
    description: '服务过程视频记录',
  },
  {
    id: 'M005',
    type: 'photo',
    timestamp: '15:00',
    thumbnail: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d.jpeg?sign=1804991409-8f90a1b2c3-0-2d00b6b5c4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8',
    url: 'https://coze-coding-project.tos.coze.site/coze_storage_7616736163511926847/image/generate_image_8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d.jpeg?sign=1804991409-8f90a1b2c3-0-2d00b6b5c4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8',
    status: 'service_ended',
    description: '服务完成确认',
  },
];

export default function ServiceTrackingPage() {
  const currentStatus = mockService.currentStatus;
  const currentIndex = statusOrder.indexOf(currentStatus);
  const [selectedMedia, setSelectedMedia] = useState<MediaRecord | null>(null);
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false);

  // 查看媒体详情
  const viewMedia = (media: MediaRecord) => {
    setSelectedMedia(media);
    setIsMediaDialogOpen(true);
  };

  // 点击拍摄按钮（演示模式）
  const handleCameraClick = () => {
    setIsDemoDialogOpen(true);
  };

  // 计算进度百分比
  const progressPercent = ((currentIndex + 1) / statusOrder.length) * 100;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base md:text-lg font-bold text-gray-800">服务追踪</h1>
            <p className="text-[10px] md:text-xs text-gray-500">实时关注服务动态</p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Badge variant="outline" className="text-[10px] md:text-xs bg-green-50 text-green-600 border-green-200">
              服务中
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9">
              <Phone className="w-4 h-4 text-rose-500" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4 space-y-3 md:space-y-4">
        {/* 演示模式提示 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">📌 演示模式：当前为功能展示，地图和影像展示功能正常运行</span>
          </div>
        </div>

        {/* 地图区域 */}
        <Card className="border-0 shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="relative" style={{ height: '280px' }}>
              <ServiceMap
                serviceLocation={mockService.location}
                guardianLocation={currentStatus === 'guardian_departing' ? mockTrajectory[mockTrajectory.length - 1] : undefined}
                trajectory={mockTrajectory}
                address={mockService.elderly.address}
              />

              {/* 轨迹信息浮层 */}
              <div className="absolute top-3 left-3 bg-white/95 rounded-lg p-2 shadow-md">
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-600">
                  <Navigation className="w-3 h-3 text-blue-500" />
                  <span>守护人已行驶 2.8km</span>
                </div>
              </div>

              {/* 地址信息浮层 */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 rounded-lg p-2 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] md:text-xs font-medium text-gray-800 truncate">
                      {mockService.elderly.address}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-gray-500">服务地点</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 服务信息卡片 */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-100 flex items-center justify-center text-xl md:text-2xl">
                  {mockService.guardian.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm md:text-base">{mockService.guardian.name}</div>
                  <div className="text-[10px] md:text-xs text-gray-500">守护人 · 好评率 98%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs md:text-sm font-medium text-gray-800">{mockService.serviceType}</div>
                <div className="text-[10px] md:text-xs text-gray-500">{mockService.scheduledTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-600">
              <User className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span className="truncate">被守护人：{mockService.elderly.name}</span>
              <span className="text-gray-300">|</span>
              <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span>预计时长：{mockService.estimatedDuration}</span>
            </div>
          </CardContent>
        </Card>

        {/* 服务流程进度 */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2 md:pb-3 px-3 md:px-4 pt-3 md:pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm md:text-base">服务流程</CardTitle>
              <span className="text-[10px] md:text-xs text-gray-500">{Math.round(progressPercent)}% 完成</span>
            </div>
            <Progress value={progressPercent} className="h-1.5 md:h-2 mt-2" />
          </CardHeader>
          <CardContent className="px-3 md:px-4 pb-3 md:pb-4">
            <div className="space-y-2">
              {statusOrder.map((status, index) => {
                const config = statusConfig[status];
                const isActive = index === currentIndex;
                const isCompleted = index < currentIndex;
                const Icon = config.icon;

                return (
                  <div
                    key={status}
                    className={`flex items-center gap-2 md:gap-3 p-2 md:p-2.5 rounded-lg transition-all ${
                      isActive ? `${config.bgColor} border border-current/20` : ''
                    } ${isCompleted ? 'opacity-60' : ''}`}
                  >
                    <div
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? 'bg-green-100 text-green-600'
                          : isActive
                          ? config.bgColor
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      ) : (
                        <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-xs md:text-sm ${
                        isActive ? config.color : 'text-gray-800'
                      }`}>
                        {config.label}
                        {isActive && (
                          <Badge variant="outline" className="ml-2 text-[9px] md:text-[10px]">
                            当前
                          </Badge>
                        )}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500 truncate">
                        {config.description}
                      </div>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 影像留档 */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2 md:pb-3 px-3 md:px-4 pt-3 md:pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm md:text-base">影像留档</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCameraClick}
                className="h-7 md:h-8 text-[10px] md:text-xs"
              >
                <Camera className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1" />
                拍摄记录
              </Button>
            </div>
            <CardDescription className="text-[10px] md:text-xs">
              服务过程影像记录，保障双方权益
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 md:px-4 pb-3 md:pb-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 pb-2">
                {mockMediaRecords.map((media) => (
                  <button
                    key={media.id}
                    onClick={() => viewMedia(media)}
                    className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-gray-200 hover:border-rose-300 transition-all relative group"
                  >
                    {media.thumbnail ? (
                      <img
                        src={media.thumbnail}
                        alt={media.description}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        {media.type === 'photo' ? (
                          <FileImage className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                        ) : (
                          <FileVideo className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                        )}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1 text-[9px] md:text-[10px]">
                      <div className="truncate">{media.timestamp}</div>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  </button>
                ))}
                {/* 添加更多 */}
                <button
                  onClick={handleCameraClick}
                  className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-rose-300 transition-all flex flex-col items-center justify-center text-gray-400 hover:text-rose-400"
                >
                  <Camera className="w-5 h-5 md:w-6 md:h-6 mb-1" />
                  <span className="text-[9px] md:text-[10px]">添加</span>
                </button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="flex gap-2 md:gap-3">
          <Button variant="outline" className="flex-1 h-10 md:h-11 text-xs md:text-sm">
            <MessageCircle className="w-4 h-4 mr-1.5 md:mr-2" />
            联系守护人
          </Button>
          <Button variant="outline" className="flex-1 h-10 md:h-11 text-xs md:text-sm">
            <Phone className="w-4 h-4 mr-1.5 md:mr-2" />
            联系平台
          </Button>
        </div>
      </main>

      {/* 演示模式提示弹窗 */}
      <Dialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-amber-500" />
              </div>
              演示模式
            </DialogTitle>
          </DialogHeader>
          <div className="text-center text-sm text-gray-600 py-2">
            <p>摄像头拍摄功能在演示模式下暂不可用</p>
            <p className="mt-2 text-xs text-gray-500">正式部署后，此功能将正常启用</p>
          </div>
          <Button onClick={() => setIsDemoDialogOpen(false)} className="w-full mt-2">
            我知道了
          </Button>
        </DialogContent>
      </Dialog>

      {/* 媒体详情弹窗 */}
      <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-sm md:text-base">
              {selectedMedia?.type === 'photo' ? '照片记录' : '视频记录'}
            </DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="space-y-3">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {selectedMedia.url ? (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.description}
                    className="w-full h-full object-cover"
                  />
                ) : selectedMedia.type === 'photo' ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileImage className="w-12 h-12 text-gray-400" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileVideo className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="space-y-1.5 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">拍摄时间</span>
                  <span className="font-medium">{selectedMedia.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">服务状态</span>
                  <span className="font-medium">{statusConfig[selectedMedia.status].label}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 flex-shrink-0">描述</span>
                  <span className="font-medium text-right">{selectedMedia.description}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
