import React  from 'react';

const HomeDashboardBoxes = ({userDetails}) => {

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
                    <div className="footer-box d-flex">
                        <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/>
                        <p className='percent upPercent'>8.5%</p>
                        <p>more than last month</p>
                    </div>
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
                    <div className="footer-box d-flex">
                        <img className='users-icon mr-2' src="./img/arrow-dwon.svg" alt=""/>
                        <p className='percent downPercent'>5.5%</p>
                        <p>more than last month</p>
                    </div>
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
                    <div className="footer-box d-flex">
                        <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/>
                        <p className='percent upPercent'>13.5%</p>
                        <p>more than last month</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeDashboardBoxes;