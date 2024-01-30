import React from "react";
import { Form, Select } from "antd";
import { useGlobalConst } from "../../utils/constData";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCode } from "../../store/actions/sharedActions";

const { Option } = Select;

const SelectAllcodeV2 = ({
  form,
  label,
  name,
  Cdname,
  Cdtype,
  defaultValue,
  placeholder = "",
  isRequired = false,
  mode = "single",
  onChange,
}) => {
  const { getFieldValue, setFieldValue } = form;
  const allCode = getAllCode();
  const globalConst = useGlobalConst();
  const rules = isRequired ? [globalConst.ANT.FORM.RULES.yeuCauNhap] : [];

  useEffect(() => {
    if (defaultValue) {
      setFieldValue(name, defaultValue.toString());
    } else {
      const value = getFieldValue(name);
      setFieldValue(name, value.toString());
    }
  }, [defaultValue]);
  return (
    <Form.Item name={name} label={label} mode="single" rules={rules}>
      <Select
        allowClear
        mode={mode}
        showSearch
        optionFilterProp="children"
        placeholder={placeholder}
        {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT}
        onChange={(e) => {
          try {
            if (onChange != undefined) {
              onChange(e);
            }
          } catch (ex) {}
        }}
      >
        {allCode
          ?.filter((e) => e.Cdname === Cdname && e.Cdtype === Cdtype)
          .map((item, key) => (
            <Option key={key} value={item.Cdval}>
              {item.Content}
            </Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default SelectAllcodeV2;
