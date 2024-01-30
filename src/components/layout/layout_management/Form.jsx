import React, { useState, useRef, useImperativeHandle } from "react";

import { Form as FormLayout, Modal, Button } from "antd";
import { useLocation } from "react-router-dom";

const Form = React.forwardRef(({ config, onEvent }, ref) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [action, setAction] = useState("");
  const [form] = FormLayout.useForm();
  const [rowSelected, setRowSelected] = useState({});

  useImperativeHandle(ref, () => ({
    onEvent: (data) => {
      if (data.type === "OPEN_POPUP") {
        setModalOpen(true);
        setAction(data?.data.action);
        changeValue(data?.data.values);
      }
      if (data.type === "SELECTION_ROW_CHANGE") {
        setRowSelected(data?.data);
      }
      if (data.type === "REFRESH_FORM") {
        form.resetFields();

        setRowSelected([]);
        setModalOpen(false);
        setAction("");
      }
    },
  }));

  const onSubmit = (action) => {
    form.submit();
    form
      .validateFields()
      .then((values) => {
        config.onsubmit(values, action).then((data) => {
          if (data != null) {
            closeModal();
            onEvent({
              type: "REFRESH_FORM",
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeValue = (key, value) => {
    if (typeof key === "object") {
      form.setFieldsValue(key);
    } else {
      form.setFieldValue(key, value);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      {modalOpen && (
        <Modal
          title={config?.formTitle(action)}
          centered
          width={1226}
          open={modalOpen}
          onCancel={() => closeModal()}
          footer={[
            <Button
              key="ok"
              htmlType="submit"
              type="outline"
              hidden={action === "details"}
              onClick={() => {
                onSubmit(action);
              }}
            >
              Xác nhận
            </Button>,
            <Button key="cancel" type="primary" onClick={() => closeModal()}>
              Đóng
            </Button>,
          ]}
          className="ant-modal-scrollbar"
        >
          <FormLayout
            form={form}
            disabled={action === "details" ? true : false}
            className={action === "details" ? "ant-form-details" : ""}
          >
            <config.component {...{ form, action, rowSelected }} />
          </FormLayout>
        </Modal>
      )}
    </>
  );
});

export default Form;
