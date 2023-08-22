import React, { useState } from 'react';

// css
import '../../../Assets/css/styles.css';

// Helpers
import sampleListData from '../../../StaticData/Notification.json';
import { dateDifference } from '../../../Utils';

const ReactListingExample = () => {
  const [listData] = useState(sampleListData.unread_data);
  return (
    <div className="m-2">
      <h2>React Listing with date function</h2>
      <div>
        <div className="d-flex border border-bottom-0">
          <span className="m-1 list-demo-fname-header col-1">First Name</span>
          <span className="m-1 list-demo-fname-header col-1">Last Name</span>
          <span className="m-1 list-demo-fname-header col-2">Email</span>
          <span className="m-1 list-demo-fname-header col-2">Remark</span>
          <span className="m-1 list-demo-fname-header col-1">Remarked on</span>
        </div>
        {listData.map((data, index) => (
          <div key={`list_${index}`}>
            <div className="d-flex border">
              <span className="m-1 list-demo-fname-data col-1">
                {data.owner.first_name}
              </span>
              <span className="m-1 list-demo-fname-data col-1">
                {data.owner.last_name}
              </span>
              <span className="m-1 list-demo-fname-data col-2">
                {data.owner.email}
              </span>
              <span className="m-1 list-demo-fname-data col-2">
                {data.text}
              </span>
              <span className="m-1 list-demo-fname-data col-1">
                {dateDifference(data.date_created)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactListingExample;
