// @ts-ignore
import s from './../Dialogs.module.css'
import {FC} from 'react'

type PropsType = {
    message: string
}

const Message: FC<PropsType> = (props) => {
    return <div className={s.message}>{props.message}</div>
}

export default Message