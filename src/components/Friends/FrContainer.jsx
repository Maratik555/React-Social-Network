import {connect} from "react-redux"
import Friends from "./Friends"

let mapStateToProps = (state) => {
  return {
    friendsR: state.friendsR
  }
}

// let mapDispatchToProps = (dispatch) => {
//   return {
//     sendMessage: (newMessageBody)=>{
//       dispatch(sendMessageCreator(newMessageBody))
//     }
//   }
// }

export default connect(mapStateToProps,null)(Friends)