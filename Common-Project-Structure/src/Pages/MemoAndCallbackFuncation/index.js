import React from 'react';
import Header from '../../Components/UI/Header';
// import WithMemoComponent from './WithMemoComponent';
// import WithoutMemoComponent from './WithoutMemoComponent';
// import WithoutUseMemo from './WithoutUseMemo';
import WithUseMemo from './WithUseMemo';
// import UseCallback from './UseCallback';

const index = () => (
  <>
    <Header />
    <div>
      {/* <WithoutMemoComponent />
      <div>=========================</div>
      <WithMemoComponent />
      <div>=========================</div>
      <WithoutUseMemo /> */}
      <div>=========================</div>
      <WithUseMemo />

      {/* <div>=========================</div>
      <UseCallback /> */}
    </div>
  </>
);

export default index;
