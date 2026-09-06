const API = "/api";

function showMessage(message, success = false) {
  const element = document.getElementById("message");
  if (!element) return;

  element.textContent = message;
  element.className = success ? "success" : "error";
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return showMessage(data.message);
      }

      localStorage.setItem("token", data.token);
      showMessage("Account created successfully!", true);

      setTimeout(() => {
        window.location.href = "/dashboard.html";
      }, 700);
    } catch (error) {
      showMessage("Unable to connect to server.");
    }
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return showMessage(data.message);
      }

      localStorage.setItem("token", data.token);
      showMessage("Login successful!", true);

      setTimeout(() => {
        window.location.href = "/dashboard.html";
      }, 500);
    } catch (error) {
      showMessage("Unable to connect to server.");
    }
  });
}

async function loadDashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  try {
    const meResponse = await fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!meResponse.ok) {
      localStorage.removeItem("token");
      window.location.href = "/login.html";
      return;
    }

    const meData = await meResponse.json();

    document.getElementById("userName").textContent = meData.user.name;
    document.getElementById("userEmail").textContent = meData.user.email;
    document.getElementById("createdAt").textContent =
      new Date(meData.user.createdAt).toLocaleString();

    const protectedResponse = await fetch(`${API}/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const protectedData = await protectedResponse.json();
    document.getElementById("protectedData").textContent =
      JSON.stringify(protectedData, null, 2);
  } catch (error) {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }
}

if (window.location.pathname === "/dashboard.html") {
  loadDashboard();
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  });
}
