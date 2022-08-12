"use strict";

const signup = async (fname, lname, aadharNumber, password, email) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: { fname, lname, aadharNumber, password, email },
    });
    if (result.data.status === "created") {
      alert("Signup successful!");
      window.setTimeout(() => {
        location.assign("/userLogin.pug");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.error);
  }
};

document.querySelector(".signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fname = e.target.fname.value;
  const lname = e.target.lname.value;
  const aadharNumber = e.target.aadharNumber.value;
  const password = e.target.password.value;
  const email = e.target.email.value;
  signup(fname, lname, aadharNumber, password, email);
});
