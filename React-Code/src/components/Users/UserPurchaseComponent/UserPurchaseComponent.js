import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookedLiveStreamListComponent from "./BookedLiveStreamListComponent";
import BookedOneToOneSessionComponent from "./BookedOneToOneSessionComponent";

function UserPurchaseComponent() {
    const [activeTab, setactiveTab] = useState('LIVE CLASSES');
    const tabs = [
        { id: 1, tab: 'LIVE CLASSES' },
        { id: 2, tab: 'ONE-TO-ONES' },
    ];
    const handleActiveTab = (e, activeTabName) => {
        e.preventDefault();
        setactiveTab(activeTabName);
    };
    return (
        <section className="general-oto-streams-section" id="general-oto-streams-section">
            <div className="general-oto-streams-div">
                <div className="container container-1200">

                    <div className="row" style={{ marginTop: '30px' }}>
                        <div className="col-lg-12 col-md-12">
                            <div className="general-oto-heading-div">
                                <h1>My Purchases</h1>
                            </div>
                        </div>
                    </div>

                    <div className="general-oto-streams-common-div">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">

                                <div className="tabs-root-common">

                                    <div className="tabs-header-common">
                                        <ul className="nav nav-tabs">
                                            {tabs.length > 0 &&
                                                tabs.map((tabsData) => {
                                                    return (
                                                        <li
                                                            className="nav-item"
                                                            key={tabsData.id}
                                                            onClick={(e) => {
                                                                handleActiveTab(e, tabsData.tab);
                                                            }}
                                                        >
                                                            <Link
                                                                className={`nav-link text-uppercase ${activeTab === tabsData.tab ? 'active show' : ''
                                                                    }`}
                                                                data-toggle="tab"
                                                                to="#"
                                                            >
                                                                {tabsData.tab}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>

                                    <div className="tabs-body-common">
                                        <div className="tab-content">
                                            <div
                                                id="general-tab-01"
                                                className={`tab-pane fade ${activeTab === 'LIVE CLASSES' ? 'active show' : ''
                                                    } `}
                                            >
                                                {activeTab === 'LIVE CLASSES' && <BookedLiveStreamListComponent />}
                                            </div>
                                            <div
                                                id="oto-tab-02"
                                                className={`tab-pane fade ${activeTab === 'ONE-TO-ONES' ? 'active show' : ''
                                                    } `}
                                            >
                                                {activeTab === 'ONE-TO-ONES' && <BookedOneToOneSessionComponent />}
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default UserPurchaseComponent;
