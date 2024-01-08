# 微前端介绍

## 定义

微前端是一种软件架构模式，旨在将前端单体应用拆分为更小的、可独立开发、测试、部署和扩展的微服务。这样的架构使得多个团队可以同时工作，每个团队专注于特定的业务领域，提高开发和部署的灵活性。

## 技术

微前端的实现通常依赖于以下关键技术：

1. **模块化开发**：使用模块化的前端框架（如Webpack Module Federation、SystemJS等）来拆分前端应用为独立的模块。

2. **组件化**：采用组件化开发方式，将前端应用拆分为可复用、独立的组件。

3. **跨团队协作**：使用标准化的接口和协议，确保不同团队的微前端模块可以协同工作。

4. **共享状态管理**：使用状态管理工具，确保微前端之间的状态共享和同步（如Redux、Vuex等）。

5. **独立部署**：每个微前端模块都可以独立构建和部署，不影响整体系统的稳定性。

## 优缺点

### 优点

1. **团队独立开发**：不同团队可以独立开发和部署各自的微前端模块，提高开发效率。

2. **系统拓展性**：支持系统的渐进式升级和拓展，新功能的引入不会影响整体系统的稳定性。

3. **技术栈灵活性**：各个微前端模块可以使用不同的技术栈，适应团队的技术选型。

4. **快速迭代**：独立部署和快速迭代，有助于更快地响应业务需求。

### 缺点

1. **复杂性增加**：微前端引入了更多的复杂性，需要谨慎设计和管理模块之间的依赖关系。

2. **性能开销**：微前端模块的动态加载和通信可能引入一些性能开销，需要优化处理。

3. **一致性难题**：确保不同微前端模块的一致性可能需要额外的工作，特别是在涉及共享状态和样式时。

## 服务端架构

微前端的服务端架构与传统的前后端分离架构类似，采用API网关、微服务架构等来支持前端模块的调用和数据获取。服务端架构的关键点包括：

1. **API网关**：负责接收前端模块的请求，转发到相应的微服务。

2. **微服务**：提供业务功能的独立服务，每个微服务对应一个或多个前端模块。

3. **认证与授权**：确保前端模块能够安全地调用后端服务，采用适当的认证和授权机制。

4. **数据管理**：微前端模块可能需要获取不同微服务的数据，需要合理管理数据的获取和传递。

## 微前端实现方案

### 样式隔离

在微前端中，样式隔离是重要的考虑因素，以避免不同模块之间的样式冲突。一些实现方案包括：

- **CSS Modules**：使用CSS Modules确保每个模块的样式只在本模块内部生效。

- **Shadow DOM**：通过Shadow DOM创建一个封闭的DOM树，确保样式和DOM的隔离。

### 路由系统

微前端中的路由系统需要考虑模块之间的协同工作。一些实现方案包括：

- **主应用控制路由**：主应用负责控制整体的路由，子应用通过事件或其他机制通知主应用切换路由。

- **组合式路由**：每个微前端模块自己管理自己的路由，主应用根据需要组合各个模块的路由。

### JS沙箱

为了确保微前端模块的相互隔离，需要使用JS沙箱。一些实现方案包括：

- **沙箱库**：使用像qiankun等微前端框架提供的沙箱库，确保每个模块在自己的沙箱中运行。

- **IFrame**：使用IFrame作为沙箱，确保每个模块在独立的环境中执行。

### 前后端通信

微前端模块之间的通信需要进行有效的管理。一些实现方案包括：

- **自定义事件**：使用自定义事件来进行模块间的通信，确保解耦合适。

- **全局状态管理**：使用全局状态管理工具，确保状态共享的可控性和一致性。

## 现有实现方案

目前有多种实现微前端的方案，其中一些较为知名的包括：

1. **Single SPA**：一个用于构建支持多个框架的微前端架构的JavaScript库。

2. **Webpack Module Federation**：Webpack的一个插件，允许不同代码库之间共享模块。

3. **qiankun**：一个基于single-spa的微前端实现库，由阿里巴巴出品，蚂蚁金服推出的微前端框架，建立在single spa之上，提供更多功能和支持。

4. **web component**：基座为中心，子应用以web component的方式接入到基座当中。

## 框架中的实现方案
在该项目中以web component作为解决方案，选用[micro-app](https://micro-zoe.github.io/micro-app/)为框架进行实现。

### 具体代码
``` bash
项目根目录
npm install @micro-zoe/micro-app

_app.jsx中
import microApp from '@micro-zoe/micro-app'

useEffect(() => {
  // 初始化micro-app
  microApp.start()
}, [])

具体需要加载子应用的位置
import microApp from '@micro-zoe/micro-app'

// 以vue2子项目为例
<micro-app name='vue2-app' url='http://localhost:8080/' />

```

### 生命周期
- created <micro-app />标签初始化后，加载资源前触发。   
- beforemount 加载资源完成后，开始渲染之前触发。   
- mounted 子应用渲染结束后触发。   
- unmount 子应用卸载时触发。   
- error 子应用渲染出错时触发，只有会导致渲染终止的错误才会触发此生命周期。   

监听生命周期   
1.React
因为React不支持自定义事件，所以我们需要引入一个polyfill。
在<micro-app/>标签所在的文件顶部添加polyfill，注释也要复制。
``` bash
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
```

开始使用
``` bash
<micro-app
  name='xx'
  url='xx'
  onCreated={() => console.log('micro-app元素被创建')}
  onBeforemount={() => console.log('即将被渲染')}
  onMounted={() => console.log('已经渲染完成')}
  onUnmount={() => console.log('已经卸载')}
  onError={() => console.log('渲染出错')}
/>
```

2.Vue
vue中监听方式和普通事件一致。
``` bash
<template>
  <micro-app
    name='xx'
    url='xx'
    @created='created'
    @beforemount='beforemount'
    @mounted='mounted'
    @unmount='unmount'
    @error='error'
  />
</template>

<script>
export default {
  methods: {
    created () {
      console.log('micro-app元素被创建')
    },
    beforemount () {
      console.log('即将被渲染')
    },
    mounted () {
      console.log('已经渲染完成')
    },
    unmount () {
      console.log('已经卸载')
    },
    error () {
      console.log('渲染出错')
    }
  }
}
</script>
```

3.自定义
我们可以手动监听生命周期事件。
``` bash
const myApp = document.querySelector('micro-app[name=my-app]')

myApp.addEventListener('created', () => {
  console.log('created')
})

myApp.addEventListener('beforemount', () => {
  console.log('beforemount')
})

myApp.addEventListener('mounted', () => {
  console.log('mounted')
})

myApp.addEventListener('unmount', () => {
  console.log('unmount')
})

myApp.addEventListener('error', () => {
  console.log('error')
})
```

4.全局监听
全局监听会在每个应用的生命周期执行时都会触发。
``` bash
import microApp from '@micro-zoe/micro-app'

microApp.start({
  lifeCycles: {
    created (e) {
      console.log('created')
    },
    beforemount (e) {
      console.log('beforemount')
    },
    mounted (e) {
      console.log('mounted')
    },
    unmount (e) {
      console.log('unmount')
    },
    error (e) {
      console.log('error')
    }
  }
})
```

### 数据通信
- 子应用获取来自主应用的数据   
  1.直接获取数据    
  2.绑定监听函数
- 子应用向主应用发送数据
- 主应用向子应用发送数据    
  1.通过data属性发送数据   
  2.手动发送数据
- 主应用获取来自子应用的数据
- 清空数据
- 全局数据通信
- 关闭沙箱后的通信方式

### 其他特性
其他特性包括JS沙箱，样式隔离，元素隔离，预加载，多层嵌套等。具体可以在[micro-app](https://micro-zoe.github.io/micro-app/)中进行详细查看。

## 参考资料

- [Micro Frontends](https://micro-frontends.org/)
- [Micro Frontends in Action](https://www.manning.com/books/micro-frontends-in-action)

以上是一个详细的微前端介绍，你可以根据具体需求和项目情况进一步深入研究。
