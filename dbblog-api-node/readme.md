## 小程序后台服务

#### 大体架构
> **nodejs服务**：nosql存储；mongo和redis作为存储db

> **并发性**：根据服务器cpu数量启动对应数量的nodejs进程。达到瓶颈再使用nginx+分布式部署方式解决，并提高mongo和redis的性能，部署集群

#### 接口安全
>  除get和delete请求外，所有接口的调用采用加密传输(可配置)
