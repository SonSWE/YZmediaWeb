import React, { useState, useImperativeHandle } from "react";

import { Form as FormLayout, Modal, Button } from "antd";

const FormPopup = React.forwardRef((options, ref) => {
  const confirmSave =
    options.confirmSave != undefined ? options.confirmSave : true;
  const confirmCancel =
    options.confirmCancel != undefined ? options.confirmCancel : true;
  const labelBtnSave =
    options.labelBtnSave != undefined ? options.labelBtnSave : "Xác nhận";
  const isShowSaveBtn =
    options.isShowSaveBtn != undefined ? options.isShowSaveBtn : true;
  const labelBtnCancel =
    options.labelBtnCancel != undefined ? options.labelBtnCancel : "Đóng";

  const [modalOpen, setModalOpen] = useState(false);

  const [action, setAction] = useState("");
  const [form] = FormLayout.useForm();
  const [rowSelected, setRowSelected] = useState({});

  useImperativeHandle(ref, () => ({
    onEvent: (data) => {
      if (data.type === "OPEN_POPUP") {
        setRowSelected(data?.data.values);
        setAction(data?.data.action);
        changeValue(data?.data.values);
        setModalOpen(true);
      } else if (data.type === "CLOSE_POPUP") {
        closeModal(true);
        // form.resetFields();

        // setRowSelected(null);
        // setModalOpen(false);
        // setAction("");
      }
    },
  }));

  const onSubmit = (action) => {
    if (confirmSave) {
      Modal.confirm({
        title: "Xác nhận",
        content: "Bạn có chắc chắn muốn lưu thông tin?",
        okText: "Xác nhận",
        cancelText: "Đóng",
        centered: true,
        onOk: () => {
          callSubmit();
        },
      });
    } else {
      callSubmit();
    }
  };

  const callSubmit = () => {
    form.submit();
    form
      .validateFields()
      .then((values) => {
        options?.submit(values, action).then((data) => {
          if (data != null) {
            closeModal();
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

  const closeModal = (isConfirm = false) => {
    if (isConfirm && confirmCancel) {
      Modal.confirm({
        title: "Xác nhận",
        content: "Bạn có chắc chắn muốn thoát?",
        okText: "Xác nhận",
        cancelText: "Đóng",
        centered: true,
        onOk: () => {
          form.resetFields();

          setRowSelected(null);
          setModalOpen(false);
          setAction("");
        },
      });
    } else {
      form.resetFields();

      setRowSelected(null);
      setModalOpen(false);
      setAction("");
    }
  };

  const footerBtn = () => {
    var lstBtn = [];
    if (isShowSaveBtn) {
      lstBtn.push(
        <Button
          key="ok"
          htmlType="submit"
          type="outline"
          hidden={action === "details"}
          onClick={() => {
            onSubmit(action);
          }}
        >
          {labelBtnSave}
        </Button>
      );
    }

    lstBtn.push(
      <Button
        key="cancel"
        type="primary"
        onClick={() => {
          if (action === "details") {
            if (options.onCancel != undefined) {
              options.onCancel(action);
            } else {
              closeModal();
            }
          } else {
            if (options.onCancel != undefined) {
              options.onCancel(action);
            } else {
              closeModal(true);
            }
          }
        }}
      >
        {labelBtnCancel}
      </Button>
    );
    return lstBtn;
  };

  return (
    <>
      {modalOpen && (
        <Modal
          title={options?.formTitle(action)}
          centered
          width={1226}
          open={modalOpen}
          onCancel={() => {
            if (action === "details") {
              closeModal();
            } else {
              closeModal(true);
            }
          }}
          footer={footerBtn()}
          className="ant-modal-scrollbar"
        >
          <FormLayout
            form={form}
            disabled={action === "details" ? true : false}
            className={action === "details" ? "ant-form-details" : ""}
          >
            <options.formContent {...{ form, action, rowSelected }} />
          </FormLayout>
        </Modal>
      )}
    </>
  );
});

export default FormPopup;
