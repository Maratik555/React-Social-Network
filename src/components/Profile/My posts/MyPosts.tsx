import React, {useRef} from 'react'
import {Button, Space} from 'antd'
import {TypedUseSelector} from '../../../redux/redux-store'
import {useDispatch} from 'react-redux'
import {addPosts, deletePost} from '../../../redux/profile-reducer'


const MyPosts = () => {
    const {posts} = TypedUseSelector(state => state.profilePage)
    const dispatch = useDispatch()
    const ref = useRef()


    let addPost = () => {
        dispatch(addPosts())
    }

    let delPost = () => {
        dispatch(deletePost(1))
    }

    console.log(ref.current)


    return (
        <div>
            <Space size="middle">
                <div>
                    <Button onClick={addPost}>Добавить</Button>
                </div>
                <div>
                    <Button onClick={delPost}>Удалить</Button>
                </div>
            </Space>
            <div>
                <h2>Мои посты</h2>
            </div>
            {/*@ts-ignore*/}
            <div ref={ref}>
                {/*@ts-ignore*/}
                {posts.map(post => <div key={post.id}>{post.id}. {post.body}</div>)}
            </div>
        </div>
    )
}

export default MyPosts
