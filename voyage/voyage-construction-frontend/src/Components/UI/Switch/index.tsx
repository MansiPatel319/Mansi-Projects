import React from 'react';
interface SwitchProps{
  holiday: Boolean,
  title: String,
  register: any,
  name: string,
  handleChangeCheckbox?: any,
  index:Number
}

const index = ({holiday,title,register,name, handleChangeCheckbox,index}:SwitchProps) => {
  return (
    <div className={holiday ? "switch-box" : "switch-box holiday"}>
    <label className="switch">
      <input type="checkbox" id="resonlybooking" {...register(name)} onChange={(e) => handleChangeCheckbox(e, index)} />
      <span className="slider round"></span>
    </label>
      <span className="switch-label">{title}</span>
</div>
  );
}

export default index;
