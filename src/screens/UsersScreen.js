import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import {Col} from "react-bootstrap";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../css/user-dashboard.scss'
import UserList from "../components/UserList";
import UserPreview from "../components/UserPreview";
import ReactPaginate from 'react-paginate';
import apiClient from "../services/EventService";
import Loader from "../components/Loader";
import Search from "../components/Search";

const UsersScreen = ({history}) => {
    const [userDetail, setUserDetail] = useState(false)
    const [api_token, setApitoken] = useState('')
    const [loading, setLoading] = useState(true)
    const [offset, setOffset] = useState(0);
    const [userBlockedOffset, setUserBlockedOffset] = useState(0);
    const [Userdata, setUserData] = useState([]);
    const [BlockedUser, setBlockedUser] = useState([]);
    const [AllUserdata, setAllUserData] = useState([]);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0)
    const [BlockedUserpageCount, setPageCountBlockedUser] = useState(0)
    const [searchCount, setSearchCount] = useState('')

    // getting unblocked Users
    useEffect(() => {
        if (localStorage.getItem('user_api') === null) {
            history.push('/login')
        }
        const api_token = JSON.parse(localStorage.getItem('user_api'))
        setApitoken(api_token)

        async function getUsersActivity() {
            try {

                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const {data} = await apiClient.get(`/users?blocked=false`, config)

                const UsersSlice = data.slice(offset, offset + perPage)
                setUserData(UsersSlice)
                setAllUserData(data)
                setPageCount(Math.ceil(data.length / perPage))
                setLoading(false)

                //setUserActivityAction(UserActivity.data)
            } catch (error) {
                console.log(error)
                // error.response && setMessage(error.response.data.errors)
            }
        }

        getUsersActivity()

    }, [api_token, offset, setUserData, setPageCount, setApitoken,history,perPage])

    // getting blocked users
    useEffect(() => {

        async function getBlockedUsers() {
            try {

                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const {data} = await apiClient.get(`/users?blocked=true`, config)

                const BlockedUsersSlice = data.slice(userBlockedOffset, userBlockedOffset + perPage)
                setBlockedUser(BlockedUsersSlice)
                setPageCountBlockedUser(Math.ceil(data.length / perPage))

                //setUserActivityAction(UserActivity.data)
            } catch (error) {
                // console.log(error)
                // error.response && setMessage(error.response.data.errors)
            }
        }

        getBlockedUsers()

    }, [api_token, offset, setUserData, setPageCount, setApitoken, userBlockedOffset,perPage])


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(Math.ceil(selectedPage * perPage))
    };
    const BlockUserHandlePageClick = (e) => {
        const selectedPage = e.selected;
        setUserBlockedOffset(Math.ceil(selectedPage * perPage))
    };
    console.log(searchCount)
    return (
        <>
            {loading ? <Loader/> :
                <div className='dashboard '>
                    <div className='d-flex'>
                        <Col className='pl-0' md={2}>
                            <Sidebar UserScreen/>
                        </Col>
                        <Col md={7}>
                            <div className="dashboard-users w3-animate-opacity pr-5 pl-5 pt-5 pb-2">

                                <Tabs>
                                    <TabList>
                                        <div className='align-items-center d-flex justify-content-between'>
                                            <div>
                                                <Tab>Users</Tab>
                                                <Tab>Blocked Users</Tab>
                                            </div>
                                            <li className='list-unstyled search-box'>
                                                <Search
                                                    setUserData={setUserData}
                                                    countPerPage={perPage}
                                                    setSearchCount={setSearchCount}
                                                    AllUserdata={AllUserdata}/>
                                            </li>
                                        </div>
                                    </TabList>

                                    <TabPanel>
                                        {
                                            Userdata.map(el => {

                                                return (
                                                    <UserList key={el._id}
                                                              api_token={api_token}
                                                              premium={el.premiumUntil}
                                                              username={el.username}
                                                              userImage={el.image.url}
                                                              email={el.email}
                                                              createdAt={el.createdAt}
                                                              userID={el._id}
                                                              setUserDetail={setUserDetail}/>

                                                )
                                            })
                                        }
                                        <div className={searchCount > 2 ? 'd-none' : ''}>

                                            <ReactPaginate
                                                pageCount={pageCount}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"}/>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>

                                        {
                                            BlockedUser.map(el => {

                                                return (
                                                    <UserList key={el._id}
                                                              blocked
                                                              api_token={api_token}
                                                              premium={el.premiumUntil}
                                                              username={el.username}
                                                              email={el.email}
                                                              userImage={el.image.url}
                                                              createdAt={el.createdAt}
                                                              userID={el._id}
                                                              setUserDetail={setUserDetail}/>

                                                )
                                            })
                                        }


                                        <ReactPaginate
                                            pageCount={BlockedUserpageCount}
                                            onPageChange={BlockUserHandlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}/>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </Col>
                        <Col className='bg-white' md={3}>
                            <div className=' right-side h-100 user-preview p-3'>

                                <UserPreview api_token={api_token} userDetail={userDetail}/>

                            </div>
                        </Col>
                    </div>

                </div>
            }
        </>


    );
};

export default UsersScreen;
