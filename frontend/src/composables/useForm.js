import { reactive } from "vue";

export default function () {
  const checkoutObj = reactive({ phone: "", address: "", paymentMethod: "" });
  const cardObj = reactive({ number: "", name: "", expiryDate: "", cvv: "" });
  const errObj = reactive({
    phoneErr: [],
    addressErr: [],
    payErr: [],
    numErr: [],
    nameErr: [],
    exDateErr: [],
    cvvErr: [],
  });

  const resetCheckErr = () => {
    errObj.phoneErr = [];
    errObj.addressErr = [];
    errObj.payErr = [];
    errObj.numErr = [];
    errObj.nameErr = [];
    errObj.exDateErr = [];
    errObj.cvvErr = [];
  };

  const checkEmptyErr = () => {
    for (const typeErr in errObj) {
      if (errObj[typeErr].length !== 0) {
        return false;
      }
    }
    return true;
  };

  const checkForm = () => {
    resetCheckErr();
    // Phone validate
    if (!checkoutObj.phone) {
      errObj.phoneErr.push("Entering phone number is required");
    } else {
      if (!checkoutObj.phone.startsWith("84")) {
        errObj.phoneErr.push("Phone numbers must start with 84");
      }
      if (checkoutObj.phone.length != 11) {
        errObj.phoneErr.push("Phone numbers must have exactly 11 digits");
      }
      if (!/[0-9]{11}/.test(checkoutObj.phone)) {
        errObj.phoneErr.push("Phone numbers can only contain numbers");
      }
    }
    // Address validate
    if (!checkoutObj.address) {
      errObj.addressErr.push("Entering address is required");
    }
    // Card validate
    if (!checkoutObj.paymentMethod) {
      errObj.payErr.push("Selecting payment method is required");
    } else if (checkoutObj.paymentMethod == "card") {
      if (!cardObj.number) {
        errObj.numErr.push("Entering card number is required");
      } else {
        if (!cardObj.number.startsWith("4")) {
          errObj.numErr.push("Visa card numbers must start with 4");
        }
        if (cardObj.number.length != 16) {
          errObj.numErr.push("Visa card numbers must have exactly 16 digits");
        }
        if (!/[0-9]{16}/.test(cardObj.number)) {
          errObj.numErr.push("Visa card numbers can only contain numbers");
        }
      }
      if (!cardObj.name) {
        errObj.nameErr.push("Entering name is required");
      } else {
        if (!/^[A-Za-z]+$/.test(cardObj.name.replace(/\s/g, ""))) {
          errObj.nameErr.push("A name can only contain letters");
        }
      }
      if (!cardObj.expiryDate) {
        errObj.exDateErr.push("Entering expiry date is required");
      }
      if (!cardObj.cvv) {
        errObj.cvvErr.push("Entering cvv code is required");
      } else {
        if (cardObj.cvv.length != 3) {
          errObj.cvvErr.push("Cvv code must have exactly 3 digits");
        }
        if (!/[0-9]{3}/.test(cardObj.cvv)) {
          errObj.cvvErr.push("Cvv code can only contain numbers");
        }
      }
    } else if (checkoutObj.paymentMethod == "cash") {
      cardObj.number = "";
      cardObj.name = "";
      cardObj.expiryDate = "";
      cardObj.cvv = "";
      errObj.numErr = [];
      errObj.nameErr = [];
      errObj.exDateErr = [];
      errObj.cvvErr = [];
    }
  };

  const isPaid = () => {
    if (checkoutObj.paymentMethod === "cash") {
      return "false";
    } else if (checkoutObj.paymentMethod === "card") {
      return "true";
    }
  };

  return {
    checkEmptyErr,
    checkForm,
    isPaid,
    checkoutObj,
    cardObj,
    errObj,
  };
}
