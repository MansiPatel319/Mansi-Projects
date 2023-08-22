import React from "react";

// css

export interface IcheckboxProps {
  name?: any;
  checkboxValue?: any;
  rules?: object;
  register?: any;
  id?: any;
  handleIconClick?: () => void;
}

export default function checkboxComponent(props: IcheckboxProps) {
  const { register, checkboxValue, rules, name, id, ...rest } = props;

  return (
    <input
      type="checkbox"
      //    className="form-control"
      name={name}
      id={id}
      // checked={checkboxValue}
      {...register(name)}
      // {...rest}
    />
  );
}

// export default checkboxComponent;
