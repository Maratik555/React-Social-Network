import s from './Post.module.css';
import postPhoto from '../../../../assets/images/2.png'

const Post = (props) => {
    return (
      <div className={s.item}>

          <img src={postPhoto} alt='it'/>
          {props.message}
          <div>
              <span>Like</span> {props.like}
          </div>
      </div>
    );
};

export default Post;
