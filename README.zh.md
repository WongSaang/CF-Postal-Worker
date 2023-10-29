# CF Postal Worker

这是一个 [Cloudflare Workers](https://workers.cloudflare.com/) 项目，借助 [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/)，使你可以通过调用 Worker 的 API 将信息发送到邮箱。不需要邮箱服务器和第三方邮件转发服务，不需要维护数据库，不需要开发后端。

适用场景：
- 你有一个静态web项目，不想开发后端和维护数据库，你可以将联系表单接入，直接把信息发送到你的邮箱。
- 其他需要将消息转发到邮箱的场景。

## 前提条件

- 一个 Cloudflare 账户
- 一个域名，可以在 Cloudflare 上注册一个最便宜的域名即可
- 如果通过命令行部署，需要本地安装 Node.js 环境

## 部署

1. 按照 [Enable Email Routing](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/) 的指引，打开 Email Routing。

2. 克隆/下载本项目

3. 将文件 wrangler.toml.example 重命名为 wrangler.toml，设置以下环境变量：
```toml
SENDER_ADDRESS = "sender@example.com" # 改成你在 Email Routing 中设置的邮箱地址一致
SENDER_NAME = "Sender" # 发件人名称
RECIPIENT_ADDRESS = "recipient@example.com" # 改成你的收件邮箱地址
ALLOWED_ORIGINS = "https://example.com" # 允许调用 API 的站点域名，多个域名用逗号分隔, "*" 表示允许所有域名。
```

4. 部署到 Cloudflare Workers
```bash
npm install
npm run deploy
```

## API

| 端点      | 方法 | 参数            | 描述                     |
|-----------|------|-----------------|--------------------------|
| /send | POST | - subject 邮件主题<br>- body 邮件内容，可以是 html 字符串 | 发送邮件|

## 感谢

- [Cloudflare](https://www.cloudflare.com/)
- [Hono](https://hono.dev/) ，本项目基于该框架开发

## 许可证

本项目基于 MIT 许可证分发。更多信息请参见 [LICENSE](LICENSE)。