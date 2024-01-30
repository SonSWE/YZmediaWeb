import React from "react";
import { Form, Select } from "antd";
import { useGlobalConst } from "../../utils/constData";
import { useSelector } from "react-redux";

const {Option} = Select;

const SelectSingleAllcode = (props) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);
  const { labelName, placeholderName, cdName, cdType, isRequired, name } = props;
  const rules = isRequired ? [globalConst.ANT.FORM.RULES.yeuCauNhap] : [];

  return (
    <Form.Item name={name} label={labelName} mode="single" {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT} rules={rules}>
      <Select allowClear mode="single" showSearch optionFilterProp="children" placeholder={placeholderName}>
        {allCode
          ?.filter((e) => e.Cdname === cdName && e.Cdtype === cdType)
          .map((item, key) => (
            <Option key={key} value={+item.Cdval}>
              {item.Content}
            </Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default SelectSingleAllcode;
