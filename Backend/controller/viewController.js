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
