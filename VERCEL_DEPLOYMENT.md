# Vercel 快速部署指南

## 为什么选择 Vercel？

✅ **Next.js 官方推荐** - 完美支持 Next.js 所有功能
✅ **永久免费** - 个人版提供 100GB 带宽/月，足够小型项目使用
✅ **自动部署** - 推送代码到 Git，自动触发部署
✅ **全球 CDN** - 访问速度快，全球节点覆盖
✅ **HTTPS 自动** - 自动配置 SSL 证书
✅ **自定义域名** - 支持绑定自己的域名

## 快速开始（5 分钟部署）

### 前提条件

1. 有一个 GitHub/GitLab/Bitbucket 账号
2. 拥有项目代码

### 方法一：通过 Vercel 网站部署（最简单）

#### 步骤 1：推送代码到 Git

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（以 GitHub 为例）
git remote add origin https://github.com/your-username/your-repo.git

# 推送代码
git branch -M main
git push -u origin main
```

#### 步骤 2：在 Vercel 导入项目

1. 访问 [Vercel](https://vercel.com)，使用 GitHub 账号登录
2. 点击 **"New Project"** 按钮
3. Vercel 会显示您的 GitHub 仓库列表
4. 找到您的项目仓库，点击 **"Import"**

#### 步骤 3：配置项目

Vercel 会自动检测这是一个 Next.js 项目，配置如下：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| **Framework Preset** | Next.js | 自动检测 |
| **Build Command** | `pnpm install && pnpm run build` | 构建命令 |
| **Output Directory** | `.next` | 输出目录 |
| **Install Command** | `pnpm install` | 安装依赖 |

**重要设置**：
- ✅ 勾选 "Include source files outside of the root directory"（如果需要）
- ✅ 在 "Environment Variables" 中添加需要的环境变量（如果有）

#### 步骤 4：部署

1. 点击 **"Deploy"** 按钮
2. 等待 2-3 分钟，Vercel 会自动构建和部署
3. 部署完成后，您会看到：
   - ✅ "Congratulations!" 成功提示
   - 🔗 一个自动生成的 URL，如：`https://your-project.vercel.app`

### 方法二：使用 Vercel CLI 部署

#### 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 登录 Vercel

```bash
vercel login
```

按照提示选择登录方式（GitHub、GitLab、Email）

#### 部署项目

```bash
# 在项目根目录执行
vercel
```

按照提示操作：
1. 选择链接到现有项目还是创建新项目
2. Vercel 会自动检测项目配置
3. 输入项目名称
4. 确认部署

#### 部署到生产环境

```bash
# 部署到生产环境（vercel.app 域名）
vercel --prod
```

## Vercel 域名和 URL

### 自动生成的域名

部署成功后，Vercel 会自动提供一个免费域名：

```
https://your-project-name.vercel.app
```

例如，如果您的项目名是 `time-station`，域名会是：
```
https://time-station.vercel.app
```

### 自定义域名（推荐）

#### 步骤 1：在 Vercel 添加域名

1. 进入项目 Dashboard
2. 点击 **Settings** -> **Domains**
3. 点击 **Add Domain**
4. 输入您的域名，如 `www.time-station.com`

#### 步骤 2：配置 DNS

Vercel 会显示需要配置的 DNS 记录：

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

去您的域名注册商（如阿里云、腾讯云）添加此 DNS 记录。

#### 步骤 3：验证

等待 DNS 生效（通常 5-30 分钟），Vercel 会自动配置 SSL 证书。

## 项目配置文件（可选）

### vercel.json

在项目根目录创建 `vercel.json`，可以自定义配置：

```json
{
  "buildCommand": "pnpm install && pnpm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["hkg1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.example.com"
  }
}
```

### 环境变量

在 Vercel Dashboard 设置环境变量：

1. 进入 **Settings** -> **Environment Variables**
2. 点击 **Add New**
3. 输入变量名和值
4. 选择环境（Development、Preview、Production）

## 常见问题

### 1. 构建失败

**原因**: 依赖版本问题或配置错误

**解决**:
- 查看 Vercel 构建日志
- 确保本地构建成功
- 检查 Node.js 版本（Vercel 默认 18.x）

### 2. 部署后图片不显示

**原因**: 图片域名未在 `next.config.js` 中配置

**解决**:
- 检查 `next.config.js` 中的 `remotePatterns`
- 确保图片 URL 在允许的域名列表中

### 3. 自定义域名无法访问

**原因**: DNS 配置错误或未生效

**解决**:
- 检查 DNS 记录是否正确
- 使用 `nslookup` 或 `dig` 检查 DNS 解析
- 等待 DNS 生效（最多 48 小时）

### 4. 如何回滚到之前版本？

**解决**:
1. 进入 Vercel Dashboard
2. 点击 **Deployments**
3. 找到之前的版本，点击右侧的三个点
4. 选择 **Promote to Production**

## Vercel 免费版限制

| 资源 | 免费版限制 |
|------|-----------|
| 带宽 | 100GB/月 |
| 构建时间 | 6,000 分钟/月 |
| 函数执行 | 100GB-Hrs/月 |
| 无服务器函数 | 100,000 次调用/月 |
| 团队成员 | 1 人 |

**说明**: 对于大多数小型项目，免费版完全够用！

## Vercel Pro 版（可选）

如果您需要更多资源：

- 💰 $20/月
- 🚀 1TB 带宽/月
- ⏱️ 10,000 分钟构建时间/月
- 👥 团队协作功能
- 🎯 优先支持

## Vercel 功能亮点

### 1. 预览部署

每次提交代码到 GitHub，Vercel 会自动创建一个预览部署，方便测试。

### 2. 边缘函数

在 Vercel Edge Network 上运行函数，延迟更低。

### 3. 分析和监控

查看访问量、性能指标、错误日志等。

### 4. 自动 HTTPS

所有部署（包括自定义域名）自动配置 SSL 证书。

## 总结

✅ **推荐**: Vercel 是部署 Next.js 项目的最佳选择
✅ **免费**: 个人版完全免费，功能强大
✅ **简单**: 5 分钟即可完成部署
✅ **可靠**: 全球 CDN，99.99% 可用性

## 下一步

1. 部署您的项目到 Vercel
2. 配置自定义域名
3. 设置环境变量
4. 享受全球加速的访问体验！

---

**需要帮助？**
- Vercel 官方文档: https://vercel.com/docs
- Vercel 社区: https://vercel.com/community
