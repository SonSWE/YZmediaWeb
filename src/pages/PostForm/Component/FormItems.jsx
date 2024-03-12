import React, { useState, useEffect, useImperativeHandle } from "react";
import { useAxios } from "../../../../apiHelper/connection/APIConnection";
import { Form, Input, Select, DatePicker, Switch, Table } from "antd";
import { useGlobalConst } from "../../../../utils/constData";
import SelectSingleAllcode from "../../../../components/element/SelectSingleAllcode";
import { getUserFromStorage } from "../../../../store/actions/sharedActions";

const FormItems = React.forwardRef(({ form, action, rowSelected }, ref) => {
  const globalConst = useGlobalConst();
  const userStorage = getUserFromStorage();
  const [companySymbol, setCompanySymbol] = useState([]);
  const apiConnection = useAxios();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getSymbolComId() {
      const res = await apiConnection.httpRequest(
        "GET",
        `api/sh/symbol/get-by-com-id`,
        null,
        { p_com_id: userStorage.Reference_Id },
        true
      );
      setCompanySymbol(JSON.parse(res.jsondata));
    }
    getSymbolComId();

    setData(form.getFieldsValue());
  }, []);

  const symbolDetailColumns = [
    {
      title: "Mã trái phiếu",
      key: "Symbol",
      dataIndex: "Symbol",
      fixed: "left",
    },
    {
      title: "Số ĐKSH",
      dataIndex: "Primary_Code",
      key: "Primary_Code",
    },
    {
      title: "Số lượng sở hữu không lưu ký",
      dataIndex: "Qtty",
      key: "Qtty",
    },
    {
      title: "Số lượng sở hữu lưu ký",
      dataIndex: "Qtty_VSD",
      key: "Qtty_VSD",
    },
    {
      title: "Xem",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];

  useImperativeHandle(ref, () => ({}));

  return (
    <div className="ant-form-layout">
      <Form.Item name={"Share_Holder_Id"} hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name={"Com_Id"} hidden>
        <Input value={userStorage.Reference_Id} hidden />
      </Form.Item>
      <Form.Item label={`Số ĐKSH`} name={"Primary_Code"} rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}>
        <Input autoComplete="off" />
      </Form.Item>
      <SelectSingleAllcode
        name={"Share_Holder_Type"}
        labelName={"Loại cổ đông"}
        placeholderName={"Chọn loại cổ đông"}
        cdName={"SHARE_HOLDER"}
        cdType={"TYPE"}
        isRequired={true}
      />
      <Form.Item label={`Tên cổ đông`} name={"Share_Holder_Name"} rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}>
        <Input autoComplete="off" />
      </Form.Item>
      <SelectSingleAllcode
        name={"Dorf_Flag"}
        labelName={"Trong nước/Nước ngoài"}
        placeholderName={"Chọn"}
        cdName={"SHARE_HOLDER"}
        cdType={"DORF_FLAG"}
      />
      <SelectSingleAllcode
        name={"Borf_Flag"}
        labelName={"Loại khách hàng"}
        placeholderName={"Chọn loại khách hàng"}
        cdName={"SHARE_HOLDER"}
        cdType={"BORF_FLAG"}
      />
      <Form.Item
        label={`Ngày sinh`}
        name={"Birth_Date"}
        {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <DatePicker format={globalConst.ANT.LOCALE.dateFormat} placeholder="dd/MM/yyyy" />
      </Form.Item>
      <Form.Item label={`Số CMND/Số ĐKKD`} name={"Identify_No"} rules={[]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        label={`Ngày cấp`}
        name={"Identify_Date"}
        {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <DatePicker format={globalConst.ANT.LOCALE.dateFormat} placeholder="dd/MM/yyyy" />
      </Form.Item>
      <Form.Item label={`Nơi cấp`} name={"Identify_Address"} rules={[]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item label={`Địa chỉ`} name={"Address"} rules={[]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item label={`Nơi đăng ký hộ khẩu thường trú`} name={"Registered_Place"} rules={[]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item label={`Email`} name={"Email"} rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Table
        columns={columns}
        dataSource={[data]}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
});

export default FormItems;
