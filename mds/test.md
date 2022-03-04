# 前言

面试老是爱问，平时也就知道个大概，简单记录一下三次握手与四次挥手过程，顺便画个图加深记忆。

# TCP 头部

1. 1 位（bit），1 字节（byte），1 字节=8 位。
2. tcp 头部图示可以一行 32 位也就是 4 字节，固定头部 5 行共计 20 字节，选项最大可到 40 字节，也就是 tcp 头部最大 60 字节。
3. `SYN、ACK、FIN`是我们的标志位，标志位一个只占一位，一位只能表示是与否（1 和 0）。
4. 小写`seq`指的是我们的 32 位序号，`ack`指的是我们的 32 位确认号。

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/ae396b037af249a4b5e1f505f9d95a8b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Zyo5LiL5pyI5Lqu5pyJ5L2V6LS15bmy,size_16,color_FFFFFF,t_70,g_se,x_16)

# 三次握手

1. 客户端与服务端初始都处于 CLOSE 状态。
2. 大写的 SYN 和 ACK 都是 tcp 头部的标志位，值只有 0 和 1，图中都省略了=1，不等于 1 没有意义，在三次握手中 seq 序号是作为 SYN 的关联，因此我表示为 SYN（seq=x）比较好记，真正的表示可以写成`SYN=1，seq=x`，ACK（ack=x+1）同理，也就是`ACK=1，ack=x+1`。
3. 由服务端主动进入 LISETN 状态，然后`客户端向服务端发送SYN（req=x），第一次握手`，此时客户端处于 SYN_SEND 状态。
4. 服务端接收客户端发来的 SYN，`服务端向客户端发送自己的SYN（req=y）与表示已经接收到客户端发来的SYN的ACK（ack=x+1），第二次握手`，服务端进入 SYN_RECV 状态。
5. 客户端接收到服务端的 SYN 与 ACK，`客户端向服务端发送表示已经接收到服务端发来的ACK的ACK（ack=y+1），三次握手完成`，客户端进入 ESTABLISETEN 状态。
6. 服务端接收到最后的 ACK 之后也进入 ESTABLISTEN 状态。

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/3a2eb61af34f46a5b47fa57c21019e9c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Zyo5LiL5pyI5Lqu5pyJ5L2V6LS15bmy,size_13,color_FFFFFF,t_70,g_se,x_16)

# 四次挥手

1. 四次挥手过程可以参考三次握手简述。
2. 需要注意的是，四次挥手最后一次客户端发送 ACK 并没有直接进入 CLOSE 状态，而是等待 2MSL 再进入，为的是保证发送的 ACK 会成功发送到对方，因为关闭连接了，无法通过接收信息来保证，因此需要进行等待时间，MSL 是任何报文段被丢弃前在网络内的最长时间，设置 2 倍非常严谨安全。

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/9b843b71994f4aee87bcee29f3298a6d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Zyo5LiL5pyI5Lqu5pyJ5L2V6LS15bmy,size_12,color_FFFFFF,t_70,g_se,x_16)

# 为什么连接三次而挥手四次

- 因为服务端收到客户端返回 FIN 仅仅表示客户端不再发生数据，但是客户端还可以接收数据，而需不需要客户端关闭接收还需要服务端的上层应用决定，因此 FIN 与 ACK 不同时发送。服务端提前发送 ACK 防止客户端重复发送 FIN，然后再去询问上层是否向客户端发送应 FIN。
