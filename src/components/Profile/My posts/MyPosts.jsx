import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from "react";

const MyPosts = (props) => {
    let postsEl;
    postsEl = props.posts.map((p) => <Post message={p.message} key={p}  like={p.like}/>);

    let newPostEl = React.createRef()

    let onAddPost = () => {
        props.addPost()
    }

    let OnPostChange = () => {
        let text = newPostEl.current.value;
        props.updateNewPostText(text)
    }

    return (
      <div className={s.pBlock}>
          <h2>My posts</h2>
          <div>
              <div>
                  <textarea onChange={OnPostChange} ref={newPostEl} value={props.newPostText}/>
              </div>
              <div>
                  <button onClick={onAddPost}>Add post</button>
              </div>
              <button>Remove</button>
          </div>
          <div className={s.posts}>
              {postsEl}
          </div>
      </div>
    );
};

export default MyPosts;
