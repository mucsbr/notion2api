# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

notion2api 是一个将 Notion AI 接口转换为 OpenAI 兼容 API 的轻量级代理服务。使用 Node.js 构建，无需完整浏览器环境，适合在资源受限环境（如 Termux）中运行。

## 常用命令

```bash
# 安装依赖
npm install

# 启动服务（轻量级版本，推荐）
npm start

# 开发模式（自动重启）
npm run dev

# Cookie 管理工具
npm run cookie
```

## 架构设计

### 核心文件

- `src/lightweight-client-express.js` - Express 服务入口，提供 OpenAI 兼容的 API 端点
- `src/lightweight-client.js` - Notion API 客户端核心，处理请求转换和流式响应
- `src/models.js` - 数据模型定义（OpenAI ↔ Notion 格式转换）
- `src/CookieManager.js` - Cookie 轮询管理，自动验证和切换无效 cookie
- `src/ProxyPool.js` - HTTP 代理池管理（可选）
- `src/ProxyServer.js` - TLS 代理服务器管理（启动平台特定的二进制）

### 请求流程

```
客户端请求 (OpenAI格式)
    ↓
lightweight-client-express.js (验证/路由)
    ↓
lightweight-client.js (buildNotionRequest → streamNotionResponse)
    ↓
Notion API (runInferenceTranscript)
    ↓
流式响应转换为 OpenAI SSE 格式
```

### API 端点

- `GET /v1/models` - 可用模型列表
- `POST /v1/chat/completions` - 聊天完成（支持流式）
- `GET /health` - 健康检查
- `GET /cookies/status` - Cookie 状态查询

### 模型映射

请求中的 model 参数直接传递给 Notion，支持：
- `openai-gpt-4.1`
- `anthropic-opus-4`
- `anthropic-sonnet-4`
- `anthropic-sonnet-3.x-stable`

## 环境变量配置

必需的环境变量在 `.env.example` 中定义。关键配置：

- `NOTION_COOKIE` - Notion cookie，多个用 `|` 分隔
- `COOKIE_FILE` - 或指定 cookie 文件路径
- `PROXY_AUTH_TOKEN` - API 认证 token
- `ENABLE_PROXY_SERVER` - 是否启用 TLS 代理服务器

## Cookie 管理机制

CookieManager 类实现了：
1. 启动时验证每个 cookie（调用 getSpaces API 获取 userId/spaceId）
2. 轮询使用多个有效 cookie
3. 自动标记 401 失效的 cookie 并切换
4. 支持从文件加载（txt/json 格式）

## 代理架构

两种代理模式：

1. **原生代理池**（`USE_NATIVE_PROXY_POOL=true`）：从外部服务获取代理并验证
2. **TLS 代理服务器**（`ENABLE_PROXY_SERVER=true`）：启动本地二进制代理服务器（推荐）

代理二进制文件在 `src/proxy/` 目录，支持 Windows/Linux/Android 平台。

## 代码风格

- ES Modules（`"type": "module"`）
- 使用 chalk 进行日志着色
- 类采用单例模式导出（如 `cookieManager`, `proxyPool`, `proxyServer`）
