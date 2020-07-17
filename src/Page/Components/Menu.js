import React from 'react';
import './Menu.css'
import img1 from '../../images/listUI/多云.png'
import img2 from '../../images/listUI/music.png'
import img3 from '../../images/listUI/personalspace.png'
import img4 from '../../images/listUI/鸟.png'
import img5 from '../../images/listUI/robot.png'
import img6 from '../../images/listUI/set.png'

function Card(props) {
    return (

        //react代码逻，通过条件运算符去创建元素来表现当前的状态，使得代码显得
        (props.info.id === props.currentSessionId) ?
            <li className="active">
                <img className="avatar" src={props.info.app.img} alt={props.info.app.name}></img>
                <p className="name">{props.info.app.name}</p>
            </li> : <li onClick={props.handleClick}>
                <img className="avatar" src={props.info.app.img} alt={props.info.app.name}></img>
                <p className="name">{props.info.app.name}</p>
            </li>

    )
}



class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSessionId: props.currentSessionId,
            ListInfo: [{
                id: 1,
                app: {
                    name: '去遇见',
                    img: img1
                },
            }, {
                id: 2,
                app: {
                    name: '音乐',
                    img: img2
                }
            },
            {
                id: 3,
                app: {
                    name: '空间',
                    img: img3
                }
            },
            {
                id: 4,
                app: {
                    name: '树洞',
                    img: img4
                }
            },
            {
                id: 5,
                app: {
                    name: 'Robot',
                    img: img5
                }
            }, {
                id: 6,
                app: {
                    name: '个人中心',
                    img: img6
                }
            }

            ]
        }
    }

    render() {
        return (
            <div id="list">
                <ul style={{ marginTop: "16px" }}>
                    {
                        this.state.ListInfo.map((info) => {
                            return (<Card key={info.id} info={info} currentSessionId={this.props.currentSessionId} handleClick={() => { this.props.handleClick(info.id) }}></Card>)
                        })}
                </ul>
            </div>

        )
    }
}

export default Menu

