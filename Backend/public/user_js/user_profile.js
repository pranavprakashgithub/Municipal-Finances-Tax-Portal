const mobileNumber = document.getElementById("mobileNumber");
const address = document.getElementById("address");
const pinCode = document.getElementById("pinCode");
const houseNumber = document.getElementById("houseNumber");
const adharNumber = document.getElementById("adharNumber");

const updateProfile = async (mobileNumber, address, pinCode, houseNumber) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/",
      data: { mobileNumber, address, pinCode, houseNumber },
    });
    console.log(result);
    if (result.data.status === "updated") {
      alert("User is updated successfully!");
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

document.querySelector(".btn").addEventListener("click", () => {
  //   let mobileNo ;
  updateProfile(
    mobileNumber.value,
    address.value,
    pinCode.value,
    houseNumber.value
  );
  console.log(adharNumber.value);
});
