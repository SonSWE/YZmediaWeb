import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Row,
  Col,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Tooltip,
  Breadcrumb,
  Upload,
} from "antd";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faPlus,
  faTrash,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

import { AgGridReact } from "ag-grid-react";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { usePostsApi } from "../../apiHelper/api/PostsApi";
import { useGlobalConst } from "../../utils/constData";
import { getUserFromStorage } from "../../store/actions/sharedActions";
import { formatDate, formatNumber } from "../../utils/convertData";
import { Content } from "antd/lib/layout/layout";

const { TextArea } = Input;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();

  const globalConst = useGlobalConst();

  const apiClient = usePostsApi();
  const [postId, setPostId] = useState(0);
  const [Is_Private, setIs_Private] = useState(0);
  const [action, setAction] = useState("");

  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.authReducer);

  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  const [imageUrl, setImageUrl] = useState();
  const [thumbnail, setThumbnail] = useState([]);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    onSuccess("Ok");
  };

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url);
    });
  };

  useEffect(() => {
    setPostId(searchParams.get("id"));

    form.setFieldValue("Is_Private", Is_Private);
  }, []);
  useEffect(() => {
    if (postId != undefined && postId > 0) {
      //load post
    } else {
      setAction("create");
    }
  }, [postId]);

  const OnSubmit = () => {
    form.submit();
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        apiClient
          .Insert(values)
          .then((res) => {
            if (res && res.code > 0) {
              toast.success(res._responseMessage);
            } else {
              toast.error("Thêm mới thất bại");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb className="main-layout-breadcrumb">
            <Breadcrumb.Item>Danh sách bài viết</Breadcrumb.Item>
            <Breadcrumb.Item>Thêm mới bài viết</Breadcrumb.Item>
          </Breadcrumb>
          <div className="card-content">
            <Form form={form} disabled={action === "detail" ? true : false}>
              <div className="field-list">
                <Form.Item name={"Post_Id"} hidden>
                  <Input hidden />
                </Form.Item>

                <Form.Item
                  label={`Tên bài viết`}
                  name={"Post_Name"}
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Input autoComplete="off" />
                </Form.Item>

                <Form.Item
                  label={`Mô tả`}
                  name={"Post_Description"}
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  label={`Ảnh bìa`}
                  name={"Post_Thumbnail"}
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Upload
                    listType="picture-card"
                    className="thumbnail-uploader"
                    showUploadList={false}
                    customRequest={uploadImage}
                    fileList={thumbnail}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    style={{ height: "200px" }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <button
                        style={{
                          border: 0,
                          background: "none",
                        }}
                        type="button"
                      >
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </button>
                    )}
                  </Upload>
                </Form.Item>

                <Form.Item
                  name={"Is_Private"}
                  label={"Loại bài viết"}
                  mode="single"
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Select
                    mode="single"
                    optionFilterProp="children"
                    value={Is_Private}
                    onChange={(e) => {
                      setIs_Private(e);
                    }}
                  >
                    {allCode
                      ?.filter(
                        (e) =>
                          e.Cdname === "YZ_POSTS" && e.Cdtype === "IS_PRIVATE"
                      )
                      .map((item, key) => (
                        <Select.Option key={key} value={+item.Cdval}>
                          {item.Content}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                {Is_Private == 1 && (
                  <Form.Item
                    label={`Mật khẩu`}
                    name={"Password"}
                    rules={
                      Is_Private == 1
                        ? [globalConst.ANT.FORM.RULES.yeuCauNhap]
                        : []
                    }
                  >
                    <Input.Password placeholder="Mật khẩu" />
                  </Form.Item>
                )}
              </div>
            </Form>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type={"primary"}
                style={{ marginRight: "8px" }}
                onClick={OnSubmit}
              >
                Lưu
              </Button>
              <NavLink to={`/danh-sach-bai-viet`}>
                <Button type="outline">Quay lại</Button>
              </NavLink>
            </div>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Index;
