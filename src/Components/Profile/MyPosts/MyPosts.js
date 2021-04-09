import s from './MyPosts.module.css'
import * as React from "react";
import {Form, Field} from 'react-final-form'
import {composeValidators, maxLengthCreator, required} from "../../../utils/validators";
import {element} from "../../Common/Form control/FormControl";
import Post from "./Post/Post";

const maxLength10 = maxLengthCreator(140)

const Textarea = element('textarea')

const MyPostsForm = (props) => {

    const addPost = (formData) => {
        props.addPost(formData.post)
    }

    return (
        <Form
            onSubmit={addPost}
            render={({handleSubmit, form}) => (
                <form
                    onSubmit={async event => {
                        await handleSubmit(event)
                        form.reset()
                        form.resetFieldState('post')
                    }}>
                    <div>
                        <Field placeholder={'New post'} name={'post'} component={Textarea}
                               validate={composeValidators(required, maxLength10)}/>
                    </div>
                    <div>
                        <button>Add post</button>
                    </div>
                </form>
            )}/>

    )
}

const MyPosts = React.memo((props) => {
    let postEl = [...props.posts]
        .reverse()
        .map(p => <Post message={p.message} likes={p.likes} key={p.id}/>)

    return (
        <div className={s.descriptionBlock}>
            <h3>My posts</h3>
            <MyPostsForm addPost={props.addPost}/>
            <div className={s.posts}>
                {postEl}
            </div>
        </div>
    )
})


export default MyPosts