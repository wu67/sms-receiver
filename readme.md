# sms 转发

备用机短信转发后的接收服务. 基于 koajs + sqlite3.

配合[sms forwarder](https://github.com/pppscn/SmsForwarder)使用

#### sqlite3

```bash
# 在项目根目录创建数据
sqlite3 sms.db

# 初始化数据表
create table message(
   receive_time DATETIME primary key not null,
   content text,
   phone TEXT not null,
   from_phone TEXT not null
);
```

#### password

只做了简单的密码校验. 在`/config.js` 里的 `smsPassword`, 最好设置长一点.

#### ua
在`/config.js` 里的 `ua`. 随便自定义一个, 否则任何人都能访问你的验证码, 这不太安全.

#### start


```bash
npm i

npm run start
```

#### sms frowarder config

短信转发格式. 适用smsForwarder

```json
{
  "pwd": "your password here",
  "fromPhone": "[from]",
  "phone": "[card_slot]",
  "content": "[org_content]"
}
// 以下适用smsForwarder转发应用通知, 上面的是转发短信的格式. 通知大概率无法区分是卡1还是卡2的收信.
{
  "pwd": "your password here",
  "fromPhone": "[title]",
  "phone": "[device_mark]",
  "content": "[org_content]"
}
```

如果用MacroDroid监听短信通知. (部分机型可能读不出短信, 干脆读通知), 可以用这个格式.
```
{
 "pwd": "your password here",
 "fromPhone": "{not_title}",
 "phone": "通知读不到收信号码,随便输长度7以上",
 "content": "{notification}"
}
```
