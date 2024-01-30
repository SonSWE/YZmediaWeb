import moment from "moment";

var _countSpinLoading = 0; // Dem so lan func dc goi
export const SpinLoading = (create) => {
  const loader = document.querySelector("#Loader");
  create = create || false;
  if (create) {
    _countSpinLoading++;
    // loader.classList.remove("hide");
    // loader.classList.add("shown");

    loader.style.display = "block";
    loader.style.animation = "fadeIn 0.5s";
  } else {
    _countSpinLoading--;
    if (_countSpinLoading <= 0) {
      _countSpinLoading = 0;
      // loader.classList.remove("shown");
      // loader.classList.add("hide");
      loader.style.display = "none";
      loader.style.animation = "fadeOut 0.5s";
    }
  }
};

export const getFromToPaging = (pCurrentPage, pRecordOnPage) => {
  try {
    let fromRecord = pRecordOnPage * (pCurrentPage - 1) + 1;
    let pToRecord = pRecordOnPage * pCurrentPage;

    return { from: fromRecord, to: pToRecord };
  } catch (ex) {
    console.error(ex.toString());
    return { from: -1, to: -1 };
  }
};

export const ObjectValueToKeySearch = (values) => {
  var keySearch = "";
  var _lstValue = [];

  Object.keys(values).forEach((e) => {
    var key = "";
    if (e.toUpperCase().includes("DATE")) {
      key = values[e] != undefined ? values[e].format("DD/MM/YYYY") : "";
    } else if (e.toUpperCase().includes("RANGE")) {
      if (values[e] != undefined) {
        var dateRanges = values[e];
        let from =
          dateRanges[0] != undefined ? dateRanges[0].format("DD/MM/YYYY") : "";
        let to =
          dateRanges[1] != undefined ? dateRanges[1].format("DD/MM/YYYY") : "";

        key = from + "|" + to;
      } else {
        key = "|";
      }
    } else {
      key = values[e] != undefined ? values[e] : "";
    }
    _lstValue.push(key);
  });
  keySearch = _lstValue.join("|");
  return keySearch;
};


export function ValidatePhone(phoneNumber) {
  try {
    const phonePattern = /^[0-9]{10}$/; // For a basic 10-digit number validation

    return phonePattern.test(phoneNumber);
  } catch (error) {
    console.error(error)
  }
}

export function ValidateEmail(email) {
  try {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  } catch (error) {
    console.error(error)
  }
}

export function equalDateNow(date){
  var dateNow = moment().startOf("day");
  var date = moment(date, "YYYY-MM-DD").startOf(
    "day"
  );
console.log(dateNow.format("YYYY-MM-DD"), date.format("YYYY-MM-DD"), date)
  return dateNow.format("YYYY-MM-DD") == date.format("YYYY-MM-DD");
}