import { FC } from 'react'
import s from './../Dialogs.module.css'

type PropsType = {
    textMessage: string
}

const Message: FC<PropsType> = (props) => {
    return (
        <div className={s.message}>{props.textMessage}</div>
    )
}

export default Message