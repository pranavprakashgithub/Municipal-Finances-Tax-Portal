"use strict";

const login = async (email, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: { email, password },
    });
    if (result.data.status === "success") {
      alert("your Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/userDashboard");
      }, 1000);
    }
  } catch (err) {
    console.log(err.response);
    alert(err.response.data.error);
  }
};

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  login(username, password);
});
