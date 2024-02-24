import React from "react";
import { useSelector } from "react-redux";

import { Form, Input, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const ItemSearch = React.forwardRef(({ formInstance, onSubmit }, ref) => {
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  return (
    <div className="group__table-search">
      <div className="group__table-row">
        <div className="ant-form-control ant-form-input">
          <label>Mô tả</label>
          <Form.Item name={"Text"}>
            <Input placeholder="Mô tả về đợt thực hiện quyền" />
          </Form.Item>
        </div>
        <div className="ant-form-control ant-form-input">
          <label>Ngày đăng ký cuối cùng</label>
          <Form.Item name={"Birthofdat_RANGE"}>
            <RangePicker
              format={"DD/MM/YYYY"}
              placeholder={["Từ ngày", "Đến ngày"]}
            />
          </Form.Item>
        </div>
        <div className="ant-form-control ant-form-input">
          <label>Ngày thực hiện quyền</label>
          <Form.Item name={"Corp_RANGE"}>
            <RangePicker
              format={"DD/MM/YYYY"}
              placeholder={["Từ ngày", "Đến ngày"]}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
});

export default ItemSearch;
