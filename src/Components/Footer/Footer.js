import s from './Footer.module.css'
import {NavLink} from "react-router-dom";
import telegram from '../../assets/images/Telegram.svg'
import instagram from '../../assets/images/instagram.svg'
import mail from '../../assets/images/mail.svg'

const Footer = (props) => {
    return (
        <div className={s.footer}>
            {props.isAuth &&
            <div className={s.creator}>
                <NavLink to='/profile/15537'>Sergey Karpov</NavLink>
            </div>}
            <div className={s.contactsCreator}>
                <span className={s.telegram}>
                    <a target="_blank" href="https://t.me/sergey_karpov31"><img src={telegram}/>  </a>
                </span>
                <span className={s.instagram}>
                    <a target="_blank" href="https://www.instagram.com/sergey_karpov_/"><img src={instagram}/> </a>
                </span>
                <span className={s.mail}>
                    <a target="_blank" href="mailto:sergey31karpov@gmail.com?subject=Хотим взять вас на работу"><img
                        src={mail}/></a>
                </span>
            </div>
            <div className={s.copyright}>
                © 2021
            </div>
        </div>
    )
}

export default Footer