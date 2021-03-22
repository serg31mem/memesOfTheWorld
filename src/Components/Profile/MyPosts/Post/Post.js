import s from './Post.module.css'
import userPhoto from '../../../../assets/images/userPhoto.png'
import {useState} from "react";

const Post = (props) => {

    const [count, setCount] = useState(0)

    const renderButtonLike = () => {
        if (count === 0) {
            return <button onClick={() => setCount(count + 1)}>Like</button>
        } else {
            return <button onClick={() => setCount(count - 1)}>Like</button>
        }
    }

    return (
        <div className={s.item}>
            <img src={userPhoto}/>
            {props.message}
            <div>
                {renderButtonLike()}
                <span>{count}</span>
            </div>
        </div>
    )
}

export default Post


