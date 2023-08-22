import React from 'react';
import useFetch from '../../../Hooks/useFetch';

const CustomHooksExample = () => {
  let {
    data: listData,
    error,
    isLoading,
  } = useFetch('http://dummy.restapiexample.com/api/v1/employees');

  return (
    <div className="m-2">
      <h2>React Listing with date function</h2>
      {error && (
        <div>
          <div className="d-flex border">{error}</div>
        </div>
      )}
      {isLoading && (
        <div>
          <div className="d-flex border">Loading....</div>
        </div>
      )}
      {listData && listData.length < 0 ? (
        <div>
          <div className="d-flex border">No Data Found</div>
        </div>
      ) : (
        <div>
          <div className="d-flex border border-bottom-0">
            <span className="m-1 list-demo-fname-header col-4">
              Employee Name
            </span>
            <span className="m-1 list-demo-fname-header col-4">
              Employee Salary
            </span>
            <span className="m-1 list-demo-fname-header col-4">
              Employee Age
            </span>
          </div>
          {listData.map((item, index) => (
            <div key={`list_${index}`}>
              <div className="d-flex border">
                <span className="m-1 list-demo-fname-data col-4">
                  {item.employee_name}
                </span>
                <span className="m-1 list-demo-fname-data col-4">
                  {item.employee_salary}
                </span>
                <span className="m-1 list-demo-fname-header col-4">
                  {item.employee_age}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomHooksExample;
