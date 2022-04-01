import {Link} from 'react-router-dom'
import React, {FC} from 'react'
import {Avatar, Button, Col, Layout, Menu, Rate, Row} from 'antd'
import {GithubOutlined, UserOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import {TypedUseSelector} from '../../redux/redux-store'
import {logout} from '../../redux/auth-reducer'


export const Header: FC = () => {
    const {isAuth, login} = TypedUseSelector(state => state.auth)
    const dispatch = useDispatch()

    const logOut = () => dispatch(logout())


    const {Header} = Layout

    return (
        <Header className="header">
            <div className="logo"/>
            {/*<img src={logo} alt='fb' />*/}
            <Row>
                <Col span={16}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item icon={<UserOutlined/>} key="1"><Link to="/profile">Моя страница</Link></Menu.Item>
                        <Menu.Item icon={<GithubOutlined/>} key="2"><Link to="/devs">Разработчики</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth ? <> <Col span={1}>
                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Col>
                        <Col style={{color: '#87d068'}} span={2}>{login}</Col>
                        <Col span={2}>
                            <Button onClick={logOut}>Выйти</Button>
                        </Col>
                        <Col span={3}>
                            <Rate/>
                        </Col>
                    </>
                    : <Col span={1}>
                        <Button>
                            <Link to={'/login'}>Войти</Link>
                        </Button>
                    </Col>}
            </Row>
        </Header>
    )
}
