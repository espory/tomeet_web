
import React from 'react';
import { Form, Input, Button, Space,Radio,Select } from "antd";
import './UserInfo.css'

function UserInfo(props){
    const layout = {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 10
        }
      };
      const tailLayout = {
        wrapperCol: {
          offset: 10,
          span: 20
        }
      };

    return(
        <div  className="main">
        <div className="infomainform">
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true
            }}
        >
            <Form.Item label="用户名" name="username" >
                <Input />
            </Form.Item>

            <Form.Item name="radio-group" label="性别">
        <Radio.Group>
          <Radio value="a">男</Radio>
          <Radio value="b">女</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="grade" label="年级">
        <Select
          placeholder="请选择所属年级"
        >
          <Select.Option value="grade-1">研一</Select.Option>
          <Select.Option value="grade-2">研二</Select.Option>
          <Select.Option value="grade-3">研三</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="academy" label="学院">
        <Select
          placeholder="请选择所属学院"
        >
          <Select.Option value="v1">计算机科学与技术学院</Select.Option>
          <Select.Option value="v2">软件工程学院</Select.Option>
          <Select.Option value="v3">美术学院</Select.Option>
          <Select.Option value="v4">物电学院</Select.Option>
          <Select.Option value="v5">微电子学院</Select.Option>
          <Select.Option value="v6">医学院</Select.Option>
        </Select>
      </Form.Item>


      <Form.Item {...tailLayout}>
      <Space size={"middle"}>
          <Button type="primary" htmlType="submit"  style={{width:"100px",height:"30px",marginLeft:"-20px"}}>
          更新
          </Button>
          <Button style={{width:"80px",height:"30px"}}>重置</Button>
      </Space>

      </Form.Item>
        </Form>
        </div>
        </div>
    )
}

export default UserInfo