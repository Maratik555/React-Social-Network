import React from "react";
import {connect} from "react-redux";
import {follow, getUsers, setCurrentPage, toggleFollowing, unfollow} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowing,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    mstpGetUsers
} from "../../redux/users-selectors";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ?  <Preloader /> : null}
        <Users totalItemCount={this.props.totalItemCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      following={this.props.following}
                      //portionSize={this.props.portionSize}
        />
        </>
    }
}

let mapStateToProps =(state)=>{
    return  {
        users: mstpGetUsers(state),
        pageSize: getPageSize(state),
        totalItemCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        following:getFollowing(state)
    }
}

export default compose(connect(mapStateToProps,
    {follow,
    unfollow,
    setCurrentPage,
    toggleFollowing, getUsers})) (UsersContainer);



