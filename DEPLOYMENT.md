# 时光驿站 - 部署指南

## 项目信息

- **项目名称**: meihaoban-elderly-care（时光驿站）
- **技术栈**: Next.js 14.2.23 + React 18.3.1 + TypeScript + Tailwind CSS 4
- **包管理器**: pnpm
- **构建命令**: `pnpm install && pnpm run build`
- **启动命令**: `pnpm run start`

## 本地运行

### 1. 安装依赖
```bash
pnpm install
```

### 2. 启动开发服务器
```bash
pnpm dev
```
访问: http://localhost:5000

### 3. 构建生产版本
```bash
pnpm build
```

### 4. 启动生产服务器
```bash
pnpm start
```

## 项目结构

```
.
├── .coze              # Coze CLI 配置文件（沙箱环境专用）
├── build.sh           # 构建脚本
├── next.config.js     # Next.js 配置
├── package.json       # 项目依赖和脚本
├── tsconfig.json      # TypeScript 配置
├── tailwind.config.ts # Tailwind CSS 配置
├── postcss.config.mjs # PostCSS 配置
├── public/            # 静态资源
├── src/
│   ├── app/          # Next.js App Router 页面
│   │   ├── layout.tsx        # 根布局
│   │   ├── page.tsx          # 首页
│   │   ├── community/        # 社区服务页面
│   │   ├── contact/          # 联系我们页面
│   │   ├── face-register/    # 人脸注册页面
│   │   ├── guardian/         # 守护人页面
│   │   ├── memorial/         # 纪念册页面
│   │   ├── policy/           # 政策页面
│   │   ├── services/         # 服务页面
│   │   ├── service-tracking/ # 服务追踪页面
│   │   └── api/              # API 路由
│   ├── components/    # React 组件
│   │   ├── ui/       # shadcn/ui 组件
│   │   ├── ad-banner.tsx
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── service-map.tsx
│   │   └── web-search.tsx
│   └── globals.css    # 全局样式
└── pnpm-lock.yaml    # pnpm 锁文件
```

## 环境要求

- **Node.js**: >= 18.0.0（推荐 20.x）
- **pnpm**: 最新版本

## 部署平台

### 1. Vercel（推荐）

#### 优点
- ✅ Next.js 官方推荐，完美支持
- ✅ 个人版永久免费
- ✅ 自动 CI/CD，推送代码自动部署
- ✅ 全球 CDN，速度快
- ✅ 自定义域名支持

#### 部署步骤

**方法一：通过 Git 仓库部署**

1. 将项目推送到 GitHub/GitLab/Bitbucket
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 导入您的 Git 仓库
5. Vercel 会自动检测 Next.js 项目
6. 配置构建设置：
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm install && pnpm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
7. 点击 "Deploy"

**方法二：通过 Vercel CLI 部署**

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel
```

#### 重要配置

在 Vercel 项目设置中配置环境变量（如果需要）：
- `NEXT_PUBLIC_API_URL` 等（根据项目需求）

### 2. Netlify

#### 部署步骤

1. 登录 [Netlify](https://netlify.com)
2. 点击 "Add new site" -> "Import an existing project"
3. 连接 Git 仓库
4. 配置构建设置：
   - **Build command**: `pnpm install && pnpm run build`
   - **Publish directory**: `.next`
5. 点击 "Deploy site"

### 3. 传统服务器部署

#### 准备工作

1. 购买一台云服务器（阿里云、腾讯云、华为云等）
2. 安装 Node.js 18+ 和 pnpm
3. 安装 Nginx（可选，用于反向代理）

#### 部署步骤

```bash
# 1. 上传项目代码到服务器
# 使用 scp、git clone 或其他方式

# 2. 进入项目目录
cd /path/to/project

# 3. 安装依赖
pnpm install

# 4. 构建项目
pnpm build

# 5. 使用 PM2 管理进程（推荐）
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "time-station" -- start

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup
```

#### Nginx 配置（可选）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Docker 部署

#### 创建 Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package 文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制项目文件
COPY . .

# 构建项目
RUN pnpm build

# 暴露端口
EXPOSE 5000

# 启动应用
CMD ["pnpm", "start"]
```

#### 构建和运行

```bash
# 构建镜像
docker build -t time-station .

# 运行容器
docker run -p 5000:5000 time-station
```

## 常见问题

### 1. 构建失败

**问题**: 构建时出现类型错误或依赖问题

**解决方案**:
- 确保使用 Node.js 18+
- 删除 `node_modules` 和 `pnpm-lock.yaml`，重新安装
- 检查 `package.json` 中的依赖版本

### 2. 图片加载失败

**问题**: 部署后图片无法显示

**解决方案**:
- 检查 `next.config.js` 中的 `remotePatterns` 配置
- 确保图片 URL 在允许的域名列表中
- 检查图片 URL 是否可访问

### 3. API 路由无法访问

**问题**: API 接口返回 404 或 500 错误

**解决方案**:
- 确保所有 API 文件都在 `src/app/api/` 目录下
- 检查 API 文件的导出语法是否正确
- 查看服务器日志，定位具体错误

### 4. 部署后样式丢失

**问题**: 页面样式不正确

**解决方案**:
- 检查 Tailwind CSS 配置
- 确保生产构建时正确生成 CSS
- 清除浏览器缓存

## 性能优化建议

1. **启用图片优化**: 使用 Next.js Image 组件
2. **代码分割**: Next.js 自动处理代码分割
3. **CDN 加速**: 使用 Vercel 或 Cloudflare CDN
4. **缓存策略**: 配置合适的缓存头
5. **压缩资源**: 启用 gzip/brotli 压缩

## 监控和日志

### Vercel 监控
- 访问 Vercel Dashboard
- 查看 Analytics、Logs 和 Speed Insights

### 自定义监控
- 集成 Google Analytics
- 使用 Sentry 错误监控
- 配置日志服务（如 LogRocket）

## 技术支持

- **Next.js 官方文档**: https://nextjs.org/docs
- **Vercel 官方文档**: https://vercel.com/docs
- **项目 GitHub Issues**: （如果有）

## 更新日志

### v0.1.0 (2024-03-15)
- 初始版本发布
- 实现核心功能模块
- 完成 18 个页面路由
- 集成 shadcn/ui 组件库
- 支持地图、搜索、人脸识别等功能

---

**最后更新**: 2024-03-15
**维护者**: 时光驿站开发团队
