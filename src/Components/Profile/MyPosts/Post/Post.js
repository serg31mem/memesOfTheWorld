import s from './Post.module.css'
import userPhoto from '../../../../assets/images/userPhoto.png'
import {useState} from "react";
import Button from "@material-ui/core/Button";

const Post = (props) => {

    const [count, setCount] = useState(0)

    return (
        <div className={s.item}>
            <img src={userPhoto}/>
            {props.message}
            <div>
                {count === 0
                    ? <Button variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => setCount(count + 1)}>Like</Button>
                    : <Button variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => setCount(count - 1)}>Like</Button>}
                <span className={s.likeCount}> {count}</span>
            </div>
        </div>
    )
}

export default Post



