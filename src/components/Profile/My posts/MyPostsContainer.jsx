import {addPostAction, updatePostAction} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps =(state)=>{
    return{
         posts:state.profilePage.posts,
         newPostText:state.profilePage.newPostText
    }
}
         
const mapDispatchToProps =(dispatch)=>{
        return{
               updateNewPostText: (text)=>{
                   let action = updatePostAction(text)
                   dispatch(action)
               },
            addPost: ()=>{
                   dispatch(addPostAction())
            }
        }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
