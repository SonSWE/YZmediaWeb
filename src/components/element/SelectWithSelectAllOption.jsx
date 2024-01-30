import { Button, Select } from "antd";
import React, { useMemo } from "react";

const SelectWithSelectAllOption = (props) => {
  const isCheckAll = useMemo(() => {
    return props.children && props.value && props.children.length == props.value.length;
  }, [props.value]);

  const toggleSelectAll = () => {
    if (isCheckAll) {
      props.onChange([]);
    } else if (props.children && props.children.length > 0) {
      var newSelectedValues = props.children.map((x) => x.props.value);
      props.onChange(newSelectedValues);
    }
  };

  return (
    <Select {...props} maxTagCount={1}>
      <Select.Option disabled={true} style={isCheckAll ? { backgroundColor: "var(--bg-ant-select-hover)", borderRadius: 8 } : null}>
        <a style={{ display: "block" }} onClick={toggleSelectAll}>
          <span>Chọn tất cả</span>
        </a>
      </Select.Option>

      {props.children}
    </Select>
  );
};

export default SelectWithSelectAllOption;
