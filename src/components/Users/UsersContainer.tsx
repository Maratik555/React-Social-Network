import React from "react"
import {connect} from "react-redux"
import {follow, getUsers, unfollow} from "../../redux/users-reducer";
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {compose} from "redux"
import {
  getCurrentPage,
  getFollowing,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  mstpGetUsers
} from "../../redux/users-selectors"
import {AppStateType} from "../../redux/redux-store"

interface PropsType {
  pageTitle:string
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalItemCount:number
  users: Array<number>
  following:Array<number>
  follow: () => void
  unfollow: () => void

  getUsers: (currentPage:number,pageSize:number) => void

}

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged(pageNumber:number) {
    this.props.getUsers(pageNumber, this.props.pageSize);
  }

  render() {
    return <>
      <h2>{this.props.pageTitle}</h2>
      { this.props.isFetching ? <Preloader/> :
      <Users totalItemCount={this.props.totalItemCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged.bind(this)}
             users={this.props.users}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
             following={this.props.following}
      />
      }
    </>
  }
}

let mapStateToProps = (state:AppStateType) => {
  return {
    users: mstpGetUsers(state),
    pageSize: getPageSize(state),
    totalItemCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    following: getFollowing(state)
  }
}


export default compose(connect(mapStateToProps,
  {
    follow,
    unfollow,
    getUsers
    // @ts-ignore
  }))(UsersContainer)