---
sidebar_position: 2
---

# 技术选型

进入到我们的 **基础开发框架**.

### 设计思路

该基础开发框架主要应用于金融行业的系统搭建场景，强调稳定性，适配多端场景，能快速响应大量的数据。为此，我们选择采用SSR的方式来进行渲染，主要涉及到的底层框架为React，封装框架为Nextjs和Nestjs。

### SSR

- CSR：SPA单页面应用优秀的用户体验。页面整体式由javascript渲染出来，称之为客户端渲染CSR，主流的前端框架React、Vue都是采用的CSR

- SPA缺点：   
  -- 1. 首页渲染时间较长，必须等待javascript完全加载，并且执行完毕，页面首页才能渲染出来，   
  -- 2. SEO不太友好，爬虫只能拿到一个div元素，认为页面是空的，不利于SEO

- SSR：可以很好的解决SPA首页渲染白屏和SEO不太友好的缺点。具体渲染过程为，客户端发送URL请求到服务端，服务端读取对应url的模版信息，在服务端做出html和数据的渲染，渲染完成之后

## Nextjs

在Nextjs的**官网(https://www.nextjs.cn/)** 中我们可以看到，这是一个用于生产环境的React框架，它为生产环境提供了所需的所有功能以及最佳的开发体验：包括静态及服务端融合渲染、支持Typescript、智能化打包、路由预取等功能，无需任何配置

## Nestjs

在Nestjs的**官网(https://nestjs.bootcss.com/)** 中可以看到，Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。它利用 JavaScript 的渐进增强的能力，使用并完全支持 TypeScript （仍然允许开发者使用纯 JavaScript 进行开发），并结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。    

在底层，Nest 构建在强大的 HTTP 服务器框架上，例如 Express （默认），并且还可以通过配置从而使用 Fastify ！   

Nest 在这些常见的 Node.js 框架 (Express/Fastify) 之上提高了一个抽象级别，但仍然向开发者直接暴露了底层框架的 API。这使得开发者可以自由地使用适用于底层平台的无数的第三方模块。

## 小结

整个框架选用Nextjs, Nestjs的基础框架来进行构建，主要是考虑到全栈形式以及前后端分离的思想。   

- 在前端部分，我们采用的是Nextjs来开发，它可以很好的支持SSR服务端渲染，能提供优秀的首页渲染效果，并且很好的支持SEO，适用于具体的业务场景，前端的宗旨在于主要负责页面的渲染和交互方面，所有的数据源直接使用后端提供的数据就好。

- 在后端部分，我们采用的是Nestjs来开发，Nestjs的MVC开发模式，有点类似于Java的spring体系框架，这对于后端开发同学很友好，而且MVC模式和React的MVVC模式也是类似的，对于纯前端同学接触也是很容易上手的。   

选择接入node层来对接服务端原始接口的原因在于，该基础框架在未来的数据量以及适配端的不同，对于数据结构的要求会比较高，最佳的情况是由前端根据自身的渲染要求，自己去做数据处理，所以nestjs提供的node层给了前端开发一个很好的场所。

