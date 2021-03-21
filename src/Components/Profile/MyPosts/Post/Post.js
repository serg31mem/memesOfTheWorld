import s from './Post.module.css'
import userPhoto from '../../../../assets/images/userPhoto.png'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={userPhoto}/>
            {props.message}
            <div>
                <button>Like</button>
                <span>{props.likes}</span>
            </div>
        </div>
    )
}

export default Post