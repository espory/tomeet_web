
import request from "./request";
import { message } from 'antd';

export async function loginApi(parameters){
    let res = await request.post("/api/user/login",parameters);
    if(res.data.code===0){
        message.success('登陆成功');
        window._ROUTER_.push('/main')
    }
    else{
        message.error(res.data.message);
    }
}

export async function sendCodeApi(phoneNum) {
    let reg = /^1[0-9]{10}$/;
    if (phoneNum == '' || phoneNum.length <= 10 || !reg.test(phoneNum)){
        message.error('请输入正确的手机号');
    }
    else{
        let res = await request.post("/api/user/sendcode",{"phoneNum":phoneNum});
        if(res.data.code===0){
            message.success(res.data.message);
        }
        else{
            message.error(res.data.message);
        }
    }
}
export async function registApi(parameters){
    let res = await request.post("/api/user/register",parameters);
    if(res.data.code===0){
        message.success(res.data.message);
        window._ROUTER_.push('/main')
    }
    else{
        message.error(res.data.message);
    }
}

export async function getInfoApi(){
    let res = await request.get("/api/user/info");
    if(res.data.code===0){
        message.success(res.data.message);
    }
    else{
        message.error(res.data.message);
    }
}



// /* jshint esversion: 6 */
// import request from "./request";
// let ApiVersion="v1"; //版本控制

// //Post请求----添加
// export function userAddPost(data) {
//     return request({ url: ApiVersion + "/user", method: "post", data: data, });
// }

// //Put请求----修改
// export function userChangePut(data) {
//     return request({ url: ApiVersion + "/user", method: "put", params: data });
// }

// //Delete请求----删除
// export function userDelDelete(data) {
//     return request({ url: ApiVersion + "/user", method: "delete", params: data });
// }

// //Get请求----查询
// export function userListGet(data) {
//     return request({ url: ApiVersion + "/user", method: "get", params: data });
// }