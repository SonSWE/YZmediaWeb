
import { format } from 'date-fns';

export const formatDate = (dateTimeString, formatString) => {
  try {
    if (dateTimeString?.includes("0001-01-01")) {
      return ""
    }
    return format(new Date(dateTimeString), formatString) ?? "";
  } catch (e) {
    return "";
  }
}


export const formatNumber = (numberValue) => {
  if (
    isNaN(numberValue) === true ||
    numberValue === undefined ||
    numberValue === null
  ) {
    return "";
  }
  var num = numberValue.toString().replace(/[^0-9]/g, "");
  return (numberValue = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
};

export const convertToArray = (arr) => {
  return Array.isArray(arr) ? arr : [];
};

export const dateToString = (date) => {
  var d = (date.getDate() < 10 ? '0' : '') + date.getDate();
  var m = ((date.getMonth()) + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
  var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  return `${date.getFullYear()}-${m}-${d} ${hour}:${minutes}`;
}
