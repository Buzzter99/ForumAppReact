const dateTimeFormatter = {
  formatDateTime(date) {
    if (!date) {
      return "";
    }
    const datePart = date
      .toString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("-");
    const timePart = date.toString().slice(11, 16);
    return `${datePart} ${timePart}`;
  },
};
export default dateTimeFormatter;
