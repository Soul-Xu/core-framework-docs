---
sidebar_position: 5
---

# 网络请求

在构建应用的过程中，除了页面本身的渲染交互逻辑之外，最重要的就是网络请求了。   

客户端通过网络请求从服务端获取数据，然后在页面进行渲染，以及客户端输入原始数据返回给服务端进行存储，

都需要通过网络请求来实现。

## 请求方式
在本项目中主要支持两种请求方式：axios和redux toolkit

### axios
以登录接口为例，传统的axios方式代码如下：

``` bash
  // axios原生方式
  await axios.request({
    url: `${baseApi}/login`,
    method: "post",
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((res: any) => {
    // todo
  }).catch((err: any) => {

  })
```

### redux-toolkit
另一种方式则是redux-toolkit，这是redux的一款第三方工具库，可以简化redux的操作。

``` bash
  // redux-toolkit方式
  const res = await dispatchRedux(asyncThunk.login(params) as any);
```

并且在asnycThunkMap的配置文件中新建登录接口的索引。
``` bash
  const asyncThunkMap: Record<string, AsyncThunkValue> = {
    login: {
      method: "post",
      url: "/apis/login"
    }
  }

  export type AsyncThunkMap =
  | "login" 
```

从上面代码可以看到，使用redux-toolkit方式会更加简洁高效，这样开发人员可以更专注于接口返回的数据处理。


### 小结
网络请求方式分为axios和redux-toolkit，推荐使用redux-toolkit方式，可以大幅度提高开发效率。