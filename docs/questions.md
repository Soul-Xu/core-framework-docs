---
sidebar_position: 10
---

# 常见问题

1. **为什么需要使用`npm install --force`，而不是`npm install`?**     
   因为使用`npm install`的时候会出现一些不同的库版本不兼容的情况，如果一个一个手动解决是不合理的做法，因此直接加上   
   `--force`来自动化解决这个问题，或者采用`yarn`的方式进行安装。

2. **在前端部分使用的是`nextjs`，如何实现代码规范，比如`eslint`，`stylelint`等?**    
   可以在终端命令行中`cd src/client`，切换到前端部分的代码中，然后安装依赖`npm install --force`，安装成功后    
   直接运行`npm run eslint:fix`，`npm run stylelint:fix`，或者直接`npm run lint:fix`，这样就可以自动实现    
   代码规范了。

3. **在前端部分使用网络请求的时候可以用`axios`来实现吗？**    
   在网络请求部分有提到，该框架本身是支持`axios`和`redux-toolkit`两种方式进行网络请求的，并且`axios`也封装了相关的拦截器。

4. **目前可使用的帐号有哪些？只有`admin`帐号吗，如何新增帐号？**   
   项目初始的帐号为`admin`，这是管理员账号。在管理员账号登录进来的时候，在左侧菜单栏权限设置中有用户管理页签，在这里可以新增用户，并且新增的用户用于登录的用户名为用户名称，密码默认和用户名相同。

5. **基础框架有哪些开发组件可以使用，后续还有其他的开发组件么？**   
   目前根据常用的业务场景，我们封装了表单开发组件，列表开发组件，搜索页开发组件以及图表类开发组件。在后续根据业务量的扩大，会推出各种场景的开发组件，用以提高整体的开发效率。

6. **在前端部分，看到是采用的`typescript`写法，如果是出现了`typescript`相关的报错如何解决呢？**    
   这个问题可以通过具体解决每个`typescript`的报错来解决，也可以对`tsconfig.json`的配置进行修改来解决，当然不得已的情况下可以用`@ts-ignore`暂时处理报错来保证项目可以正常启动。

7. **在前端部分，终端报错TS2686: `'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.`**   
   出现这种报错的原因主要是在页面代码中没有手动引入`React`，需要在代码头部添加一行`import React from 'react'`。   
   造成这个问题的原因是在`tsconfig.js`文件中`jsx`属性的值为`react`，如果为`react-jsx`，则会自动默认代码为`react`的`jsx`模式。