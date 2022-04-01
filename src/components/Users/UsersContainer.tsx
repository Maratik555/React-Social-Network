import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {Users} from './Users'
import Preloader from '../common/Preloader/Preloader'
import {getIsFetching} from '../../redux/users-selectors'

interface PropsType {
    pageTitle: string
}

const UsersPage:FC<PropsType> = ({pageTitle}) => {

    const isFetching = useSelector(getIsFetching)


    return <>
        <h2>{pageTitle}</h2>
        {isFetching ? <Preloader/> : null }
            <Users/>
            </>
}

export default UsersPage