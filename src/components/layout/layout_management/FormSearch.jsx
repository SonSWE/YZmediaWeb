import React, { useState, useRef, useImperativeHandle, useEffect } from "react";

import { Form as FormLayout, Modal, Button } from "antd";
import { useLocation } from "react-router-dom";
import DateObject from "react-date-object";
import { ObjectValueToKeySearch } from "../../../utils/commonFunction";

const FormSearch = React.forwardRef(
  ({ config, headerConfig, onEvent }, ref) => {
    const refInput = useRef(null);
    const refTime = useRef(null);
    const location = useLocation();

    const [flag, setFlag] = useState(0);

    const [form] = FormLayout.useForm();

    const onSubmit = () => {
      form.submit();
      form
        .validateFields()
        .then((values) => {
          const keySearch = ObjectValueToKeySearch(values);
          onEvent({
            type: "HANDLE_SEARCH",
            data: keySearch,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    };

    const changeValue = (key, value) => {
      if (typeof key === "object") {
        form.setFieldsValue(key);
      } else {
        form.setFieldValue(key, value);
      }

      if (refTime.current) {
        clearTimeout(refTime.current);
      }
      refTime.current = setTimeout(() => {
        setFlag(new Date().getTime());
      }, 200);
    };

    useEffect(() => {
      form.resetFields();
      //default value search human
      changeValue({ Contract_Expire: "N", BirthdayInMonth: "N" });
    }, [location.pathname]);

    return (
      <FormLayout form={form}>
        <config.ItemSearch
          headerConfig={headerConfig}
          formInstance={form}
          setFormValues={changeValue}
          changeValue={changeValue}
          formItemLayout={{
            normalize: (val) => val ?? "",
          }}
          onSubmit={onSubmit}
          ref={refInput}
        />
      </FormLayout>
    );
  }
);

export default FormSearch;
