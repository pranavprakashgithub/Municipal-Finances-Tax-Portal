const viewChart = async () => {
  try {
    //
    await axios({
      method: "GET",
      url: "/api/v1/property/viewChart",
    });
  } catch (err) {
    //
  }
};

document.getElementById("view").addEventListener("click", () => {
  viewChart();
});
