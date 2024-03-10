import { Button, Checkbox, Form, Input } from "antd";

import { useLoginApi } from "../../apiHelper/api/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import md5 from "md5";
import { saveUserToStorage } from "../../store/actions/sharedActions";

const Index = () => {
  const [form] = Form.useForm();
  const apiClient = useLoginApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    let param = {
      User_Name: values?.User_Name,
      Password: md5(values?.Password),
      Grant_Type: "password",
      Refresh_Token: "",
    };

    apiClient
      .Login(param)
      .then((res) => {
        if (res != undefined && res.status === 200 && res.data.User_Id > 0) {
          saveUserToStorage(res.data);
          dispatch({ type: "SET_USER", payload: res.data });

          if (values.remember === true) {
            localStorage.setItem(
              "userRemember",
              JSON.stringify({
                User_Name: values?.txtUsername,
                Password: values?.pwbPassword,
                Remember: values?.remember,
              })
            );
          }

          toast.success("Đăng nhập thành công");
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đăng nhập thất bại, không thể kết nối đến máy chủ!");
      });
  };
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Tài khoản"
          name={"User_Name"}
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name={"Password"}
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <div className="ant-form-remember">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ mật khẩu</Checkbox>
          </Form.Item>
        </div>
        <div className="login_footer">
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Index;
