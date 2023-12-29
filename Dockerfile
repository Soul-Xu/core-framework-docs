# 使用 Node.js 18 的 Alpine Linux 作为基础镜像
FROM node:18-alpine as builder

# 切换软件源为华为云
RUN echo 'https://mirrors.huaweicloud.com/alpine/v3.16/main' > /etc/apk/repositories \
    && echo 'https://mirrors.huaweicloud.com/alpine/v3.16/community' >> /etc/apk/repositories \
    && apk update \
    && apk upgrade

# 添加工具包
RUN apk add net-tools curl busybox-extras
RUN npm config set registry https://registry.npm.taobao.org

# 复制 package.json 和 package-lock.json
COPY ./package.json ./package-lock.json ./

# 设置工作目录
WORKDIR /core-framework-docs

# 安装依赖
RUN npm install

# 复制所有文件到构建目录
COPY ./ .

# 构建项目
RUN npm run build

# 定义启动命令
CMD ["npm", "start"]
