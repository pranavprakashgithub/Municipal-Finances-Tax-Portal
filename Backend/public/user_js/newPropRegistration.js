const oldPropOwnerName = document.getElementById("oldPropOwnerName");
const mobileNumber = document.getElementById("mobileNumber");
const adharNumber = document.getElementById("adharNumber");
const propertyNumber = document.getElementById("propertyNumber");
const propertyAddress = document.getElementById("propertyAddress");
const areaPincode = document.getElementById("areaPincode");

const newPropertyRegister = async (
  oldPropOwnerName,
  mobileNumber,
  adharNumber,
  propertyNumber,
  propertyAddress,
  areaPincode
) => {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/property/registerProperty",
      data: {
        oldPropOwnerName,
        mobileNumber,
        adharNumber,
        propertyNumber,
        propertyAddress,
        areaPincode,
      },
    });
    // console.log(result);
    if (result.data.status === "success") {
      alert("Request submitted! You will be notified futher!");
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    // console.log(err);
    alert(err.response.data.error);
  }
};

document.querySelector("#btn").addEventListener("click", () => {
  newPropertyRegister(
    oldPropOwnerName.value,
    mobileNumber.value,
    adharNumber.value,
    propertyNumber.value,
    propertyAddress.value,
    areaPincode.value
  );
});
