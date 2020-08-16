import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Menu.css'
import img1 from '../../images/listUI/多云.png'
import img2 from '../../images/listUI/music.png'
import img3 from '../../images/listUI/personalspace.png'
import img4 from '../../images/listUI/鸟.png'
import img5 from '../../images/listUI/robot.png'
import img6 from '../../images/listUI/set.png'






function Card(props) {
    let { currentPageId, info, changeCurrentPageId } = props
    return (
        <li className={ (info.id === currentPageId) ? 'active' :''} onClick={changeCurrentPageId}>
            <img className="avatar" src={info.app.img} alt={info.app.name}></img>
            <p className="name">{info.app.name}</p>
        </li>
    )
}



class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        let { currentPageId, changeCurrentPageId } = this.props

        return (
            <div id="list">
                <ul style={{ marginTop: "16px" }}>
                    {
                        this.state.ListInfo.map((info) => {
                            return (<Card key={info.id} info={info} currentPageId={currentPageId} changeCurrentPageId={() => { changeCurrentPageId(info.id) }}></Card>)
                        })}
                </ul>
            </div>

        )
    }
}



const mapStateToProps = (state) => ({
    currentPageId: state.currentPageId,
})

const mapDispatchToProps = (dispatch) => ({
    changeCurrentPageId(PageId) {
        let action = {
            type: 'CHANGE_CURRENT_PAGE_ID',
            PageId
        }
        dispatch(action);
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)


