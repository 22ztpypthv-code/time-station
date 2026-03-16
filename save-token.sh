#!/bin/bash

echo "================================================"
echo "  保存 GitHub Token"
echo "================================================"
echo ""
echo "请按照以下步骤操作："
echo ""
echo "1. 访问：https://github.com/settings/tokens"
echo "2. 点击 'Generate new token' -> 'Generate new token (classic)'"
echo "3. 填写信息："
echo "   - Note: time-station-deploy"
echo "   - Expiration: 30 days"
echo "4. 勾选权限："
echo "   - ✅ repo"
echo "   - ✅ workflow"
echo "5. 点击 'Generate token'"
echo "6. 复制生成的 token（格式：ghp_xxxxxxxxxxxxxxxx）"
echo ""
echo "================================================"
echo ""

read -p "请粘贴您的 GitHub Token: " GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Token 不能为空"
    exit 1
fi

# 保存 token 到文件（隐藏文件，不会被提交到 Git）
echo "$GITHUB_TOKEN" > .github_token
chmod 600 .github_token

# 添加到 .gitignore 以防止被提交
if ! grep -q "^\.github_token$" .gitignore; then
    echo ".github_token" >> .gitignore
fi

echo ""
echo "✅ Token 已保存到 .github_token"
echo ""
echo "现在可以运行 ./git-push.sh 推送代码"
