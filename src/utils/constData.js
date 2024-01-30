import moment from "moment";
import dayjs from "dayjs";
import { formatNumber } from "./convertData";

export const removeAccents = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export const useGlobalConst = () => {
  return {
    FORM: {},
    CODE: {
      CORPORATE_TYPE: {
        Tra_Co_Tuc_Bang_Tien: 1,
        Tra_Co_Tuc_Bang_CP: 2,
        Phat_Hanh_Them: 3,
      },
      SHARE_TYPE: {
        Co_Phan_Pho_Thong: 0,
      },
      LIMITED_VOTE: {
        Khong: 0,
        Co: 1,
      },
      LIMITED_TRANFE: {
        Khong: 0,
        Co: 1,
      },
      ROUND_RATE: {
        LamTronSoHoc: 0,
        LamTronXuong: "1",
        LamTronLen: 2,
      },
      CORPORATE_ACTION_STATUS: {
        BINH_THUONG: 0,
        DA_DUYET: 1,
        DA_CHOT: 2,
        DA_THUC_HIEN: 2,
      },
      TODO_TYPE: {
        BINH_THUONG: 0,
        DA_DUYET: 1,
        DA_CHOT: 2,
        DA_THUC_HIEN: 2,
      },
    },
    ANT: {
      FORM: {
        RULES: {
          yeuCauNhap: {
            required: true,
            message: `Không được để trống`,
          },
          chiNhapEmail: {
            type: "email",
            message: `Không đúng định dạng email`,
          },
          khongKhoangTrang: {
            pattern: /[^\s]/,
            message: `Không hợp lệ`,
          },
          koDuocNhapKyTuDacBiet: {
            pattern: /^[a-zA-Z0-9]*$/,
            message: `Không được có ký tự đặc biệt`,
          },
          chiNhapChu: {
            pattern: /^[A-Za-z_-]*$/,
            message: `Chỉ nhập chữ`,
          },
          soDienThoai: () => ({
            validator(_, value) {
              if (value && !/^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) === true) {
                return Promise.reject(
                  new Error(`Không đúng định dạng của số điện thoại`)
                );
              }
              return Promise.resolve();
            },
          }),
          chiNhapSo: () => ({
            validator(_, value) {
              if (value && !/^[0-9]+$/.test(value) === true) {
                return Promise.reject(new Error(`Chỉ nhập số`));
              }
              return Promise.resolve();
            },
          }),
          chiNhapSoThapPhan: () => ({
            validator(_, value) {
              if (value && !/^\d+(\.\d+)?$/.test(value)) {
                return Promise.reject(
                  new Error("Chỉ nhập số hoặc số thập phân")
                );
              }
              return Promise.resolve();
            },
          }),
          chiNhapSoDuong: () => ({
            validator(_, value) {
              if (value < 0) {
                return Promise.reject(new Error(`Chỉ nhập số lớn hơn 0`));
              }
              return Promise.resolve();
            },
          }),
          chiNhapSoNguyen: () => ({
            validator(_, value) {
              if (Number.isInteger(+value) === false) {
                return Promise.reject(new Error(`Chỉ nhập số nguyên`));
              }
              return Promise.resolve();
            },
          }),
          soLonHonKhong: () => ({
            validator(_, value) {
              if (value <= 0) {
                return Promise.reject(new Error(`Chỉ nhập số lớn hơn 0`));
              }
              return Promise.resolve();
            },
          }),
          soNhoHonHoacBang: (numberInput, name, digit = "") => {
            return ({ getFieldValue }) => ({
              validator(_, value) {
                var number = getFieldValue(numberInput);
                if (value && number && value > number) {
                  return Promise.reject(
                    new Error(`Phải nhỏ hơn hoặc bằng ${name} ${digit}`)
                  );
                }
                return Promise.resolve();
              },
            });
          },
          lonHonHienTai: () => ({
            validator(_, value) {
              if (moment(value + "", "YYYY-MM-DD").format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) {
                return Promise.reject(new Error(`Phải lớn hơn ngày hiện tại`));
              }
              return Promise.resolve();
            },
          }),
          ngayLonHonHoacBang: (dateInput, name, digit = "") => {
            return ({ getFieldValue }) => ({
              validator(_, value) {
                // value = value + "";
                var date = getFieldValue(dateInput);
                if (
                  value &&
                  date &&
                  moment(value + "", "YYYY/MM/DD").format("YYYY/MM/DD") <
                    moment(date, "YYYY/MM/DD")?.format("YYYY/MM/DD")
                ) {
                  if (
                    !(value + "")?.includes("00010101") &&
                    value + "" != "0"
                  ) {
                    return Promise.reject(
                      new Error(`Phải lớn hơn hoặc bằng ${name} ${digit}`)
                    );
                  }
                }
                return Promise.resolve();
              },
            });
          },
          ngayLonHonSoSanh: (dateInput, name, digit = "") => {
            return ({ getFieldValue }) => ({
              validator(_, value) {
                // value = value + "";
                var date = getFieldValue(dateInput);
                if (
                  value &&
                  date &&
                  moment(value + "", "YYYY/MM/DD").format("YYYY/MM/DD") <=
                  moment(date, "YYYY/MM/DD")?.format("YYYY/MM/DD")
                ) {
                  if (
                    !(value + "")?.includes("00010101") &&
                    value + "" != "0"
                  ) {
                    return Promise.reject(
                      new Error(`Phải lớn hơn ${name} ${digit}`)
                    );
                  }
                }
                return Promise.resolve();
              },
            });
          },
          ngayNhoHonSoSanh: (dateInput, name) => {
            return ({ getFieldValue }) => ({
              validator(_, value) {
                // value = value + "";
                var date = getFieldValue(dateInput);
                console.log(value);
                if (
                  value &&
                  date &&
                  moment(value + "", "YYYY/MM/DD").format("YYYY/MM/DD") >
                  moment(date, "YYYY/MM/DD")?.format("YYYY/MM/DD")
                ) {
                  if (
                    !(value + "")?.includes("00010101") &&
                    value + "" != "0"
                  ) {
                    return Promise.reject(new Error(`Phải nhỏ hơn ${name}`));
                  }
                }
                return Promise.resolve();
              },
            });
          },
          ngayNhoHonDateRange: (dateInput, name) => {
            return ({ getFieldValue }) => ({
              validator(_, value) {
                var date = getFieldValue(dateInput);

                if (value != undefined && value != null) {
                  if (
                    value[1].format("YYYY/MM/DD") >=
                    moment(date, "YYYY/MM/DD")?.format("YYYY/MM/DD")
                  ) {
                    if (
                      !(value[1] + "")?.includes("00010101") &&
                      value[1] + "" != "0"
                    ) {
                      return Promise.reject(new Error(`Phải nhỏ hơn ${name}`));
                    }
                  }
                }

                return Promise.resolve();
              },
            });
          },
          percentAndRatio: () => ({
            validator(_, value) {
              // Kiểm tra xem chuỗi có phải là phần trăm hay không
              const percentPattern = /^\d+%$/;

              // Kiểm tra xem chuỗi có phải là tỷ lệ hay không
              const ratiotyLePattern = /^\d+:\d+$/;

              if (
                !percentPattern.test(value) &&
                !ratiotyLePattern.test(value)
              ) {
                return Promise.reject(
                  new Error(
                    "chỉ có thể nhập dạng: phần trăm 'số + %' hoặc tỷ lệ 'số:số' !"
                  )
                );
              }

              return Promise.resolve();
            },
          }),
          percent: () => ({
            validator(_, value) {
              // Kiểm tra xem chuỗi có phải là phần trăm hay không
              const percentPattern = /^\d+%$/;
              const percentPattern2 = /^\d+\.\d+%$/;

              if (!percentPattern.test(value) && !percentPattern2.test(value)) {
                return Promise.reject(
                  new Error(
                    "chỉ có thể nhập dạng: phần trăm 'số + %'!"
                  )
                );
              }

              return Promise.resolve();
            },
          }),
          Ratio: () => ({
            validator(_, value) {
              if (value) {
                // Kiểm tra xem chuỗi có phải là tỷ lệ hay không
                const ratiotyLePattern = /^\d+:\d+$/;

                if (!ratiotyLePattern.test(value)) {
                  return Promise.reject(
                    new Error("Chỉ có thể nhập dạng tỷ lệ 'số:số' !")
                  );
                }
              }
              return Promise.resolve();
            },
          }),

          // Kiểm tra xem chuỗi có phải number1|number2|number3
          check_Limited_Tranfer_Calendar: (check) => ({
            validator(_, value) {
              if (value) {
                const pattern = /\d+(\|\d+)*$/;

                if (!pattern.test(value)) {
                  return Promise.reject(
                    new Error(
                      "Chỉ có thể nhập số cách nhau bởi dấu | (vd: x1|x2|x3)"
                    )
                  );
                }
              }

              return Promise.resolve();
            },
          }),

          validateEmailOrPhone: () => ({
            validator(_, value) {
              const phonePattern = /^[0-9]{10}$/; // For a basic 10-digit number validation
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              let validatePhone = phonePattern.test(value);
              let validateEmail = emailPattern.test(value);

              if (validatePhone || validateEmail) {
                return Promise.resolve();
              } else {
                return Promise.reject(
                  new Error("Số điện thoại hoặc email không hợp lệ")
                );
              }
            },
          }),
          validatePassword: () => ({
            validator(_, value) {
              //độ dài tu 8 -20
              const lengthRegex = /^[\S]{8,20}$/;
              if (!lengthRegex.test(value)) {
                return Promise.reject(
                  new Error("Mật khẩu phải từ 8 đến 20 kí tự")
                );
              }

              // Kiểm tra ít nhất 3 trong 4 loại ký tự: chữ hoa, chữ thường, số, ký tự đặc biệt
              const uppercaseRegex = /[A-Z]/;
              const lowercaseRegex = /[a-z]/;
              const digitRegex = /\d/;
              const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

              let criteriaCount = 0;

              if (uppercaseRegex.test(value)) {
                criteriaCount++;
              }
              if (lowercaseRegex.test(value)) {
                criteriaCount++;
              }
              if (digitRegex.test(value)) {
                criteriaCount++;
              }
              if (specialCharRegex.test(value)) {
                criteriaCount++;
              }

              if (criteriaCount < 3) {
                return Promise.reject(
                  new Error(
                    "Mật khẩu phải chứa ít nhất 3 trong 4 loại ký tự chữ hoa, chữ thường, số và ký tự đặc biệt"
                  )
                );
              }

              return Promise.resolve();
            },
          }),

          validateConfirmPassword: (password) => {
            return ({ getFieldValue }) => ({
              validator(_, value) {
                var pw = getFieldValue(password);

                if (value != undefined && value != null && value !== pw) {
                  return Promise.reject(
                    new Error(`Mật khẩu nhập lại không khớp`)
                  );
                }

                return Promise.resolve();
              },
            });
          },
        },
        ITEM: {
          INPUT: {
            FORMAT_NUMBER: {
              getValueProps: (i) => {
                return {
                  value: i ? formatNumber(i) : "0",
                };
              },
            },
          },
          INPUT_NUMBER: {
            FORMAT_NUMBER: {
              getValueProps: (i) => ({
                value: formatNumber(i),
              }),
            },
          },
          SELECT: {
            FORMAT_SELECT: {
              getValueProps: (i) => ({
                value: i && i !== 0 ? i : null,
              }),
            },
          },
          PARSER: {
            DATE_DATABASE: {
              getValueProps: (i) => ({
                value:
                  i &&
                    i != 0 &&
                    (typeof i !== "string" ||
                      (!i.includes("0001-01-01T00:00:00") && i != "0"))
                    ? moment(i, "YYYY-MM-DD")
                    : null,
              }),
              normalize: (val) => val?.format("YYYY-MM-DD") ?? null,
            },
            DATETIME_DATABASE: {
              getValueProps: (i) => ({
                value:
                  i &&
                    i != 0 &&
                    (typeof i !== "string" ||
                      (!i.includes("0001-01-01T00:00:00") && i != "0"))
                    ? moment(i, "YYYY-MM-DD HH:mm")
                    : undefined,
              }),
              normalize: (val) => val?.format("YYYY-MM-DD HH:mm") ?? undefined,
            },
            NUMBER: {
              handleParser: (value) => {
                // Parse the value by removing the thousand separator
                return value ? parseFloat(value.replace(/,/g, '')) : undefined;
              }
            }
          },
        },
      },
      LOCALE: {
        dateFormat: "DD/MM/YYYY",
      },
    },
  };
};

export const Corp_Action_Type = {
  ByMoney: 1,
  BySymbol: 2,
};

export const Sh_Article_Status_Enum = {
  ChoXyLy: 1,
  BiTraLai: 2,
  DaDang: 3,
  DaGo: 4,
};

export const Sh_Article_Hottype = {
  TinBinhThuong: 0,
  TinHot: 1,
};

export const User_Type_Enum = {
  Admin: 0,
  Company: 1,
  Shareholder: 2,
};

export const App_Enum = {
  MessageRequired: "Không được để trống",
};

export const SH_SHARE_TYPE_ENUM = {
  CoPhieuPhoThong: 0,
  CoPhieuESOP: 1,
  CoPhieuUuDaiCoTuc: 2,
  CoPhieuUuDaiBieuQuyet: 3,
  CoPhieuKhac: 4,
};
