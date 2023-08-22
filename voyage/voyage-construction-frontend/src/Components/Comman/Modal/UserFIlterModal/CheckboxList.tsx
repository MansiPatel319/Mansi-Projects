import React from 'react';
export interface CheckboxListProps {
  checkboxList?: any;
  name?:string
  handleChangeCheckbox?: any
}

const CheckboxList = ({ checkboxList, name,handleChangeCheckbox }: CheckboxListProps) => {
  return (
    <div className="tab-pane" id="area" role="tabpanel"  style={{ display: "block" }}>
      <div className="filtercheck-list">

        {checkboxList.map((statusItem: any) => (
          <div className="filtercheck-item">
            <input
              type="checkbox"
              name={`projects:${statusItem.id}`}
              checked={statusItem.isChecked}
              onChange={() =>
                handleChangeCheckbox(name, statusItem.id)
              }
            />
            <span className="fci-title">{statusItem.name}</span>
            {/* <span className="badge">4</span> */}
          </div>
        ))}



      </div>
    </div>

  );
}

export default CheckboxList;
