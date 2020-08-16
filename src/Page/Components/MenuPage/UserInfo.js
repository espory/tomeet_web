
import React, { Component } from 'react'
import { Form, Input, Button, Space, Radio, Select } from "antd";
import './UserInfo.css'
import { connect } from 'react-redux';
import {updateInfoApi} from './../../../service/api'
class UserInfo extends Component {

  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    this.props.saveUserInfo(values);
    updateInfoApi(this.props.userInfo)

  }

  render() {
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


    let {gender,grade,academy,nickName} = this.props.userInfo
    return (
      <div className="main">
        <div className="infomainform">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true
            }}
onFinish={this.handleSubmit}
            // onSubmitCapture={this.handleSubmit}
          >
            <Form.Item label="用户名" name="nickName" initialValue={nickName} rules={[{ max: 4 }]}>
              <Input />
            </Form.Item>

            <Form.Item name="gender" label="性别" initialValue={gender}>
              <Radio.Group >
                <Radio value="男生">男生</Radio>
                <Radio value="女生">女生</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="grade" label="年级" initialValue={grade}>
              <Select
                placeholder="请选择所属年级"
              >
                <Select.Option value="研一">研一</Select.Option>
                <Select.Option value="研二">研二</Select.Option>
                <Select.Option value="研三">研三</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="academy" label="学院" initialValue={academy}>
              <Select
                placeholder="请选择所属学院"
              >
                <Select.Option value="计算机科学与技术学院">计算机科学与技术学院</Select.Option>
                <Select.Option value="软件学院">软件学院</Select.Option>
                <Select.Option value="美术学院">美术学院</Select.Option>
                <Select.Option value="物电学院">物电学院</Select.Option>
                <Select.Option value="微电子学院">微电子学院</Select.Option>
                <Select.Option value="医学院">医学院</Select.Option>
              </Select>
            </Form.Item>


            <Form.Item {...tailLayout}>
              <Space size={"middle"}>
                <Button type="primary" htmlType="submit" style={{ width: "100px", height: "30px",}}>更新</Button>
                {/* <Button style={{ width: "80px", height: "30px" }}>重置</Button> */}
              </Space>

            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userInfo: state.mainPageReducer.userInfo,
})

const mapDispatchToProps = (dispatch) => ({
  saveUserInfo(userInfo) {
    let action = {
      type: 'SAVE_USER_INFO',
      userInfo
    }
    dispatch(action);
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
