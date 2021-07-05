function Validator() {}

Validator.prototype.checkFormat = function (value, spanID, mess, format) {
  var pattern = new RegExp(format);
  console.log(pattern.test(value))
  if (pattern.test(value) && value.length > 0) {
    document.getElementById(spanID).style.display = "none";
    return true;
  }
  document.getElementById(spanID).style.display = "block";
  document.getElementById(spanID).innerHTML = mess;
  return false;
};

Validator.prototype.checkIntegerNum = function (value, spanID, mess, min, max) {
  if (value % 1 != 0 || value < min || value > max || !value) {
    document.getElementById(spanID).style.display = "block";
    document.getElementById(spanID).innerHTML = mess;
    return false;
  }

  document.getElementById(spanID).style.display = "none";
  return true;
};
