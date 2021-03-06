import 'antd/dist/antd.css'
import React, {Component, Suspense} from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import UsersContainer from './components/Users/UsersContainer'
import {LoginPage} from './components/Login/LoginPage'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import Friends from './components/Friends/Friends'
import {AppStateType} from './redux/redux-store'
// import 'antd/dist/antd.dark.css'
import {Breadcrumb, Layout, Menu} from 'antd'
import {
    HomeOutlined,
    MessageTwoTone,
    NotificationOutlined,
    SettingTwoTone,
    SmileTwoTone,
    WechatOutlined
} from '@ant-design/icons'
import {Header} from './components/Header/Header'

const DialogsContainer = React.lazy(() => import ('./components/Dialogs/Message/DialogsContainer'))
const ProfileContainer = React.lazy(() => import ('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import ('./utils/ChatPage'))


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const {SubMenu} = Menu
const {Content, Sider, Footer} = Layout

class App extends Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialize) {
            return <Preloader/>
        }
        return (
            <Layout>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/login">
                            <HomeOutlined/>
                            <span>Home</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item  href="/chat">
                            <WechatOutlined />
                            <span>Chat</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>,
                    <Layout className="site-layout-background" style={{padding: '24px 0', flex: '1 1 auto'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{
                                    height: '100%',
                                    display: 'flex', flexDirection: 'column'
                                }}
                            >
                                <SubMenu key="sub1" icon={<MessageTwoTone/>} title="??????????????????">
                                    <Menu.Item icon={<WechatOutlined />} key="1"><Link to="/chat">??????</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">??????????????</Link></Menu.Item>
                                </SubMenu>

                                <SubMenu key="sub2" icon={<SmileTwoTone/>} title="????????????">
                                    <Menu.Item key="3"><Link to="/friends">Friends</Link></Menu.Item>
                                </SubMenu>

                                <SubMenu key="sub3" icon={<SettingTwoTone/>} title="??????????????????">
                                    <Menu.Item key="4"><Link to="/settings">Settings</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" icon={<NotificationOutlined/>} title="??????????????????????">
                                    <Menu.Item key="5"><Link to="/music">????????????</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/video">??????????</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/games">????????</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Suspense fallback={<Preloader/>}>
                                <Route path="/friends"
                                       render={() => <Friends/>}/>

                                <Route path="/dialogs"
                                       render={() => <DialogsContainer/>}/>

                                <Route path="/chat"
                                       render={() => <ChatPage/>}/>

                                <Route path="/profile/:userId?"
                                       render={() => <ProfileContainer/>}/>

                                <Route path="/devs"
                                       render={() => <UsersContainer pageTitle={'Devs'}/>}/>
                                <Route exact path="/login" render={() => <LoginPage/>}/>
                            </Suspense>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Social Network ???? ??2022 Created by Marat</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialize: state.app.initialize
})

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)