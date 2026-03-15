#!/bin/bash
echo "================================================"
echo "  GitHub Token 推送脚本"
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
echo "现在，请粘贴您的 GitHub Token："
read -s -p "Token: " TOKEN
echo ""
echo ""
echo "正在推送代码到 GitHub..."
echo ""

git push https://${TOKEN}@github.com/22ztpypthv-code/time-station.git main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "请访问您的 GitHub 仓库查看："
    echo "https://github.com/22ztpypthv-code/time-station"
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "1. Token 是否正确"
    echo "2. Token 是否有 'repo' 和 'workflow' 权限"
    echo "3. 网络连接是否正常"
fi

echo ""
echo "================================================"
