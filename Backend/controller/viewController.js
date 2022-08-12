exports.overview = (req, res) => {
  res.status(200).render("overview");
};
exports.adminLogin = (req, res) => {
  res.status(200).render("adminLogin");
};
exports.adminDashboard = (req, res) => {
  res.status(200).render("adminDashboard");
};
exports.adminTables = (req, res) => {
  res.status(200).render("tables");
};

exports.adminManageUser = (req, res) => {
  res.status(200).render("admin_manage_user");
};
exports.userSignup = (req, res) => {
  res.status(200).render("userSignup");
};
exports.userLogin = (req, res) => {
  res.status(200).render("userLogin");
};

exports.userDashboard = (req, res) => {
  res.status(200).render("user_dashboard");
};
exports.userProfile = (req, res) => {
  res.status(200).render("user_profile");
};

exports.requestRegister = (req, res) => {
  res.status(200).render("request_register");
};
