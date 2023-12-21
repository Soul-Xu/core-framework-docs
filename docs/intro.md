---
sidebar_position: 1
---

# 快速开始

让我们开始 **基础开发框架文档**.

### 系统环境要求

在使用基础开发框架之前，先确保我们的电脑中已经具有相应的系统环境。   

最基本的IDE，node环境等，这里推荐使用VS Code进行开发，由于我们的打包工具以及框架本身都需要node，   
因此需要按照要求安装相应版本的node。

### 我们所需要的

- [Node.js](https://nodejs.org/en/download/) 版本 16.x 或者 18.x:
  - 安装 Node.js 时，建议勾选所有与依赖相关的复选框.

### 拉取项目代码

首先我们需要找到我们的项目代码所在 **[Github] (https://jihulab.com/yunsu/core-framework-frontend)**

你需要做的是，在你电脑的终端命令行中输入下面的命令

```bash
git clone git@jihulab.com:yunsu/core-framework-frontend.git
```

### 开始项目

运行下面的指令:

```bash
cd core-framework
npm install --force / yarn
npm run start
```

`cd` 命令用于更改当前工作目录。为了使用你新创建的 Docusaurus 站点，你需要在终端中导航到该目录.

`npm install --force` 或者 `yarn` 命令用于安装项目所需的依赖。为了使项目正常运行，需要安装一些依赖模块，比如基本库react，第三方库dayjs，antd等.

`npm run start` 命令构建了你的本地网站并通过一个开发服务器进行服务，你可以通过 http://localhost:3000/ 查看.

### 小结
快速开始该项目，可以让您更加直观的了解具体情况。