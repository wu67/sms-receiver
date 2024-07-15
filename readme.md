# sms 转发

备用机短信转发后的接收服务. 基于 koajs + sqlite3.

#### sqlite3

```bash
# 在项目根目录创建数据
sqlite3 sms.db

# 初始化数据表
create table message(
   receive_time DATETIME primary key not null,
   content text,
   phone TEXT not null
);
```

#### password

只做了简单的密码校验. 在`/config.js` 里的 `smsPassword`, 最好设置长一点.


#### start


```bash
npm i

npm run start
```
