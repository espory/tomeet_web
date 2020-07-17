import axios from "axios";
// import { message } from 'antd';
// 创建axios实例
const service = axios.create({
    // baseURL: "http://localhost:7001/", //开发环境
    // baseURL: " ", // 打包
    timeout: 15000, // 请求超时时间,
});

const TOKEN_KEY = 'TOMEET_USER_TOKEN'

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        //.....请求前处理.添加统一参数，如Token和时间戳
        const token = localStorage.getItem(TOKEN_KEY);
        if(token){
            config.headers.common['Authorization'] = 'Bearer '+token;
        }        
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    async function(response) {
    let {data, config} = response;
    if(data.code===0){
        if(config.url === '/api/user/login'){
            localStorage.setItem(TOKEN_KEY, data.message.token)
        }
    } else if(data.code===-5){
        //code是-5，意味着token过期
        // message.error('登录信息已过期，请重新登录');
        localStorage.removeItem(TOKEN_KEY);
        //跳转到login页面
        window._ROUTER_.push('/')

    } else if(data.code===-10){
        //code是-10，意味着没有token
        // message.error('尚未登录，请登录后访问');
        //跳转到login页面
        window._ROUTER_.push('/')

    }

    return Promise.resolve(response); //异步
    },
    function(error) {
    // 请求失败、错误处理回调
        let originalRequest = error.config;
        if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1 && !originalRequest._retry) {
            console.log("登录超时");
        }
        return Promise.reject(error); //异步
    }
);
export default service;
