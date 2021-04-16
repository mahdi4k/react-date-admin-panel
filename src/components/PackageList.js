import React, {useState} from 'react';
import DeleteModal from "./DeleteModal";
import UpdatePackage from "./UpdatePackage";

const PackageList = ({title, price, days,packageID,api_token}) => {
    const [show, setShow] = useState(false);
    const [Updateshow, setUpdateShow] = useState(false);
    const [packageUpdated, setPackageUpdated] = useState(Array);

    const updateBoxShow = () => setUpdateShow(true);
    const DeleteBoxShow = () => setShow(true);

    return (
        <>
            <div className='package-list d-flex mt-4 flex-wrap flex-column flex-xl-row'>

                <div
                    className='Account-status py-4 col-12 col-lg-4
                                      premium '>
                                    <span>
                                        <svg viewBox="0 0 100 100" className="icon shape-codepen">
                                           <use xlinkHref="/img/sidebar/sprite.svg#fr-crown"/>
                                        </svg>
                                    </span>
                    <p>{packageUpdated.title ? packageUpdated.title : title }</p>
                </div>
                <div className='  col-12 col-lg-2 per-month
                                 flex-xl-row pl-3 pr-lg-3 pr-md-3 py-md-4 justify-content-center'>
                    <i className="fal fa-money-bill mr-3"></i>
                    <p>$ {packageUpdated.price ? packageUpdated.price :price} per month</p>
                </div>

                <div className='user-setting col-lg-6 col-12 flex-column flex-lg-row'>
                    <div className='d-flex align-items-center'>
                        <i className="fal fa-clock"></i>
                        <p>{packageUpdated.days ? packageUpdated.days : days } day</p>
                    </div>

                    <div className='d-flex'>
                        <div onClick={updateBoxShow} className='d-flex align-items-center'>
                                        <span className='edit'>
                                            <i className="fal fa-edit"> </i>
                                            <p>Edit</p>
                                        </span>
                        </div>
                        <div   className='d-flex align-items-center'>
                                        <span className='delete'>
                                            <i className="fal fa-times"> </i>

                                         </span>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteModal
                show={show}
                setShow={setShow}
                headerTitle={'Delete package'}
                subTitle={'Are you sure to permanently delete the package? you can’t undo this action'}
            />
            <UpdatePackage
                show={Updateshow}
                setShow={setUpdateShow}
                packageID={packageID}
                price={price}
                days={days}
                title={title}
                api_token={api_token}
                setPackageUpdated={setPackageUpdated}
            />
        </>
    );
};

export default PackageList;
