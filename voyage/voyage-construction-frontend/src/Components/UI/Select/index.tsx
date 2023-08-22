import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import FeildErrorMessage from "../../UI/FeildErrorMessage"

export interface SelectProps {
  control:any,
  options:Array<any>,
  name:string,
  rules:any,
  errors:any,
  onChangeSelect?: any,
  index: Number,
  disbaled:boolean
  //   menuItemStyle?: any;
}

export default function index(props: SelectProps) {
  const {
    control,
    options,
    name,
    rules,
    errors,
    onChangeSelect,
    index,
    disbaled
  } = props


  return (
    <>

      <Controller
        control={control}
        name={name}
        // rules={rules}
        render={({ field: { onChange, value, name, ref } }: any) => (
          <Select
          classNamePrefix="form-control-language"
            options={options}
            name={name}
            value={options?.filter((c: any) => c.value === value)}
            onChange={(val: any) => onChangeSelect(val, name,index)}
            isSearchable
            isDisabled={disbaled}
          />
        )}
      />
      <FeildErrorMessage
        errors={errors}
        name="Owner"
        containerClass="w-100"
      />
    </>
  );
}

// export default Selects;
