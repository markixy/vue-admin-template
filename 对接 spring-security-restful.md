# 对接 spring-security-restful 相关改造
> 会话状态由 cookie-session 保持
> 响应通过 json 格式返回

1. 请求改成代理发出（解决跨域问题）
request.js 去掉 axios 的 `baseURL`；vue.config.js 配置代理 `devServer.proxy`；
2. 修改对接接口、接口路径、响应状态码
3. 修改 permission.js 中用户是否已登录的判定
