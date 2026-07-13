# Lv.1 实践项目：静态网站自动部署到 GitHub Pages

这是 GitHub CI/CD 实践路线图的第一个项目。

## 项目内容

一个纯静态个人主页网站（HTML + CSS + JS），通过 GitHub Actions 自动部署到 GitHub Pages。

## 项目结构

```
static-site-demo/
├── index.html                 # 网站主页
├── style.css                  # 样式（支持暗色模式）
├── script.js                  # 交互（主题切换 + 打字机效果）
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions 工作流配置
└── README.md                  # 本文件
```

## 前置条件

1. 有一个 GitHub 账号
2. 本地安装了 git
3. 基本了解 git 操作（clone、add、commit、push）

## 步骤一：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名填 `static-site-demo`（或其他你喜欢的名字）
3. 选择 **Public**（GitHub Pages 免费版只支持公开仓库）
4. **不要**勾选 "Add a README file"（我们会手动推送）
5. 点击 Create repository

## 步骤二：克隆并添加文件

```bash
# 克隆你刚创建的空仓库
git clone https://github.com/<你的用户名>/static-site-demo.git
cd static-site-demo

# 把这个项目的所有文件复制进去
# （index.html, style.css, script.js, .github/workflows/deploy.yml）

# 添加所有文件到 git
git add .

# 提交
git commit -m "初始化静态网站 + GitHub Actions 工作流"

# 推送到 GitHub
git push origin main
```

## 步骤三：配置 GitHub Pages

推送代码后，还需要在仓库设置里启用 Pages：

1. 打开你的仓库页面
2. 点击 **Settings** → **Pages**
3. Source 选择 **GitHub Actions**（不是 "Deploy from a branch"）
4. 保存

> 注意：必须选 "GitHub Actions"，因为我们的工作流用的是新版 Pages API。
> 如果选了 "Deploy from a branch"，工作流会报错。

## 步骤四：查看 Actions 运行

1. 打开仓库页面，点击 **Actions** 标签页
2. 你会看到一个名为 "Deploy to GitHub Pages" 的工作流正在运行
3. 点击进去可以查看每个步骤的日志
4. 等两个 job（build + deploy）都显示绿色 ✓，说明部署成功

## 步骤五：访问你的网站

部署成功后，你的网站地址是：

```
https://<你的用户名>.github.io/static-site-demo/
```

也可以在 Actions 页面，点击最近一次运行的 deploy job，在 Summary 区域找到 `page_url`。

## 步骤六：验证自动部署

现在来验证「推送代码 → 自动更新」的闭环：

1. 修改 `index.html` 中的某段文字
2. 执行：
   ```bash
   git add .
   git commit -m "更新网站内容"
   git push origin main
   ```
3. 回到 Actions 页面，看到新的工作流自动触发
4. 等部署完成后，刷新网站页面，看到更新生效

## 常见问题

### Q: Actions 报错 "Permission denied"
A: 检查仓库 Settings → Actions → General，确保 workflow permissions 选择了 "Read and write permissions"。

### Q: 网站访问 404
A: 可能是 Pages 还没完全生效，等 1-2 分钟再试。确认 Settings → Pages 的 Source 选择了 "GitHub Actions"。

### Q: deploy job 报错
A: 确认 `deploy.yml` 中的 `permissions` 部分包含了 `pages: write` 和 `id-token: write`。

### Q: 想手动触发部署
A: 去 Actions 页面，选择工作流，点击 "Run workflow" 按钮。这就是 `workflow_dispatch` 的作用。

## 学到了什么

完成这个项目后，你掌握了：

- GitHub Actions 的基本结构（name、on、permissions、jobs）
- 触发器的配置（push + workflow_dispatch）
- 并发控制（concurrency）
- Job 之间的依赖（needs）
- Artifact 的概念和用法
- GitHub Pages 的部署流程
- 权限声明的重要性

下一步：可以尝试 Lv.2 项目，学习自动化测试和包发布。
