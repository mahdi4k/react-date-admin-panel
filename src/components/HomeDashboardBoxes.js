import React, {useEffect, useState} from 'react';
import apiClient from "../services/EventService";
import moment from "moment";
import Loader from "./Loader";

const HomeDashboardBoxes = ({api_token, ActivityFilter}) => {
    const [percentUser, setPercentUser] = useState(Number)
    const [percentMatchUser, setPercentMatchUser] = useState(Number)
    const [percentPremiumUser, setPercentPremiumUser] = useState(Number)

    const [User, setUser] = useState(Number)
    const [MatchUser, setMatchUser] = useState(Number)
    const [PremiumUser, setPremiumUser] = useState(Number)

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function getUsersDetail() {
            try {
                setLoading(true)
                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }
                switch (ActivityFilter) {
                    case 'last month':
                        let lastMonth = moment().startOf('day').subtract(1, 'month').format('YYYY-MM-DD');
                        let lastTwoMonth = moment().startOf('day').subtract(2, 'month').format('YYYY-MM-DD');

                        //user count percent
                        const userCountLastMonth = await apiClient.get(`/users?deleted=false&createdAt_gt=${lastMonth}`, config)
                        const userCountLastTwoMonth = await apiClient.get(`/users?deleted=false&createdAt_gt=${lastTwoMonth}&createdAt_lt=${lastMonth}`, config)

                        //match user count percent
                        const matchCountLastMonth = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastMonth}`, config)
                        const matchCountLastTwoMonth = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastTwoMonth}&createdAt_lt=${lastMonth}`, config)

                        //like user count percent
                        const PremiumUserCountLastMonth = await apiClient.get(`users/count?premiumUntil_gt=${lastMonth}`, config)
                        const PremiumUserLikeCountLastTwoMonth = await apiClient.get(`/users/count?deleted=false&premiumUntil_gt=${lastTwoMonth}&premiumUntil_lt=${lastMonth}`, config)


                        setPercentUser((userCountLastMonth.data.length - userCountLastTwoMonth.data.length) / userCountLastMonth.data.length * 100)
                        setPercentMatchUser((matchCountLastMonth.data - matchCountLastTwoMonth.data) / matchCountLastMonth.data * 100)
                        setPercentPremiumUser((PremiumUserCountLastMonth.data - PremiumUserLikeCountLastTwoMonth.data) / PremiumUserCountLastMonth.data * 100)

                        setUser(userCountLastMonth.data.length)
                        setMatchUser(matchCountLastMonth.data)
                        setPremiumUser(PremiumUserCountLastMonth.data)

                        break;
                    case 'this week':
                        let lastWeek = moment().startOf('day').subtract(1, 'week').format('YYYY-MM-DD');
                        let lastTwoWeek = moment().startOf('day').subtract(2, 'week').format('YYYY-MM-DD');

                        //user count percent
                        const userCountLastWeek = await apiClient.get(`/users?deleted=false&createdAt_gt=${lastWeek}`, config)
                        const userCountLastTwoWeek = await apiClient.get(`/users?deleted=false&createdAt_gt=${lastTwoWeek}&createdAt_lt=${lastWeek}`, config)

                        //match user count percent
                        const matchCountLastWeek = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastWeek}`, config)
                        const matchCountLastTwoWeek = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastTwoWeek}&createdAt_lt=${lastWeek}`, config)

                        //like user count percent
                        const PremiumUserCountLastWeek = await apiClient.get(`users/count?premiumUntil_gt=${lastWeek}`, config)
                        const PremiumUserLikeCountLastTwoWeek = await apiClient.get(`/users/count?deleted=false&premiumUntil_gt=${lastTwoWeek}&premiumUntil_lt=${lastTwoWeek}`, config)


                        setPercentUser((userCountLastWeek.data.length - userCountLastTwoWeek.data.length) / userCountLastWeek.data.length * 100)
                        setPercentMatchUser((matchCountLastWeek.data - matchCountLastTwoWeek.data) / matchCountLastWeek.data * 100)
                        setPercentPremiumUser((PremiumUserCountLastWeek.data - PremiumUserLikeCountLastTwoWeek.data) / PremiumUserCountLastWeek.data * 100)

                        setUser(userCountLastWeek.data.length)
                        setMatchUser(matchCountLastWeek.data)
                        setPremiumUser(PremiumUserCountLastWeek.data)
                        break;
                    case 'today':

                        let lastDay = moment().startOf('day').subtract(1, 'day').format('YYYY-MM-DD');
                        let lastTwoDay = moment().startOf('day').subtract(2, 'day').format('YYYY-MM-DD');

                        //user count percent
                        const userCountLastDay = await apiClient.get(`/users?deleted=false&createdAt_gt=${lastDay}`, config)
                        const userCountLastTwoDay = await apiClient.get(`/users?deleted=false&createdAt_gt=${lastTwoDay}&createdAt_lt=${lastTwoDay}`, config)

                        //match user count percent
                        const matchCountLastDay = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastDay}`, config)
                        const matchCountLastTwoDay = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastTwoDay}&createdAt_lt=${lastDay}`, config)

                        //like user count percent
                        const PremiumUserCountLastDay = await apiClient.get(`users/count?premiumUntil_gt=${lastDay}`, config)
                        const PremiumUserLikeCountLastTwoDay = await apiClient.get(`/users/count?deleted=false&premiumUntil_gt=${lastTwoDay}&premiumUntil_lt=${lastTwoDay}`, config)


                        setPercentUser((userCountLastDay.data.length - userCountLastTwoDay.data.length) / userCountLastDay.data.length * 100)
                        setPercentMatchUser((matchCountLastDay.data - matchCountLastTwoDay.data) / matchCountLastDay.data * 100)
                        setPercentPremiumUser((PremiumUserCountLastDay.data - PremiumUserLikeCountLastTwoDay.data) / PremiumUserCountLastDay.data * 100)

                        setUser(userCountLastDay.data.length)
                        setMatchUser(matchCountLastDay.data)
                        setPremiumUser(PremiumUserCountLastDay.data)

                        break;

                }

                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }

        getUsersDetail()
    }, [api_token, ActivityFilter, setLoading])

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
                    {loading ? <Loader/> :
                        <>
                            <div className="numberUser">
                                <p>{User}</p>
                            </div>

                            <div className="footer-box d-flex">
                                {percentUser > 0 ? <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/> :
                                    <img className='users-icon mr-2' src="./img/arrow-dwon.svg" alt=""/>}
                                <p className={percentUser > 0 ? 'percent upPercent' : 'percent downPercent'}>{isNaN(percentUser) ? 0 : Math.round(percentUser)}%</p>
                                <p> than last {ActivityFilter}</p>
                            </div>
                        </>

                    }
                </div>

                <div className='box mb-3 mb-xxl-0 col-12 col-xxl-4 p-4'>

                    <div className="header-box d-flex align-items-center">
                                        <span className='match-box '>
                                           <i className='far fa-heart '></i>
                                        </span>
                        <p className='mb-0 ml-3 font-weight-bold'>MATCH USERS</p>
                    </div>
                    {loading ? <Loader/> :
                        <>
                            <div className="numberUser">
                                <p>{MatchUser}</p>
                            </div>

                            <div className="footer-box d-flex">
                                {percentMatchUser > 0 ?
                                    <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/> :
                                    <img className='users-icon mr-2' src="./img/arrow-dwon.svg" alt=""/>}
                                <p className={percentMatchUser > 0 ? 'percent upPercent' : 'percent downPercent'}>{isNaN(percentMatchUser) ? 0 : Math.round(percentMatchUser)}%</p>
                                <p> than last {ActivityFilter}</p>
                            </div>
                        </>
                    }
                </div>

                <div className='box mb-3 mb-xxl-0 col-12 col-xxl-4 p-4'>
                    <div className="header-box d-flex align-items-center">
                                        <span className='crown-box p-3'>
                                            <img className='crown-icon' src="./img/sidebar/fr-crown.svg" alt=""/>
                                        </span>
                        <p className='mb-0 ml-3 font-weight-bold'>PREMIUM USERS</p>
                    </div>
                    {loading ? <Loader/> :
                        <>
                            <div className="numberUser">
                                <p>{PremiumUser}</p>
                            </div>

                            <div className="footer-box d-flex">
                                {percentPremiumUser > 0 ?
                                    <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/> :
                                    <img className='users-icon mr-2' src="./img/arrow-dwon.svg" alt=""/>}
                                <p className={percentPremiumUser > 0 ? 'percent upPercent' : 'percent downPercent'}>{isNaN(percentPremiumUser) ? 0 : Math.round(percentPremiumUser)}%</p>
                                <p> than last {ActivityFilter}</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default HomeDashboardBoxes;