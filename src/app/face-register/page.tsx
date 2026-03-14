'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Camera,
  CheckCircle,
  User,
  Shield,
  Upload,
  RotateCcw,
} from 'lucide-react';

type RegisterStep = 'intro' | 'capture' | 'preview' | 'uploading' | 'success';
type UserType = 'guardian' | 'elderly';

export default function FaceRegisterPage() {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [step, setStep] = useState<RegisterStep>('intro');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // 模拟拍照（演示模式 - 不调用实际摄像头）
  const simulateCapture = () => {
    setStep('capture');
    // 模拟拍照延迟
    setTimeout(() => {
      setStep('preview');
    }, 1000);
  };

  // 重新拍摄
  const retakePhoto = () => {
    setStep('capture');
    setTimeout(() => {
      setStep('preview');
    }, 1000);
  };

  // 模拟上传照片
  const uploadPhoto = () => {
    setStep('uploading');
    setUploadProgress(0);

    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // 模拟上传完成
    setTimeout(() => {
      setStep('success');
      setIsSuccessOpen(true);
    }, 2500);
  };

  // 选择用户类型
  const selectUserType = (type: UserType) => {
    setUserType(type);
    simulateCapture();
  };

  // 完成注册
  const handleFinish = () => {
    setIsSuccessOpen(false);
    setUserType(null);
    setStep('intro');
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-4 md:py-8 px-3 md:px-4">
      <div className="max-w-2xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm mb-3">
            <Shield className="w-4 h-4 text-rose-500" />
            <span className="text-xs text-gray-700">安全认证</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            人脸识别录入
          </h1>
          <p className="text-sm text-gray-600">
            为守护人和被守护人建立安全身份档案
          </p>
        </div>

        {/* 演示模式提示 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-amber-700">
            <span className="text-sm">📌 演示模式：当前为功能展示，实际使用需在正式环境中开启摄像头权限</span>
          </div>
        </div>

        {/* 步骤1：选择用户类型 */}
        {step === 'intro' && (
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">选择身份类型</CardTitle>
              <CardDescription>请选择您的身份类型开始录入</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => selectUserType('guardian')}
                className="w-full h-auto py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">守护人</div>
                    <div className="text-xs opacity-80">提供养老服务的专业人员</div>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => selectUserType('elderly')}
                variant="outline"
                className="w-full h-auto py-4 border-2 hover:bg-rose-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">被守护人</div>
                    <div className="text-xs text-gray-500">接受养老服务的老人</div>
                  </div>
                </div>
              </Button>

              {/* 录入流程说明 */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">录入流程</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['选择身份', '拍照录入', '确认上传'].map((item, index) => (
                    <div key={item} className="text-center">
                      <div className="w-6 h-6 bg-rose-100 text-rose-500 rounded-full text-xs flex items-center justify-center mx-auto mb-1">
                        {index + 1}
                      </div>
                      <span className="text-xs text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 步骤2：拍照/预览 */}
        {(step === 'capture' || step === 'preview') && (
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant={userType === 'guardian' ? 'default' : 'outline'}>
                  {userType === 'guardian' ? '守护人' : '被守护人'}
                </Badge>
              </div>
              <CardTitle className="text-lg">
                {step === 'capture' ? '正在采集人脸...' : '确认照片'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 摄像头预览区域 - 演示模式显示占位图 */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                {step === 'capture' ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-gray-600">正在模拟拍照...</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-100">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <p className="text-gray-700 font-medium">人脸采集成功</p>
                      <p className="text-sm text-gray-500 mt-1">演示模式 - 模拟照片已生成</p>
                    </div>
                  </div>
                )}

                {/* 人脸框引导线 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-dashed border-rose-400 rounded-full opacity-50" />
                </div>
              </div>

              {/* 操作按钮 */}
              {step === 'preview' && (
                <div className="flex gap-3">
                  <Button
                    onClick={retakePhoto}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重新拍摄
                  </Button>
                  <Button
                    onClick={uploadPhoto}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    确认上传
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 步骤3：上传中 */}
        {step === 'uploading' && (
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-8 h-8 text-rose-500 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">正在上传</h3>
                <p className="text-sm text-gray-500 mt-1">请稍候，正在保存人脸数据...</p>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-center text-sm text-gray-500 mt-2">{uploadProgress}%</p>
            </CardContent>
          </Card>
        )}

        {/* 成功提示 */}
        <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                录入成功
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                您的人脸信息已成功录入系统，可以开始享受安全便捷的养老服务了！
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <Button
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500"
              >
                完成
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 功能说明 */}
        <Card className="mt-4 border-none shadow-sm bg-white/60">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">💡 功能说明</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 人脸信息用于身份验证，确保服务安全</li>
              <li>• 支持守护人和被守护人两种身份录入</li>
              <li>• 数据采用加密存储，保障隐私安全</li>
              <li>• 人脸信息仅用于平台服务验证</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
