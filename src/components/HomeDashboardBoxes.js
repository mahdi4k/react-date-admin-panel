import React, {useEffect, useState} from 'react';
import apiClient from "../services/EventService";
import moment from "moment";
import Loader from "./Loader";

const HomeDashboardBoxes = ({userDetails, api_token}) => {
const [percenttUser,setPercentUser]=useState(Number)
const [percentMatchUser,setPercentMatchUser]=useState(Number)
const [percentPremiumUser,setPercentPremiumUser]=useState(Number)
const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function getUsersDetail() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }
                let lastMonth = moment().startOf('day').subtract(1, 'month').format('YYYY-MM-DD');
                let lastTwoMonth = moment().startOf('day').subtract(2, 'month').format('YYYY-MM-DD');

                //user count percent
                const userCountLastMonth = await apiClient.get(`/users?createdAt_gt=${lastMonth}`, config)
                const userCountLastTwoMonth = await apiClient.get(`/users?createdAt_gt=${lastTwoMonth}&createdAt_lt=${lastMonth}`, config)

                //match user count percent
                const matchCountLastMonth = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastMonth}`, config)
                const matchCountLastTwoMonth = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastTwoMonth}&createdAt_lt=${lastMonth}`, config)

                //like user count percent
                const PremiumUserCountLastMonth = await apiClient.get(`users/count?premiumUntil_gt=${lastMonth}`, config)
                const PremiumUserLikeCountLastTwoMonth = await apiClient.get(`/users/count?premiumUntil_gt=${lastTwoMonth}&premiumUntil_lt=${lastMonth}`, config)



                setPercentUser((userCountLastMonth.data.length - userCountLastTwoMonth.data.length) /userCountLastMonth.data.length * 100)
                setPercentMatchUser((matchCountLastMonth.data - matchCountLastTwoMonth.data) /matchCountLastMonth.data * 100)
                setPercentPremiumUser((PremiumUserCountLastMonth.data - PremiumUserLikeCountLastTwoMonth.data) /PremiumUserCountLastMonth.data * 100)
                setLoading(false)
            } catch (e) {

            }
        }
        getUsersDetail()
    },[moment,api_token])

    return (
        <>
            <div className='home-box flex-wrap flex-xxl-nowrap justify-content-between d-flex'>
                <div className='box mb-3 mb-xxl-0 col-12 col-xxl-4 p-4'>
                    <div className="header-box d-flex align-items-center">
                                        <span className='user-box p-3'>
                                          <img className='users-icon' src="./img/sidebar/fr-users.svg" alt=""/>
                                        </span>
                        <p className='mb-0 font-weight-bold ml-3'>TOTAL USERS</p>
                    </div>
                    <div className="numberUser">
                        <p>{userDetails.userCount}</p>
                    </div>
                    {loading ? <Loader/> :
                        <div className="footer-box d-flex">
                            <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/>
                            <p className='percent upPercent'>{percenttUser}%</p>
                            <p>more than last month</p>
                        </div>
                    }
                </div>

                <div className='box mb-3 mb-xxl-0 col-12 col-xxl-4 p-4'>

                        <div className="header-box d-flex align-items-center">
                                        <span className='match-box '>
                                           <i className='far fa-heart '></i>
                                        </span>
                            <p className='mb-0 ml-3 font-weight-bold'>MATCH USERS</p>
                        </div>

                    <div className="numberUser">
                        <p>{userDetails.matchCount}</p>
                    </div>
                    {loading ? <Loader/> :
                        <div className="footer-box d-flex">
                            <img className='users-icon mr-2' src="./img/arrow-dwon.svg" alt=""/>
                            <p className='percent downPercent'>{percentMatchUser}%</p>
                            <p>more than last month</p>
                        </div>
                    }
                </div>

                <div className='box mb-3 mb-xxl-0 col-12 col-xxl-4 p-4'>
                    <div className="header-box d-flex align-items-center">
                                        <span className='crown-box p-3'>
                                            <img className='crown-icon' src="./img/sidebar/fr-crown.svg" alt=""/>
                                        </span>
                        <p className='mb-0 ml-3 font-weight-bold'>PREMIUM USERS</p>
                    </div>
                    <div className="numberUser">
                        <p>{userDetails.premiumUserCount}</p>
                    </div>
                    {loading ? <Loader/> :
                        <div className="footer-box d-flex">
                            <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/>
                            <p className='percent upPercent'>{percentPremiumUser}%</p>
                            <p>more than last month</p>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default HomeDashboardBoxes;