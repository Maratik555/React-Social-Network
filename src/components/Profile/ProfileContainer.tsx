import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {AppStateType} from '../../redux/redux-store'
import {ProfileType} from '../../API/api'


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = + this.props.match.params.userId
        if(!userId ) {
            userId = this.props.authUserId
            if(!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
       this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType,prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
        <Profile {...this.props}
                 isOwner={!this.props.match.params.userId}
                 profile={this.props.profile}
                 status={this.props.status}
                 updateStatus={this.props.updateStatus}
                 savePhoto={this.props.savePhoto}
        />
    )
    }
}

let mapStateToProps = (state: AppStateType) => ({
        // @ts-ignore
        profile: state.profilePage.profile,
        // @ts-ignore
        status: state.profilePage.status,
        authUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })

export default compose<React.ComponentType>(connect(mapStateToProps,
  {getUserProfile,getStatus,updateStatus,savePhoto, saveProfile}),withRouter)(ProfileContainer)

