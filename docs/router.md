---
sidebar_position: 4
---

# 路由系统

此项目的路由系统我们分为两个部分，一个是页面路由，另一个则是API路由

## 页面路由
页面路由主要是指前端展示部分，由于前端使用的是Nextjs框架，可以直接使用它自身支持的文件路由系统。   

Nextjs有一个基于文件系统的路由器，构建在页面概念之上。   

将文件添加到`pages`目录后，它会自动作为路由使用。   

`pages`目录中的文件可用于定义最常见的模式。   

### 索引路由
路由器会自动将名为`index`的文件路由到目录的根目录。

  - `pages/index.tsx` -> `/`
  - `pages/blog/index.tsx` -> `/blog`


### 嵌套路由
路由器支持嵌套文件。如果您创建前提文件夹结构，文件仍将以相同的方式自动路由。
  - `pages/blog/first-post.tsx` -> `/blog/first-post`
  - `pages/dashboard/setting/username.tsx` -> `/dashboard/setting/username`

### 动态路由
要匹配动态字段，可以使用括号语法。这允许您匹配命名参数。
  - `pages/blog/[slug].tsx` -> `/blog/:slug`(`/blog/hello-world`)
  - `pages/[username]/setting.tsx` -> `/:username/settings`(`foo/settings`)
  - `pages/post/[...all].tsx` -> `/post/*`(`post/2023/id/title`)

## 页面链接

Nextjs路由器允许您在页面之间进行客户端路由转换，类似于单页面应用程序。

提供了一个名为`Link`的React组件来执行此客户端路由转换。

### 静态链接

``` bash
import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
      </ul>
    </>
  )
}


export default Home
```

上面的示例使用多个链接。每个都将路径(`href`)映射到已知页面：

  - `/` -> `pages/index.tsx`
  - `about` -> `pages/about`
  - `blog` -> `pages/blog` 

以上是对于使用静态路由生成的页面，可以直接使用固定的路由地址，然后在服务端预渲染出对应的内容。

### 动态链接
您还可以使用ES6中提供的字符串模版的方式来创建路由，这对于动态路由非常有用。例如，要显示已作为prop传递给组件的帖子列表：

``` bash
import React from 'react'
import Link from 'next/link'

const Posts = ({ post }) => {
  return (
    <>
      <ul>
        {
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default Posts

```

`encodeURIComponent` 在示例中使用以保持路由utf-8兼容。

或者，使用URL对象：

``` bash
import React from 'react'
import Link from 'next/link'

const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts

```

现在，我们不在乎使用字符串模版来创建路由，而是在`href`中使用URL对象，其中：
  - `pathname`是`pages`目录中页面的名称。在本例中为`/blog/[slug]`。
  - `query`是具有动态字段的对象。在本例中为`[slug]`


## API路由

由于此项目使用的是Nestjs作为node层来转接前端的接口请求，因此需要了解一下API路由相关的配置。   

以登录接口为例，在前端`store/asyncThunk/config.ts`文件中，定义了下面形式的接口

``` bash
 login: {
    method: "post",
    url: "/apis/login"
 }

```
可以看到，登录接口的路由为`apis/login`，方法为post。这个接口请求在前端发起后，会由node层进行转发:

在node层代码中，`models/view/view.controller.ts`中有以下代码：

``` bash
  @Get('login')
  @ApiTags('Login')
  @ApiResponse({ status: 200, description: '登录页' })
  public async showLogin(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

```

上述代码会对登录页的页面请求进行转发，返回服务端渲染的内容在客户端进行基本的渲染。然后接口层面则是对应

到`models/login/login.controller.ts`中的代码片段来拦截登录的接口请求：

``` bash
export class LoginController {
  constructor(private readonly loginService: LoginService ) {}

  @Post()
  async login(@Body() body: any, @Headers() headers) { 
    return this.loginService.login(body);
  }
}

```

具体的服务处理逻辑则是在`models/login/login.service.ts`中，
``` bash
@Injectable()
export class LoginService {
  async login(body: any) {
    const { username, password } = body
    const params = {
      username,
      password,
      rememberMe: false
    }
    const res = await axios.post(`${baseApi}/login`, params)

    // 获取token的值
    const token = res.headers['ltpatoken']
    Global.token = token
    return res.data
  }
}

```

## 小结
上面就是此项目中涉及到页面路由和API路由的内容，可以根据此来进行灵活的配置，来快速的实现业务的开发。