const fullName = document.getElementById("fullName");
const category = document.getElementById("category");
const propertySize = document.getElementById("propertySize");
const propertyNumber = document.getElementById("propertyNumber");
const wardNumber = document.getElementById("wardNumber");
const typeOfConstruction = document.getElementById("typeOfConstruction");
const yearOfConstruction = document.getElementById("yearOfConstruction");
const occupancyType = document.getElementById("occupancyType");
const propertyAddress = document.getElementById("propertyAddress");

let tax;

const calculateTax = async (
  category,
  propertySize,
  wardNumber,
  typeOfConstruction,
  yearOfConstruction,
  occupancyType
) => {
  //
  try {
    const result = await axios({
      method: "POST",
      url: "/api/v1/userProperty/calculateTax",
      data: {
        category,
        propertySize,
        wardNumber,
        typeOfConstruction,
        yearOfConstruction,
        occupancyType,
      },
    });
    console.log(result);
    if (result.data.status === "success") {
      alert(`Your payable tax amount is : ${result.data.data.tax}`);
      tax = result.data.data.tax;
    }
  } catch (err) {
    //
    alert(err.response.data.error);
  }
};

const propertyDetails = async (
  fullName,
  propertySize,
  propertyNumber,
  wardNumber,
  category,
  typeOfConstruction,
  yearOfConstruction,
  propertyAddress,
  occupancyType
) => {
  //
  try {
    //
    const result = await axios({
      method: "POST",
      url: "/api/v1/userProperty/propertyDetails",
      data: {
        fullName,
        propertySize,
        propertyNumber,
        wardNumber,
        category,
        typeOfConstruction,
        yearOfConstruction,
        propertyAddress,
        occupancyType,
      },
    });
    console.log(result);
  } catch (err) {
    //
    console.log(err);
  }
};

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  calculateTax(
    category.value,
    propertySize.value,
    wardNumber.value,
    typeOfConstruction.value,
    yearOfConstruction.value,
    occupancyType.value
  );
  // console.log(payableTax);

  // propertyDetails(
  //   fullName.value,
  //   propertySize.value,
  //   propertyNumber.value,
  //   wardNumber.value,
  //   category.value,
  //   typeOfConstruction.value,
  //   yearOfConstruction.value,
  //   propertyAddress.value,
  //   occupancyType.value
  // );
});
