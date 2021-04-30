import React, {useEffect, useState} from 'react';
import {Col} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import '../css/Subscription-dashboard.scss'
import UserSubscription from "../components/UserSubscription";
import apiClient from "../services/EventService";
import moment from "moment";
import Search from "../components/Search";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";

const SubscriptionScreen = ({history}) => {

    const [loading, setLoading] = useState(true)
    const [api_token, setApitoken] = useState('')
    const [userSubscription, setSubscription] = useState([])
    const [AlluserSubscription, setAllSubscription] = useState([])
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(8);
    const [pageCount, setPageCount] = useState(0)
    const [searchCount, setSearchCount] = useState('')

    useEffect(() => {
        if (localStorage.getItem('user_api') === null) {
            history.push('/login')
        }
        const api_token = JSON.parse(localStorage.getItem('user_api'))
        setApitoken(api_token)

        async function subscriptionUser() {
            try {

                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const {data} = await apiClient.get(`/users?deleted=false&premiumUntil_gte=${moment().format('YYYY-MM-DD')}`, config)


                const SubscriptionSlice = data.slice(offset, offset + perPage)
                setSubscription(SubscriptionSlice)

                setPageCount(Math.ceil(data.length / perPage))
                setAllSubscription(data)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }

        subscriptionUser()

    }, [history, setSubscription, setLoading, api_token, offset,perPage])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(Math.ceil(selectedPage * perPage))

    };
    return (
        <>
            {
                loading ? <Loader/> :
                    <div className='dashboard '>
                        <div className='d-flex dashboard-subscription'>

                            <Col className='pl-0' md={2}>
                                <Sidebar UserSubscriptionScreen/>
                            </Col>
                            <Col className='w3-animate-opacity' md={10}>
                                <div className=" pr-3 pl-3 pt-5 pb-5">
                                    <div className="header-section d-flex justify-content-between">
                                        <h2 className='font-weight-bold'>Subscription</h2>
                                        <div className="search-box">
                                            <Search
                                                setUserData={setSubscription}
                                                countPerPage={perPage}
                                                setSearchCount={setSearchCount}
                                                AllUserdata={AlluserSubscription}/>

                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex flex-wrap'>
                                    {
                                        userSubscription.map(el => {

                                            return (
                                                <UserSubscription key={el._id} subscribeData={el}/>
                                            )
                                        })}
                                </div>


                                <div className={searchCount > 2 ? 'd-none' : ''}>
                                <ReactPaginate
                                        pageCount={pageCount}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}/>
                                </div>
                            </Col>

                        </div>

                    </div>
            }
        </>
    );
};

export default SubscriptionScreen;
