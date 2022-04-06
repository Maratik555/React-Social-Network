import React, {FC, useEffect, useRef, useState} from 'react'
import {Button, Image, Input} from 'antd'
// @ts-ignore
import './module.css'
import {sendMessage, startMessages} from '../redux/chat-reducer'
import {useDispatch} from 'react-redux'
import {TypedUseSelector} from '../redux/redux-store'

const {TextArea} = Input

export interface ChatType {
    id: string
    message: string
    photo: string
    userId: number
    userName: string
}

const style = {
    height: '300px',
    overflowY: 'auto',
    backgroundColor: 'white'
}

const ChatPage: FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}


const Chat: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessages())
        return () => {
            dispatch(startMessages())
        }
    },[])

    return <div>
        <Messages />
        <MessageForm />
    </div>
}


const Messages: FC = () => {
    const {messages} = TypedUseSelector(state => state.chat)
    const ref = useRef<HTMLDivElement>()
    const [autoScroll, setAutoScroll] = useState(true)

    const scrollHandler = (e: any) => {
        const el = e.currentTarget
        if(Math.abs((el.scrollHeight - el.scrollTop) - el.clientHeight) < 200) {
            !autoScroll && setAutoScroll(true)
        } else {
            autoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if (autoScroll) {
            ref.current?.scrollIntoView({behavior: 'smooth', inline: 'center'})
        }
    },[messages])

    return (
        // @ts-ignore
        <div className='el' style={style} onScroll={scrollHandler}>
            {messages.map(m => <Message key={m.id} message={m}/>)}
             {/*@ts-ignore*/}
            <div  ref={ref}/>
        </div>
    )
}


const Message: FC<{ message: ChatType }> = React.memo(({message}) => {
    return <div>
        <Image src={message.photo} style={{width: '40px'}}/> <b>{message.userName}</b>
        <br/>
        <i>{message.message}</i>
        <hr/>
    </div>
})

const MessageForm: FC = () => {
    const [message, setMessage] = useState('')
    // const [status, setStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()

    function messageHandler() {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage((v) => v = '' )
    }

    function keyUp(e: any) {
        if(e.code === 'Enter' && (e.ctrlKey || e.metaKey)) {
            dispatch(sendMessage(message))
            setMessage('')
        }
    }

    return <div>
        <div>
            <br/> <br/>
            <TextArea onKeyUp={keyUp} onChange={(e) => setMessage(e.currentTarget.value)} value={message} allowClear/>
        </div>
        <br/>
        <div>
            <Button disabled={false}  onClick={messageHandler}>
                Отправить
            </Button>
        </div>
    </div>
}

export default ChatPage
