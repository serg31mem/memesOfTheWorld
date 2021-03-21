import s from './MyPosts.module.css'
import * as React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {element} from "../../Common/Form control/FormControl";
import Post from "./Post/Post";

const maxLength10 = maxLengthCreator(10)

const Textarea = element('textarea')

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'New post'} name={'post'} component={Textarea}
                validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPostsReduxForm = reduxForm({form: 'myPosts'})(MyPostsForm)

const MyPosts = React.memo((props) => {
    console.log('render')
    let postEl = [...props.posts]
        .reverse()
        .map(p => <Post message={p.message} likes={p.likes} key={p.id}/>)
    const addPost = (formData) => {
        props.addPost(formData.post)
    }
    return (
        <div className={s.descriptionBlock}>
            <h3>My posts</h3>
            <MyPostsReduxForm onSubmit={addPost}/>
            <div className={s.posts}>
                {postEl}
            </div>
        </div>
    )
})


export default MyPosts