---
sidebar_position: 6
---

# 创建新的页面

此项目开发的宗旨是让开发更简单，让业务更清晰。   

下面会以一个实际的页面开发代码来给大家进行讲解：


## 以登录页面为例

``` bash
  // pages/login/index.tsx
  /**
  * 登录页面
  */
  /** external library */
  import React, { useCallback, useEffect } from 'react';
  import { useRouter } from 'next/router';
  import { useDispatch, useSelector } from "react-redux";
  import { useImmerReducer } from "use-immer";
  import { Button, message } from 'antd';
  /** components */
  import FormLayout from "../../components/formLayout";
  /** store */
  import { setAuthState } from "../../store/modules/authSlice";
  import { setUserInfo } from "../../store/modules/loginSlice"
  import { setToken } from "../../store/modules/commonSlice"
  /** utils */
  import asyncThunk from "../../store/asyncThunk";
  import { reducer } from "../../utils/reducer";
  /** css */
  import classnames from "classnames/bind";
  import styles from "./index.module.scss";
  const classNames = classnames.bind(styles);
  /** http */
  import axios from 'axios';
  import { baseApi } from "../../config"

  type FieldType = {
    username?: string;
    password?: string;
  };

  const initialState = {
    username: "", // 账号
    password: "" // 密码
  }

  const Login: React.FC = () => {
    const router = useRouter()
    const dispatchRedux = useDispatch();
    const [data, dispatch] = useImmerReducer(reducer, initialState);
    const { username, password } = data as any;

    /**
    * @description 数据处理函数
    * @param key data字段
    * @param value data字段值
    */
    const setState = useCallback((type: string, val: Record<string, any>) => {
      dispatch({ type, payload: val });
    }, [dispatch]);

    /**
    * @description input组件onChange函数
    * @param key 
    * @param value 
    */
    const onHandleChange = (key: string, value: string) => {
      setState("update", { [key]: value.trim() });
    }

    /**
    * @description 登录成功
    * @param data 
    */
    const onLoginSuccess = (data: any) => {
      dispatchRedux(setAuthState({ authState: true }));
      dispatchRedux(setUserInfo({ userInfo: data.data }));
      message.success("登录成功");
      router.push("/app");
    }

    /**
    * @description 登录校验
    * @param key 
    * @param value 
    */
    const onLogin = useCallback(async () => {
      if (!username || !password) {
        message.warning("账号和密码不能为空");
        return;
      }
      const params = {
        username,
        password,
        rememberMe: false
      }

      // redux-toolkit方式
      const res = await dispatchRedux(asyncThunk.login(params) as any);
      const data = res?.payload;

      if (data?.code === 200) {
        onLoginSuccess(data)
      } else {
        message.error("登录失败，请重试")
        return
      }
    }, [password, username, dispatchRedux, router])

    /**
    * @description 登录表单配置
    */
    const formObj = {
      name: 'login-form',
      layout: 'vertical',
      labelAlign: "right",
      style: { maxWidth: 600 },
      items: [
        {
          kind: 'input',
          type: "text",
          key: 'username',
          value: username,
          style: {
            boxSizing: "border-box",
            width: "268px",
            height: "40px",
            padding: "8px 10px",
            background: "#FFFFFF",
            borderRadius: "2px",
            border: "1px solid #B4B9C2"
          },
          label: '账号',
          placeholder: '请输入账号',
          onChange: (e: any) => {
            onHandleChange("username", e.target.value.trim())
          }
        },
        {
          kind: 'input',
          type: "password",
          key: 'password',
          value: password,
          style: {
            boxSizing: "border-box",
            width: "268px",
            height: "40px",
            padding: "8px 10px",
            background: "#FFFFFF",
            borderRadius: "2px",
            border: "1px solid #B4B9C2"
          },
          label: '密码',
          name: 'password',
          placeholder: '请输入密码',
          onChange: (e: any) => {
            onHandleChange("password", e.target.value.trim())
          }
        }
      ],
      customElements: () => (
        <section style={{ textAlign: "center" }}>
          <Button style={{ width: "268px", height: "40px" }} type="primary" onClick={() => onLogin()}>登录</Button>
        </section>
      )
    }

    return (
      <section className={classNames("login-container")}>
        <div className={classNames("login-form")}>
          <div className={classNames("form-container")}>
            <div className={classNames("form-title")}></div>
            <div className={classNames("form-corner")}></div>
          </div>
          <div className={classNames("form-content")}>
            <FormLayout formObj={formObj} />
          </div>
        </div>
      </section>
    )
  }

  export default Login
```

下面让我们逐段来分析上面的代码：

### 样式模式
在开始的`/** css */`部分，可以看到我们在`login`文件夹下新建了对应的样式文件`index.module.scss`，这里是为了将样式和逻辑进行分离，使代码维护更加方便清晰。引入`classnames`类库，它是一个用于有条件处理`classname`字符串连接的库，简单来说就是动态地去操作类名，把符合条件的类名粘在一起。

### 函数式组件
在`Nextjs`的最佳实践中，我们通常都是采用函数式组件的方式来进行开发，这样可以很好的利用hooks特性，方便我们抽象业务逻辑以及组件。

### 状态管理
状态管理主要分为组件内部的`state`以及全局的`redux`，在复杂项目中选用`redux`比选用`mobx`更合适。
这里用到了`useDispatch`， `useSelector`，可以高效的处理`state`的数据变更，并从`store`当中获取保存的数据。
其中，抽象出来的setState函数，可以避免传统方式定义变量的时候大量使用`useState`导致的代码不易读问题。
`dispatchRedux(setAuthState({ authState: true }));`则可以快捷的触发`redux`中定义的方法来改变`store`中保存的数据。

### 网络请求
在登录页面中，我们使用的是`redux-toolkit`的方式来请求服务端接口。当然，实际的逻辑是先请求到`node`层，然后将网络请求转发到实际的服务端那边。这样的做法有一个好处就是可以避开浏览器的同源策略，从而避免发生跨域的问题。

### 表单组件
在上述代码中和传统代码可能不太一样的地方在于`return`的部分，因为登录页面其实也是一个表单，传统的开发方式是会使用第三方的UI组件来进行开发，比如`antd`的`form`组件。而在这里我们是没有看到`form`组件的，原因是我们将它封装成了一个通用的开发组件，对外会暴露出它的一些属性，在实际使用的时候，我们之间按照规范去进行配置，就可以很快的得到一个符合业务要求的表单了。我们需要做的则是编写这个配置属性，即上述代码中的`formObj`。

### 小结
从上面的一个完整的登录页面代码中，我们可以得出：

 - **样式模式**： 样式逻辑分离，`classnames`连接不同的类，使样式可管理。
 - **函数式组件**：采用`hook`特性和`ES6`及`ES next`特性进行开发，使代码更加简洁。
 - **状态管理**：结合`react-redux`，`use-immer`等库，封装可复用的函数，高效处理组件内部以及项目内的状态管理。
 - **网络请求**：使用`redux-toolkit`以及`node`层方式，可以简化传统的`axios`模式，并且避免跨域请求带来的一系列问题。
 - **表单组件**：通过封装常用的UI组件形成功能性的开发组件，比如`form`，`table`等，可以提高我们的开发效率和准确度。