---
sidebar_position: 3
---

# 项目结构

根据前面的快速开始部分，我们得到了基础框架项目的源码，在开始正式开发业务代码之前，我们需要了解一下我们的项目结构

### 整体结构

```bash
│ .husky
│ .vscode
│ dist
│ node_modules
└─src
    │ client
    │ server
│ .cz-config.js
│ .gitignore
│ commitlint.config.js
│ Dockerfile
│ global.d.ts
│ nest-cli.json
│ package-lock.json
│ package.json
│ README.md
│ tsconfig.build.json
│ tsconfig.json
```

其中   
- .husky: git命令的hooks，可以进行自定义，也可以按照已有的设置来运行
- .vscode: IDE VsCode的一些本地配置
- dist: 该项目构建之后的产物
- node_modules: 该项目外层package.json所需的依赖包
- src: 项目主要逻辑代码所在的文件夹，根据前端和后端，分别位于client和server文件夹中，后面会详细讲解
- .cz-config.js: 和commitlint.config.js一起，作为commitlin相关的配置文件，主要作用是对git commit命令作规范限制
- .gitignore: git提交代码时设定需要忽略的内容，常见的比如node_modules
- nest-cli.json: nest相关的基本配置
- package-lock.json: package的版本锁定文件，需要保留
- package.json: 项目必须的文件，包括脚本，依赖注入等关键内容

### 前端

```bash
client
│ .next
│ node_modules
│ components
│ config
│ http
│ layout
│ pages
│ public
│ store
│ styles
│ utils
│ .babel.js
│ .eslintrc.js
│ .prettierignore
│ .prettierrc
│ .stylelintignore
│ global.d.ts
│ next.config.js
│ package-lock.json
│ package.json
│ README.md
│ tsconfig.config.json
│ ...
```

其中   
- next.config.js: nextjs项目的配置文件
- components: 封装了常用的一些功能性组件，比如formLayout表单开发组件，tableLayout表格开发组件，searchLayout搜索页开发组件等
- layout: 页面常用的外层layout组件所在的文件夹，如首页的appContainer，projectContainer等
- http: 封装了axios的拦截器，还有asyncThunk相关的配置，用于统一nextjs项目中的网络请求
- config: 用于定义一些常用的配置项，通常为常量
- pages: 项目主要的页面文件夹，根据nextjs框架自身支持的文件路由系统，在pages中新建一个文件，就能自动定位到一个路由地址，如：pages/home.tsx，就会定位到/home的路由
- public: 主要存放静态图片资源，在nextjs框架中，会默认读取public文件夹下的图片
- store: 主要存放处理状态管理以及网络请求相关逻辑的文件，在该项目中，我们使用redux-toolkit来管理状态
- utils: 根据业务场景需求，会抽象一些通用函数存放在这里
- package-lock.json: package的版本锁定文件，需要保留
- package.json: 项目必须的文件，包括脚本，依赖注入等关键内容

### 后端

```bash
server
│ config
│ core
└─models
    │ view
    └─│ view.controller.ts
      │ view.module.ts
      │ view.service.ts
    │ app
    └─│ dto
      │ entites
      │ app.controller.ts
      │ app.module.ts
      │ app.service.ts
    ｜index.module.ts
│ shared
│ app.controller.ts
│ app.module.ts
│ app.service.ts
│ main.ts

```

其中 
- main.ts: 项目主文件  
- app.controller.ts: 外层主应用的控制器文件
- app.module.ts: 外层主应用的视图文件
- app.service.ts: 外层主应用的服务文件
- core: 项目的一些核心模块，包括拦截器，过滤器，网络请求，中间件，管道，swagger等模块
- models: 项目的主要逻辑部分，分为view和一般的模块，在view中主要是处理由客户端发起的页面路由请求，
一般的模块则是处理客户端发起的api接口请求


**合理使用项目结构，可以帮助项目快速，清晰地构建所需的应用**
