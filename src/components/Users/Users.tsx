import React, {FC, useEffect} from 'react'
import User from './User'
// import Paginator from './Paginator'
import {Field, Formik} from 'formik'
import {FilterType, follow, getUsers, unfollow} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {getUsersFilter} from '../../redux/users-selectors'
import {useHistory} from 'react-router-dom'
import queryString from 'query-string'
import {TypedUseSelector} from '../../redux/redux-store'
import {Button, Pagination} from 'antd'


export const Users: FC = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()


    const {users, totalItemCount, currentPage, filter, following} = TypedUseSelector(
        state => state.usersPage)

    // const users = useSelector(mstpGetUsers)
    // const totalItemCount = useSelector(getTotalUsersCount)
    // const currentPage = useSelector(getCurrentPage)
    // const pageSize = useSelector(getPageSize)
    // const filter = useSelector(getUsersFilter)
    // const following = useSelector(getFollowing)

    useEffect(() => {
        // const search = history.location.search
        const {search} = history.location
        const parsed = queryString.parse(search) as { term: string, page: string, friend: string }

        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.term) actualPage = (+parsed.page)
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (parsed.term) actualFilter = {
            ...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true'
        }

        dispatch(getUsers(actualPage, actualFilter))
    }, [])

    useEffect(() => {
        history.push({
            pathname: '/devs',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })

    }, [filter, currentPage])


    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, filter))
    }

    const foll = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfoll = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <div>
        <div>
            <UsersSearch onFilterChanged={onFilterChanged}/>
        </div>
        <Pagination defaultCurrent={currentPage} total={totalItemCount} onChange={onPageChanged} />
        <div>
            {users.map((u: any) => <User user={u}
                                         following={following}
                                         follow={foll} unfollow={unfoll}
                                         key={u.id}
                />
            )}
        </div>
    </div>
}

interface PropsTypeUserSearch {
    onFilterChanged: (filter: FilterType) => void
}

type FriendType = 'true' | 'false' | 'null'

interface FormType {
    term: string
    friend: FriendType
}

const usersValidate = (values: FormType) => {
    return {}
}

const UsersSearch: FC<PropsTypeUserSearch> = React.memo((props) => {

        const filter = useSelector(getUsersFilter)

        const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
            const filter: FilterType = {
                term: values.term,
                friend: values.friend === 'null' ? null : values.friend === 'true'
            }

            props.onFilterChanged(filter)
            setSubmitting(false)
        }

        return <div>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
                validate={usersValidate}
                onSubmit={submit}>
                {(props) => {
                    const {
                        values,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props
                    return (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="text" style={{display: 'block'}}>
                            </label>
                            <input
                                id="term"
                                placeholder="Enter your search"
                                type="text"
                                value={values.term}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Button
                                // type="button"
                                onClick={handleReset}
                                disabled={!dirty || isSubmitting}>
                                Reset
                            </Button>
                            <button type="submit" disabled={isSubmitting}>
                                Send
                            </button>
                            <Field style={{marginLeft: 15, marginBottom: 25}} name="friend" as="select">
                                <option value="null">All</option>
                                <option value="true">Only followed</option>
                                <option value="false">Only unfollowed</option>
                            </Field>
                        </form>
                    )
                }}
            </Formik>
        </div>
    }
)
