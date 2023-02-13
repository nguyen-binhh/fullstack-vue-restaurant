import { reactive } from "vue";

export default function () {
  const orderObj = reactive({
    name: "",
    phone: "",
    people: "",
    tables: "",
    card: "",
    when: "",
    note: "",
  });

  const errorObj = reactive({
    nameErr: [],
    phoneErr: [],
    peopleErr: [],
    tablesErr: [],
    cardErr: [],
    whenErr: [],
  });

  const resetCheckErr = () => {
    errorObj.nameErr = [];
    errorObj.phoneErr = [];
    errorObj.peopleErr = [];
    errorObj.tablesErr = [];
    errorObj.cardErr = [];
    errorObj.whenErr = [];
  };

  const checkEmptyErr = () => {
    for (const typeErr in errorObj) {
      if (errorObj[typeErr].length !== 0) {
        return false;
      }
    }
    return true;
  };

  const checkForm = () => {
    resetCheckErr();
    // Name validate
    if (!orderObj.name) {
      errorObj.nameErr.push("Entering a name is required");
    } else {
      if (!/^[A-Za-z]+$/.test(orderObj.name.replace(/\s/g, ""))) {
        errorObj.nameErr.push("A name can only contain letters");
      }
    }
    // Phone validate
    if (!orderObj.phone) {
      errorObj.phoneErr.push("Entering phone number is required");
    } else {
      if (!orderObj.phone.startsWith("84")) {
        errorObj.phoneErr.push("Phone numbers must start with 84");
      }
      if (!/[0-9]{10}/.test(orderObj.phone)) {
        errorObj.phoneErr.push("Phone numbers can only contain numbers");
      }
      if (orderObj.phone.length != 11) {
        errorObj.phoneErr.push("Phone numbers must have exactly 11 digits");
      }
    }
    if (!orderObj.people) {
      errorObj.peopleErr.push("Entering number of people is required");
    } else {
      if (parseInt(orderObj.people) > 100) {
        errorObj.peopleErr.push(
          "Each store can only serve 100 people at a time"
        );
      }
      if (parseInt(orderObj.people) < 1) {
        errorObj.peopleErr.push(
          "Number of people must be greater than or equal to 1"
        );
      }
    }
    if (!orderObj.tables) {
      errorObj.tablesErr.push("Entering number of tables is required");
    } else {
      if (parseInt(orderObj.tables) > 50) {
        errorObj.tablesErr.push("Each store can only have maximum 50 tables");
      }
      if (parseInt(orderObj.tables) < 1) {
        errorObj.tablesErr.push(
          "Number of tables must be greater than or equal to 1"
        );
      }
      if (parseInt(orderObj.people) < parseInt(orderObj.tables)) {
        errorObj.tablesErr.push(
          "The number of tables must be less than the number of people"
        );
      }
    }
    if (orderObj.card) {
      if (!/[0-9]{10}/.test(orderObj.card)) {
        errorObj.cardErr.push("Card numbers can only contain numbers");
      }
      if (orderObj.card.length != 10) {
        errorObj.cardErr.push("Card number must have exactly 10 digits");
      }
    }
    if (!orderObj.when) {
      errorObj.whenErr.push("Entering when to serve is required");
    } else {
      let minRange = document.getElementById("oWhen").getAttribute("min");
      let maxRange = document.getElementById("oWhen").getAttribute("max");
      let dateMin = new Date(minRange);
      let dateMax = new Date(maxRange);
      let dateInput = new Date(orderObj.when);
      if (dateInput === "Invalid Date") {
        errorObj.whenErr.push("Invalid date input");
      }
      if (
        dateInput.getTime() < dateMin.getTime() ||
        dateInput.getTime() > dateMax.getTime()
      ) {
        errorObj.whenErr.push(
          "Available reservation range is from now to next two months"
        );
      }
      if (dateInput.getHours() < 7 || dateInput.getHours() > 22) {
        errorObj.whenErr.push("Store open from 7:00 AM to 10:00 PM everyday");
      }
    }
  };

  return { orderObj, errorObj, checkEmptyErr, checkForm };
}
