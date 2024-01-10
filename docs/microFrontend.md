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

**子应用在webpack-dev-server的headers中设置跨域支持。**

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
主应用和子应用之间的通信是绑定的，主应用只能向指定的子应用发送数据，子应用只能向主应用发送数据，这种方式可以有效的避免数据污染，防止多个子应用之间相互影响。   

同时我们也提供了全局通信，方便跨应用之间的数据通信。    

#### 一、子应用获取来自主应用的数据     
有两种方式获取来自主应用的数据:

**1.直接获取数据**     

``` bash
const data = window.microApp.getData() // 返回主应用下发的data数据
```    

**2.绑定监听函数**   
``` bash
/**
 * 绑定监听函数，监听函数只有在数据变化时才会触发
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
 * !!!重要说明: 因为子应用是异步渲染的，而主应用发送数据是同步的，
 * 如果在子应用渲染结束前主应用发送数据，则在绑定监听函数前数据已经发送，在初始化后不会触发绑定函数，
 * 但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。
 */
window.microApp.addDataListener(dataListener: (data: Object) => any, autoTrigger?: boolean)

// 解绑监听函数
window.microApp.removeDataListener(dataListener: (data: Object) => any)

// 清空当前子应用的所有绑定函数(全局数据函数除外)
window.microApp.clearDataListener()
```
**使用方式**   
``` bash
// 监听函数
function dataListener (data) {
  console.log('来自主应用的数据', data)
}

// 监听数据变化
window.microApp.addDataListener(dataListener)

// 监听数据变化，初始化时如果有数据则主动触发一次
window.microApp.addDataListener(dataListener, true)

// 解绑监听函数
window.microApp.removeDataListener(dataListener)

// 清空当前子应用的所有绑定函数(全局数据函数除外)
window.microApp.clearDataListener()
```

#### 二、子应用向主应用发送数据  
``` bash
// dispatch只接受对象作为参数
window.microApp.dispatch({type: '子应用发送给主应用的数据'})
```
**dispatch只接受对象作为参数，它发送的数据都会被缓存下来。**

micro-app会遍历新旧值中的每个key判断值是否有变化，如果所有数据都相同则不会发送（注意：只会遍历第一层key），如果数据有变化则将新旧值进行合并后发送。   

例如：
``` bash
// 第一次发送数据，记入缓存值 {name: 'jack'}，然后发送 
window.microApp.dispatch({name: 'jack'})
```

``` bash
// 第二次发送数据，将新旧值合并为 {name: 'jack', age: 20}，记入缓存值，然后发送 
window.microApp.dispatch({age: 20})
```

``` bash
// 第三次发送数据，新旧值合并为 {name: 'jack', age: 20}，与缓存值相同，不再发送
window.microApp.dispatch({age: 20})
```

**dispatch是异步执行的，多个dispatch会在下一帧合并为一次执行**    
例如：
``` bash
window.microApp.dispatch({name: 'jack'})
window.microApp.dispatch({age: 20})

// 上面的数据会在下一帧合并为对象{name: 'jack', age: 20}一次性发送给主应用
```

**dispatch第二个参数为回调函数，它会在数据发送结束后执行**       
例如：
``` bash
window.microApp.dispatch({city: 'HK'}, () => {
  console.log('数据已经发送完成')
})
```

**当数据监听函数有返回值时，会作为dispatch回调函数的入参**    
例如：   
主应用
``` bash
import microApp from '@micro-zoe/micro-app'

microApp.addDataListener('my-app', (data) => {
  console.log('来自子应用my-app的数据', data)

  return '返回值1'
})

microApp.addDataListener('my-app', (data) => {
  console.log('来自子应用my-app的数据', data)

  return '返回值2'
})
```

子应用    
``` bash
// 返回值会放入数组中传递给dispatch的回调函数
window.microApp.dispatch({city: 'HK'}, (res: any[]) => {
  console.log(res) // ['返回值1', '返回值2']
})

```

**forceDispatch：强制发送**
forceDispatch方法拥有和dispatch一样的参数和行为，唯一不同的是forceDispatch会强制发送数据，无论数据是否变化。   

例如：
``` bash
// 强制发送数据，无论缓存中是否已经存在 name: 'jack' 的值
window.microApp.forceDispatch({name: 'jack'}, () => {
  console.log('数据已经发送完成')
})
```

#### 三、主应用向子应用发送数据  
主应用向子应用发送数据有两种方式：

  **1.通过data属性发送数据**   
  在React中：  
在React中我们需要引入一个polyfill。
在<micro-app />元素所在的文件顶部添加polyfill(注释也要复制)。
``` bash
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
```

  开始使用      
``` bash
<micro-app
  name='my-app'
  url='xx'
  data={this.state.dataForChild} // data只接受对象类型，采用严格对比(===)，当传入新的data对象时会重新发送
/>
```

  在Vue中     
vue中和绑定普通属性方式一致。   
``` bash
<template>
  <micro-app
    name='my-app'
    url='xx'
    :data='dataForChild' // data只接受对象类型，数据变化时会重新发送
  />
</template>

<script>
export default {
  data () {
    return {
      dataForChild: {type: '发送给子应用的数据'}
    }
  }
}
</script>
```

  **2.手动发送数据**   
  手动发送数据需要通过name指定接受数据的子应用，此值和<micro-app />元素中的name一致。   
``` bash
import microApp from '@micro-zoe/micro-app'

// 发送数据给子应用 my-app，setData第二个参数只接受对象类型
microApp.setData('my-app', {type: '新的数据'})
```

setData第一个参数为子应用名称，第二个参数为传递的数据，它发送的数据都会被缓存下来。   
micro-app会遍历新旧值中的每个key判断值是否有变化，如果所有数据都相同则不会发送（注意：只会遍历第一层key），如果数据有变化则将新旧值进行合并后发送。   
例如：    
``` bash
// 第一次发送数据，记入缓存值 {name: 'jack'}，然后发送 
microApp.setData('my-app', {name: 'jack'})
```

``` bash
// 第二次发送数据，将新旧值合并为 {name: 'jack', age: 20}，记入缓存值，然后发送 
microApp.setData('my-app', {age: 20})
```

``` bash
// 第三次发送数据，新旧值合并为 {name: 'jack', age: 20}，与缓存值相同，不再发送
microApp.setData('my-app', {age: 20})
```

**setData是异步执行的，多个setData会在下一帧合并为一次执行**    
例如：
``` bash
microApp.setData('my-app', {name: 'jack'})
microApp.setData('my-app', {age: 20})

// 上面的数据会在下一帧合并为对象{name: 'jack', age: 20}一次性发送给子应用my-app
```

**setData第三个参数为回调函数，它会在数据发送结束后执行**  
例如：     
``` bash
microApp.setData('my-app', {city: 'HK'}, () => {
  console.log('数据已经发送完成')
})
```

**当数据监听函数有返回值时，会作为setData回调函数的入参**   
例如：    
子应用：
``` bash   
window.microApp.addDataListener((data) => {
  console.log('来自主应用的数据', data)

  return '返回值1'
})

window.microApp.addDataListener((data) => {
  console.log('来自主应用的数据', data)

  return '返回值2'
})
```

主应用：
``` bash   
// 返回值会放入数组中传递给setData的回调函数
microApp.setData('my-app', {city: 'HK'}, (res: any[]) => {
  console.log(res) // ['返回值1', '返回值2']
})
```

**forceSetData：强制发送**    
forceSetData方法拥有和setData一样的参数和行为，唯一不同的是forceSetData会强制发送数据，无论数据是否变化。    
例如： 
``` bash   
// 强制发送数据，无论缓存中是否已经存在 name: 'jack' 的值
microApp.forceSetData('my-app', {name: 'jack'}, () => {
  console.log('数据已经发送完成')
})
```

#### 四、主应用获取来自子应用的数据    
主应用获取来自子应用的数据有三种方式：    
**1.直接获取数据**    
``` bash   
import microApp from '@micro-zoe/micro-app'

const childData = microApp.getData(appName) // 返回子应用的data数据
```

**监听自定义事件 (datachange)**   
在React中       
在React中我们需要引入一个polyfill。    
在<micro-app/>元素所在的文件顶部添加polyfill(注释也要复制)。
``` bash   
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
```

开始使用    
``` bash   
<micro-app
  name='my-app'
  url='xx'
  // 数据在event.detail.data字段中，子应用每次发送数据都会触发datachange
  onDataChange={(e) => console.log('来自子应用的数据：', e.detail.data)}
/>
```

在Vue中    
vue中监听方式和普通事件一致。    
``` bash   
<template>
  <micro-app
    name='my-app'
    url='xx'
    // 数据在事件对象的detail.data字段中，子应用每次发送数据都会触发datachange
    @datachange='handleDataChange'
  />
</template>

<script>
export default {
  methods: {
    handleDataChange (e) {
      console.log('来自子应用的数据：', e.detail.data)
    }
  }
}
</script>
```

注意：datachange绑定函数的返回值不会作为子应用dispatch回调函数的入参，它的返回值没有任何作用。    

**3.绑定监听函数**      
绑定监听函数需要通过name指定子应用，此值和<micro-app/>元素中的name一致。      
``` bash   
import microApp from '@micro-zoe/micro-app'

/**
 * 绑定监听函数
 * appName: 应用名称
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
 */
microApp.addDataListener(appName: string, dataListener: (data: Object) => any, autoTrigger?: boolean)

// 解绑监听指定子应用的函数
microApp.removeDataListener(appName: string, dataListener: (data: Object) => any)

// 清空所有监听指定子应用的函数
microApp.clearDataListener(appName: string)
```

使用方式：   
``` bash   
import microApp from '@micro-zoe/micro-app'

// 监听函数
function dataListener (data) {
  console.log('来自子应用my-app的数据', data)
}

// 监听来自子应用my-app的数据
microApp.addDataListener('my-app', dataListener)

// 解绑监听my-app子应用的函数
microApp.removeDataListener('my-app', dataListener)

// 清空所有监听my-app子应用的函数
microApp.clearDataListener('my-app')
```

#### 五、清空数据    
由于通信的数据会被缓存，即便子应用被卸载也不会清空，这可能会导致一些困扰，此时可以主动清空缓存数据来解决。

在主应用中  
**方式一：配置项 - clear-data**    
使用方式: <micro-app clear-data></micro-app>
当设置了clear-data，子应用卸载时会同时清空主应用发送给当前子应用，和当前子应用发送给主应用的数据。

destroy也有同样的效果。 

**方式二：手动清空 - clearData**    
``` bash
import microApp from '@micro-zoe/micro-app'

// 清空主应用发送给子应用 my-app 的数据
microApp.clearData('my-app')
```

#### 六、全局数据通信 
全局数据通信会向主应用和所有子应用发送数据，在跨应用通信的场景中适用。      
**1.发送全局数据**  
在主应用中：   
``` bash
import microApp from '@micro-zoe/micro-app'

// setGlobalData只接受对象作为参数
microApp.setGlobalData({type: '全局数据'})
```

在子应用中：    
``` bash
// setGlobalData只接受对象作为参数
window.microApp.setGlobalData({type: '全局数据'})
``` 
setGlobalData只接受对象作为参数，它发送的数据都会被缓存下来。     
micro-app会遍历新旧值中的每个key判断值是否有变化，如果所有数据都相同则不会发送（注意：只会遍历第一层key），如果数据有变化则将新旧值进行合并后发送。    
例如：   
在主应用中：   
``` bash
// 第一次发送数据，记入缓存值 {name: 'jack'}，然后发送 
microApp.setGlobalData({name: 'jack'})
``` 

``` bash
// 第二次发送数据，将新旧值合并为 {name: 'jack', age: 20}，记入缓存值，然后发送 
microApp.setGlobalData({age: 20})
``` 

``` bash
// 第三次发送数据，新旧值合并为 {name: 'jack', age: 20}，与缓存值相同，不再发送
microApp.setGlobalData({age: 20})
``` 

在子应用中：   
``` bash
// 第一次发送数据，记入缓存值 {name: 'jack'}，然后发送 
window.microApp.setGlobalData({name: 'jack'})
``` 

``` bash
// 第二次发送数据，将新旧值合并为 {name: 'jack', age: 20}，记入缓存值，然后发送 
window.microApp.setGlobalData({age: 20})
``` 

``` bash
// 第三次发送数据，新旧值合并为 {name: 'jack', age: 20}，与缓存值相同，不再发送
window.microApp.setGlobalData({age: 20})
``` 

**setGlobalData是异步执行的，多个setGlobalData会在下一帧合并为一次执行**    
例如：   
在主应用中：  
``` bash
microApp.setGlobalData({name: 'jack'})
microApp.setGlobalData({age: 20})

// 上面的数据会在下一帧合并为对象{name: 'jack', age: 20}一次性发送给主应用
``` 

在子应用中：   
``` bash
window.microApp.setGlobalData({name: 'jack'})
window.microApp.setGlobalData({age: 20})

// 上面的数据会在下一帧合并为对象{name: 'jack', age: 20}一次性发送给主应用
``` 

**setGlobalData第二个参数为回调函数，它会在数据发送结束后执行**    
例如：   
在主应用中：  
``` bash
microApp.setGlobalData({city: 'HK'}, () => {
  console.log('数据已经发送完成')
})
``` 

在子应用中：   
``` bash
window.microApp.setGlobalData({city: 'HK'}, () => {
  console.log('数据已经发送完成')
})
``` 

**当全局数据的监听函数有返回值时，会作为setGlobalData回调函数的入参**    
例如：   
在主应用中：  
``` bash
microApp.addGlobalDataListener((data) => {
  console.log('全局数据', data)

  return '返回值1'
})

microApp.addGlobalDataListener((data) => {
  console.log('全局数据', data)

  return '返回值2'
})
``` 

``` bash
// 返回值会放入数组中传递给setGlobalData的回调函数
microApp.setGlobalData({city: 'HK'}, (res: any[]) => {
  console.log(res) // ['返回值1', '返回值2']
})
``` 

在子应用中：   
``` bash
window.microApp.addGlobalDataListener((data) => {
  console.log('全局数据', data)

  return '返回值1'
})

window.microApp.addGlobalDataListener((data) => {
  console.log('全局数据', data)

  return '返回值2'
})
```

``` bash
// 返回值会放入数组中传递给setGlobalData的回调函数
window.microApp.setGlobalData({city: 'HK'}, (res: any[]) => {
  console.log(res) // ['返回值1', '返回值2']
})
``` 

**forceSetGlobalData：强制发送**    
forceSetGlobalData方法拥有和setGlobalData一样的参数和行为，唯一不同的是forceSetGlobalData会强制发送数据，无论数据是否变化。    

例如：   
在主应用中：  
``` bash
// 强制发送数据，无论缓存中是否已经存在 name: 'jack' 的值
microApp.forceSetGlobalData({name: 'jack'}, () => {
  console.log('数据已经发送完成')
})
```    

在子应用中：   
``` bash
// 强制发送数据，无论缓存中是否已经存在 name: 'jack' 的值
window.microApp.forceSetGlobalData({name: 'jack'}, () => {
  console.log('数据已经发送完成')
})
```

**获取全局数据**     
在主应用中：  
``` bash
import microApp from '@micro-zoe/micro-app'

// 直接获取数据
const globalData = microApp.getGlobalData() // 返回全局数据

function dataListener (data) {
  console.log('全局数据', data)
}

/**
 * 绑定监听函数
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
 */
microApp.addGlobalDataListener(dataListener: (data: Object) => any, autoTrigger?: boolean)

// 解绑监听函数
microApp.removeGlobalDataListener(dataListener: (data: Object) => any)

// 清空主应用绑定的所有全局数据监听函数
microApp.clearGlobalDataListener()
```    

在子应用中：   
``` bash
// 直接获取数据
const globalData = window.microApp.getGlobalData() // 返回全局数据

function dataListener (data) {
  console.log('全局数据', data)
}

/**
 * 绑定监听函数
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
 */
window.microApp.addGlobalDataListener(dataListener: (data: Object) => any, autoTrigger?: boolean)

// 解绑监听函数
window.microApp.removeGlobalDataListener(dataListener: (data: Object) => any)

// 清空当前子应用绑定的所有全局数据监听函数
window.microApp.clearGlobalDataListener()
```

**清空全局数据**    
在主应用中：  
``` bash
import microApp from '@micro-zoe/micro-app'

// 清空全局数据
microApp.clearGlobalData()
```    

在子应用中：   
``` bash
// 清空全局数据
window.microApp.clearGlobalData()
```

#### 七、关闭沙箱后的通信方式
沙箱关闭后，子应用默认的通信功能失效，此时可以通过手动注册通信对象实现一致的功能。

**注册方式：在主应用中为子应用初始化通信对象**     
``` bash
import { EventCenterForMicroApp } from '@micro-zoe/micro-app'

// 注意：每个子应用根据appName单独分配一个通信对象
window.eventCenterForAppxx = new EventCenterForMicroApp(appName)
```

子应用就可以通过注册的eventCenterForAppxx对象进行通信，其api和window.microApp一致，主应用通信方式没有任何变化。 

**子应用通信方式：**    
``` bash
// 直接获取数据
const data = window.eventCenterForAppxx.getData() // 返回data数据

function dataListener (data) {
  console.log('来自主应用的数据', data)
}

/**
 * 绑定监听函数
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
 */
window.eventCenterForAppxx.addDataListener(dataListener: (data: Object) => any, autoTrigger?: boolean)

// 解绑监听函数
window.eventCenterForAppxx.removeDataListener(dataListener: (data: Object) => any)

// 清空当前子应用的所有绑定函数(全局数据函数除外)
window.eventCenterForAppxx.clearDataListener()

// 子应用向主应用发送数据，只接受对象作为参数
window.eventCenterForAppxx.dispatch({type: '子应用发送的数据'})
```

### 其他特性
其他特性包括JS沙箱，样式隔离，元素隔离，预加载，多层嵌套等。具体可以在[micro-app](https://micro-zoe.github.io/micro-app/)中进行详细查看。

## 参考资料
- [Micro App](https://micro-zoe.github.io/micro-app/)
- [Micro Frontends](https://micro-frontends.org/)
- [Micro Frontends in Action](https://www.manning.com/books/micro-frontends-in-action)

以上是一个详细的微前端介绍，你可以根据具体需求和项目情况进一步深入研究。
