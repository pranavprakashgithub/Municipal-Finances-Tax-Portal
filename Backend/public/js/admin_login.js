const login = async (adminId, password) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/admin/adminLogin",
      data: { adminId, password },
    });
    if (result.data.status === "success") {
      alert("Your are logged in successfully!");
      window.setTimeout(() => {
        location.assign("/adminDashboard.pug");
      }, 1000);
    }
  } catch (err) {
    alert(err.response.data.error);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const adminId = e.target.username.value;
  const password = e.target.password.value;
  login(adminId, password);
});
