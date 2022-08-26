// "use strict";

const signup = async (fname, lname, adharNumber, password, email) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: { fname, lname, adharNumber, password, email },
    });
    // console.log(result);
    if (result.data.status === "created") {
      alert("Signup successful!");
      window.setTimeout(() => {
        location.assign("/userLogin");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.error);
    // console.log(err);
  }
};

document.querySelector(".signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fname = e.target.fname.value;
  const lname = e.target.lname.value;
  const adharNumber = e.target.aadharNumber.value;
  const password = e.target.password.value;
  const email = e.target.email.value;
  signup(fname, lname, adharNumber, password, email);
});
