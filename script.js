
function validatePhone(phone) {
  return phone.length === 13 && phone.startsWith("+254");
}

function register() {
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  document.getElementById('phoneError').innerText = '';
  document.getElementById('passError').innerText = '';
  document.getElementById('confirmError').innerText = '';

  let valid = true;

  if (!validatePhone(phone)) {
    document.getElementById('phoneError').innerText = "Enter valid +254 phone number";
    valid = false;
  }

  if (password.length !== 6) {
    document.getElementById('passError').innerText = "Password must be 6 digits";
    valid = false;
  }

  if (password !== confirmPassword) {
    document.getElementById('confirmError').innerText = "Passwords do not match";
    valid = false;
  }

  if (valid) {
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userPassword", password);
    alert("Account Created Successfully!");
  }
}

function login() {
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();

  const savedPhone = localStorage.getItem("userPhone");
  const savedPassword = localStorage.getItem("userPassword");

  if (!validatePhone(phone)) {
    alert("Enter valid +254 phone number");
    return;
  }

  if (password.length !== 6) {
    alert("Password must be 6 digits");
    return;
  }

  if (!savedPhone || !savedPassword) {
    alert("Account not found. Please register first.");
    return;
  }

  if (phone === savedPhone && password === savedPassword) {
    alert("Login Successful! ✅");
  } else {
    alert("Incorrect phone or password.");
  }
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}
