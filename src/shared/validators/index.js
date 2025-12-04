// Export all shared validators
const sharedValidators = {};

sharedValidators.isNull = (value) => value === null;

sharedValidators.isUndefined = (value) => value === undefined;

sharedValidators.isEmpty = (value) => value === "";

sharedValidators.isRequired = (value) =>
  sharedValidators.isNull(value) ||
  sharedValidators.isUndefined(value) ||
  sharedValidators.isEmpty(value);

sharedValidators.isExist = !sharedValidators.isRequired;

sharedValidators.isNotExist = sharedValidators.isRequired;

sharedValidators.isArray = (value) => value instanceof Array;

sharedValidators.isEmptyArray = (value) =>
  !sharedValidators.isRequired(value) ||
  sharedValidators.isArray(value) ||
  value.length === 0;

sharedValidators.isObject = (value) => value instanceof Object;

sharedValidators.isEmptyObject = (value) => Object.keys(value).length === 0;

sharedValidators.isValidName = (value) => /[A-z\s]+$/.test(value);

sharedValidators.isValidPan = (value) =>
  /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);

sharedValidators.isValidEmail = (value) =>
  /^\w+([\.\+-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value);

sharedValidators.isvalidMobileNumber = (value) =>
  (phoneNo = /^[6-9]\d{9}$/.test(value));

sharedValidators.isEquals = (value, matchValue) => value === matchValue;

sharedValidators.isNotEquals = (value, matchValue) => value !== matchValue;

sharedValidators.isInt = (value) => /^[0-9]*$/.test(value);

sharedValidators.isFloat = (value) => /[+-]?([0-9]*[.])?[0-9]+$/.test(value);

sharedValidators.isValidAadhar = (value) => /^(?:\d{4}|\d{12})$/.test(value);

sharedValidators.isValidText = (value) => /[A-z\s]+$/.test(value);

sharedValidators.isValidZipcode = (value) =>
  /^[1-9]{1}[0-9]{2}[0-9]{3}$/.test(value);

sharedValidators.isValidBankAccountNumber = (value) =>
  /^[0-9]{9,18}$/.test(value);

sharedValidators.isValidMpinNumber = (value) => /^\d{4}$/.test(value);
sharedValidators.isValidAge = (value) => /^(?:1[01][0-9]|120|[1-9]?[0-9])$/.test(value);

sharedValidators.isValidPassword = (value) => {
  return (
    value.length >= 8 &&
    /^(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[!@#$%^&*()_\-+=<>?{}[\]~`|:;"',./\\]).{8,}$/.test(
      value
    )
  );
};

sharedValidators.isMinLength = (value, minLength) => typeof value === 'string' && value.length >= minLength;

sharedValidators.isNumber = (value) => {
  value = typeof value === "string" ? Number(value) : value;
  return typeof value == "number" && !isNaN(value);
};

sharedValidators.isValidAadharNumber = (value) => /^\d{12}$/.test(value);

sharedValidators.isValidOtp = (value) => /^\d{6}$/.test(value);

sharedValidators.validatePincode = (value) => /^[0-9]{6}$/.test(value);

sharedValidators.isIfscCode = (value) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);

module.exports = sharedValidators;