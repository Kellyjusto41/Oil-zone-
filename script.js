
const app = document.getElementById('app');
const state = {
  page: 'login',
  users: JSON.parse(localStorage.getItem('users') || '{}'),
  currentUser: localStorage.getItem('currentUser') || null,
};

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(state.users));
}
function showLogin() {
  state.page = 'login';
  render();
}
function showRegister() {
  state.page = 'register';
  render();
}
function login(phone, password) {
  if (state.users[phone] && state.users[phone].password === password) {
    state.currentUser = phone;
    localStorage.setItem('currentUser', phone);
    showHome();
  } else {
    alert('Wrong credentials');
  }
}
function register(phone, password, confirmPassword, refCode) {
  if (state.users[phone]) {
    alert('This number is already registered. Please login.');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  if (phone.length !== 10 || password.length !== 6) {
    alert('Phone must be 10 digits and password 6 digits');
    return;
  }
  state.users[phone] = { password, refCode };
  saveUsers();
  alert('Account created! Please login.');
  showLogin();
}
function logout() {
  localStorage.removeItem('currentUser');
  state.currentUser = null;
  showLogin();
}
function showHome() {
  state.page = 'home';
  render();
}
function render() {
  if (!state.currentUser) {
    app.innerHTML = state.page === 'register' ? `
      <h2 style="text-align:center;">Create Account</h2>
      <input type="text" placeholder="Phone (10 digits)" id="regPhone" />
      <input type="password" placeholder="Password (6 digits)" id="regPass" />
      <input type="password" placeholder="Confirm Password" id="regConfirm" />
      <input type="text" placeholder="Referral Code (optional)" id="regRef" />
      <button onclick="register(
        regPhone.value, regPass.value, regConfirm.value, regRef.value)">Create Account</button>
      <button onclick="showLogin()">Login</button>
    ` : `
      <h2 style="text-align:center;">Login</h2>
      <input type="text" placeholder="Phone (10 digits)" id="loginPhone" />
      <input type="password" placeholder="Password (6 digits)" id="loginPass" />
      <button onclick="login(loginPhone.value, loginPass.value)">Login</button>
      <button onclick="showRegister()">Create Account</button>
    `;
  } else {
    app.innerHTML = `
      <h2 style="text-align:center;">Welcome ${state.currentUser}</h2>
      <div class="card"><strong>SHEEP RANCH (30 Days)</strong><br>Daily: KES 80.00<br>Price: KES 1,200.00</div>
      <div class="card"><strong>GOATS RANCH (60 Days)</strong><br>Daily: KES 200.00<br>Price: KES 4,500.00</div>
      <div class="card"><strong>HORSES RANCH (120 Days)</strong><br>Daily: KES 270.00<br>Price: KES 8,000.00</div>
      <div class="card"><strong>PIGS RANCH (120 Days)</strong><br>Daily: KES 550.00<br>Price: KES 21,000.00</div>
      <button onclick="logout()">Logout</button>
    `;
  }
}
render();
