
let balance = 0;
const investments = {};

function createAccount() {
  const phone = document.getElementById("phone").value.trim();
  const pass = document.getElementById("password").value.trim();
  const confirm = document.getElementById("confirm-password").value.trim();

  if (!/^\+254\d{9}$/.test(phone)) return alert("Enter valid +254 phone number.");
  if (!/^\d{6}$/.test(pass)) return alert("Password must be 6 digits.");
  if (pass !== confirm) return alert("Passwords do not match.");

  const existing = localStorage.getItem(phone);
  if (existing) return alert("Account already exists. Please log in.");

  localStorage.setItem(phone, pass);
  alert("✅ Account created. You can now log in.");
}

function login() {
  const phone = document.getElementById("phone").value.trim();
  const pass = document.getElementById("password").value.trim();

  const saved = localStorage.getItem(phone);
  if (!saved) return alert("No account found. Please register.");
  if (saved !== pass) return alert("Incorrect password.");

  document.getElementById("auth").classList.remove("active");
  document.getElementById("navigation").style.display = "flex";
  showSection("home");
}

function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
