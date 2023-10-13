### 介绍

这是一个模仿网易云的移动端项目，前端主要利用vue+vant+vuex技术，后端是利用了
[网易云NodeJS版API]: https://neteasecloudmusicapi.js.org/

，目前只是实现了推荐歌单、歌单播放、登录、歌手或音乐的搜索功能。

### 学习来源

https://www.bilibili.com/video/BV1c44y1g7ac/

### 结果展示

1. 推荐歌单

   ![image-20231013215318455](https://dong-image.oss-cn-guangzhou.aliyuncs.com/image/image-20231013215318455.png)

2. 音乐播放

   ![image-20231013215409637](https://dong-image.oss-cn-guangzhou.aliyuncs.com/image/image-20231013215409637.png)![image-20231013215432223](https://dong-image.oss-cn-guangzhou.aliyuncs.com/image/image-20231013215432223.png)

3. 搜索

   ![image-20231013215600032](https://dong-image.oss-cn-guangzhou.aliyuncs.com/image/image-20231013215600032.png)

### 注意

1. 网易云api可能会有跨域问题，在使用axios时要添加`withCredentials: true`。另外在发送请求的时也会出现"网络太拥挤，请稍候再试！"的情况，过一会在试一下就行。
2. 在登录时有邮箱登录和手机登录，如果是新的账号要在手机上登录网易云APP之后才能顺利登录。使用手机登录的密码可以在电脑上网易云官网进行修改密码之后再用手机和密码登录。
