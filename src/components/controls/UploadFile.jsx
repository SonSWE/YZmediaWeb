import React, { useState, useEffect } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAxios } from "../../utils/APIConnection";

const UploadFile = (props) => {
  const axios = useAxios();
  const { fileList, setFileList } = props;
  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
      onSuccess("Ok");
  };
  const customRequest = async (options) => {
    // const { onSuccess, onError, file, onProgress } = options;
    // const fmData = new FormData();
    // const config = {
    //   headers: { "content-type": "multipart/form-data" },
    //   onUploadProgress: (event) => {
    //     onProgress({ percent: (event.loaded / event.total) * 100 });
    //   },
    // };
    // fmData.append("file", file);
    // onSuccess(file);
    return true;
  };

  const onUploadChange = (props) => {
    //console.log("onUploadChange: ", props);
    setFileList([props.fileList]);
  };

  const onRemove = (props) => {
    //console.log("onRemove: ", props);
    //console.log(fileList);
    setFileList(fileList.filter(function(item) {
      return item !== props;
    }));
    
  };

  return (
    <Upload
      // multiple
      // accept={"image/*"}
      customRequest={uploadImage}
      onRemove={onRemove}
      onChange={onUploadChange}
      fileList={fileList}
    >
      <Button type="text">
        <UploadOutlined /> Tải
      </Button>
    </Upload>
  );
};

export default UploadFile;
