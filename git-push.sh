#!/bin/bash

# 检查是否有保存的 token
if [ -f .github_token ]; then
    GITHUB_TOKEN=$(cat .github_token)
else
    echo "错误：找不到 .github_token 文件"
    echo "请先运行 ./save-token.sh 保存您的 GitHub Token"
    exit 1
fi

# 设置 Git 使用 token 认证
git remote set-url origin https://${GITHUB_TOKEN}@github.com/22ztpypthv-code/time-station.git

# 推送代码
echo "正在推送代码到 GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "1. Token 是否正确"
    echo "2. Token 是否有 'repo' 和 'workflow' 权限"
    echo "3. 网络连接是否正常"
    exit 1
fi
