const { createNotice } = require("./create");
const { getNotices } = require("./get");
const { updateNotice } = require("./update");
const { deleteNotice } = require("./delete");

module.exports = {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
};
