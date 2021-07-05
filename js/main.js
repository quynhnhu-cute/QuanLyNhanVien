var btnThem = document.querySelector("#btnThem");
var workerList = new WorkerList();
var validator = new Validator();
var btnThemNV = document.querySelector("#btnThemNV");
var btnCapNhat = document.querySelector("#btnCapNhat");

// Disable Cập nhật button
btnThem.onclick = function () {
  btnThemNV.style.display = "block";
  btnCapNhat.style.display = "none";
  clearForm();
};

// Add new workers

// console.log(btnThemNV);

getLocalStorage();

//Remove worker

var removeWorker = function (account) {
  workerList.deleteWorker(account);
  showListWorker(workerList.arr);
  setLocalStorage();
};

//Update worker

var updateWorker = function (account) {};

// Get detail worker

var getDetailWorker = function (accountParams) {
  btnThemNV.style.display = "none";
  btnCapNhat.style.display = "block";
  var index = workerList.findIndex(accountParams);
  var account = document.querySelector("#tknv");
  var fullName = document.querySelector("#name");
  var email = document.querySelector("#email");
  var password = document.querySelector("#password");
  var date = document.querySelector("#datepicker");
  var salaryBasic = document.querySelector("#luongCB");
  var positionNum = document.querySelector("#chucvu");
  console.log(positionNum);
  var workingHour = document.querySelector("#gioLam");
  account.value = accountParams;
  fullName.value = workerList.arr[index].fullName;
  email.value = workerList.arr[index].email;
  password.value = workerList.arr[index].password;
  date.value = workerList.arr[index].workingDate;
  salaryBasic.value = workerList.arr[index].salaryBasic;
  positionNum.selected = workerList.arr[index].position;
  workingHour.value = workerList.arr[index].workingHour;
};

// Show list worker
function showListWorker(array) {
  var content = "";
  if (array == null) {
    return;
  }
  array.map(function (nv, index) {
    content += `
        <tr>
            <td>${nv.account}</td>
            <td>${nv.fullName}</td>
            <td>${nv.email}</td>
            <td>${nv.workingDate}</td>
            <td>${nv.position}</td>
            <td>${nv.salarySum}</td>
            <td>${nv.kindWorker}</td>
            <td>
            <button class="btn btn-success" data-toggle="modal"
            data-target="#myModal" onclick="getDetailWorker('${nv.account}')">Cập nhật</button>
            <button class="btn btn-danger" onclick="removeWorker('${nv.account}')">Xóa</button>
            </td>
        </tr>
    `;
    document.getElementById("tableDanhSach").innerHTML = content;
  });
}
showListWorker(workerList.arr);

btnCapNhat.onclick = function () {
  var account = document.querySelector("#tknv").value;
  var fullName = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var password = document.querySelector("#password").value;
  var date = document.querySelector("#datepicker").value;
  var salaryBasic = parseFloat(document.querySelector("#luongCB").value);
  var positionNum = parseInt(document.querySelector("#chucvu").value);
  var workingHour = parseFloat(document.querySelector("#gioLam").value);

  var newWorker = new Workers(
    account,
    fullName,
    email,
    password,
    date,
    salaryBasic,
    getPositionByText(positionNum),
    workingHour,
    sumSalary(positionNum, salaryBasic),
    classifyWorker(workingHour)
  );
  if (!validateForm(newWorker)) {
    return;
  }
  workerList.updateWorker(account, newWorker);
  setLocalStorage();
  showListWorker(workerList.arr);
};

var sumSalary = function (position, basicSalary) {
  return basicSalary * position;
};

var classifyWorker = function (workingHours) {
  if (workingHours >= 192) {
    return "Xuất sắc";
  } else if (workingHours >= 176 && workingHours < 192) {
    return "Giỏi";
  } else if (workingHours >= 160 && workingHours < 176) {
    return "Khá";
  } else {
    return "Trung bình";
  }
};

var getPositionByText = function (num) {
  if (num == 1) {
    return "Nhân viên";
  }
  if (num == 2) {
    return "Trưởng phòng";
  }
  if (num == 3) {
    return "Sếp";
  }
};

function validateForm(worker) {
  var tbTKNV = document.querySelector("#tbTKNV");
  var datepicker = document.querySelector("#tbNgay");
  var luongCB = document.querySelector("#tbLuongCB");
  var chucvu = document.querySelector("#tbChucVu");

  // Check account
  if (worker.account.length < 4 || worker.account.length > 6) {
    tbTKNV.style.display = "block";
    tbTKNV.innerHTML = "Tài khoản phải có độ dài từ 4 đến 6 kí tự";
    return false;
  } else {
    tbTKNV.style.display = "none";
  }

  // Check name
  if (
    !validator.checkFormat(
      worker.fullName,
      "tbTen",
      "Tên phải không được để trống và không chứa kí tự đặc biệt",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    )
  ) {
    return false;
  }

  //Check email
  if (
    !validator.checkFormat(
      worker.email,
      "tbEmail",
      "Email không hợp lệ",
      "^[A-Za-z0-9+_.-]+@(.+)$"
    )
  ) {
    return false;
  }

  // Check password
  if (
    !validator.checkFormat(
      worker.password,
      "tbMatKhau",
      "Password phải chứa ít nhát 1 số, 1 kí tự in hoa và 1 kí tự đặc biệt và từ 6 đến 10 kí tự",
      "^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$"
    )
  ) {
    return false;
  }

  // Check working date
  console.log(worker);
  if (worker.workingDate == "") {
    datepicker.style.display = "block";
    datepicker.innerHTML = "Ngày làm không được bỏ trống";
    return false;
  } else {
    datepicker.style.display = "none";
  }

  //Check salary

  if (
    !worker.salaryBasic ||
    worker.salaryBasic < 1000000 ||
    worker.salaryBasic > 20000000
  ) {
    console.log("false");
    luongCB.style.display = "block";
    luongCB.innerHTML = "Lương cơ bản phải từ 1 triệu đến 20 triệu";
    return false;
  } else {
    luongCB.style.display = "none";
  }

  //check position num
  if (!worker.position) {
    chucvu.style.display = "block";
    chucvu.innerHTML = "Bạn phải chọn chức vụ";
    return false;
  } else {
    chucvu.style.display = "none";
  }
  // check working hour
  if (
    !validator.checkIntegerNum(
      worker.workingHour,
      "tbGiolam",
      "Phải làm từ 80 đến 200 giờ",
      80,
      200
    )
  ) {
    return false;
  }
  return true;
}

btnThemNV.addEventListener("click", function () {
  var account = document.querySelector("#tknv").value;
  var fullName = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var password = document.querySelector("#password").value;
  var date = document.querySelector("#datepicker").value;
  var salaryBasic = parseFloat(document.querySelector("#luongCB").value);
  var positionNum = parseInt(document.querySelector("#chucvu").value);
  var workingHour = parseFloat(document.querySelector("#gioLam").value);

  var worker = new Workers(
    account,
    fullName,
    email,
    password,
    date,
    salaryBasic,
    getPositionByText(positionNum),
    workingHour,
    sumSalary(positionNum, salaryBasic),
    classifyWorker(workingHour)
  );
  if (!validateForm(worker)) {
    return;
  }
  workerList.addNewWorker(worker);
  setLocalStorage();
  showListWorker(workerList.arr);
  
});

function setLocalStorage() {
  /**
   * Set local storage function , need Json data => use JSON.stringify
   */
  localStorage.setItem("WORKERLIST", JSON.stringify(workerList.arr));
}

function getLocalStorage() {
  /**
   * Function to get Local storage data , use JSON.parse to parse from JSON to appreciate data type
   */
  var local = JSON.parse(localStorage.getItem("WORKERLIST"));
  if (local != null) {
    workerList.arr = local;
  }
}

function clearForm() {
  document.querySelector("#form-input").reset();
  document.querySelector("#tbTKNV").style.display = "none";
  document.querySelector("#tbTen").style.display = "none";
  document.querySelector("#tbEmail").style.display = "none";
  document.querySelector("#tbMatKhau").style.display = "none";
  document.querySelector("#tbNgay").style.display = "none";
  document.querySelector("#tbLuongCB").style.display = "none";
  document.querySelector("#tbChucVu").style.display = "none";
  document.querySelector("#tbGiolam").style.display = "none";
}
