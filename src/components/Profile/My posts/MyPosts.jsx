import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxCreatorLength, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControl/FormControls";

const MyPosts = (props) => {
    let postsEl;
    postsEl = props.posts.map((p) => <Post message={p.message} key={p}  like={p.like}/>);

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
      <div className={s.pBlock}>
          <h2>My posts</h2>
          <AddNewFormRedux onSubmit={onAddPost}/>
          <div className={s.posts}>
              {postsEl}
          </div>
      </div>
    )
}

const maxLength10 =  maxCreatorLength(10)

let AddNewForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="New Post" name='newPostText' component={Textarea}
               validate={[required,maxLength10]} />
      </div>
      <div className={s.btn}>
        <button>Add</button>
        <button>Remove</button>
      </div>
    </form>
  )
}

const AddNewFormRedux = reduxForm({form:'ProfileAddNewForm'})(AddNewForm)

export default MyPosts;
