import s from './MyPosts.module.css'
import * as React from "react";
import {Field, Form} from 'react-final-form'
import {composeValidators, maxLengthCreator, required} from "../../../utils/validators";
import {element} from "../../Common/Form control/FormControl";
import Post from "./Post/Post";
import Button from '@material-ui/core/Button';
import {postsDataType} from "../../../Types/types";
import {FC} from "react";

const maxLength140 = maxLengthCreator(140)
const Textarea = element('textarea')

type MyPostsFormPropsType = {
    addPost: (formData: any) => void
}
const MyPostsForm: FC<MyPostsFormPropsType> = (props) => {

    const addPost = (formData: any) => {
        props.addPost(formData.post)
    }

    return (
        <Form
            onSubmit={addPost}
            render={({handleSubmit, form}) => (
                <form
                    onSubmit={handleSubmit}>
                    <div>
                        <Field placeholder={'New post'} name={'post'} component={Textarea}
                               validate={composeValidators(required, maxLength140)}/>
                    </div>
                    <div className={s.button}>
                        <Button type="submit"
                                onClick={async event => {
                                    await handleSubmit(event)
                                    form.reset()
                                    form.resetFieldState('post')
                                }}
                                variant="contained"
                                color="primary">Add post</Button>
                    </div>
                </form>
            )}/>

    )
}

type MyPostsPropsType = {
    posts: Array<postsDataType>
    addPost: (formData: any) => void
}
const MyPosts: FC<MyPostsPropsType> = React.memo((props) => {
    let postEl = [...props.posts]
        .reverse()
        .map(p => <Post message={p.message} key={p.id}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <MyPostsForm addPost={props.addPost}/>
            <div className={s.posts}>
                {postEl}
            </div>
        </div>
    )
})


export default MyPosts