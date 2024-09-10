//import database from "infra/database.js";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  res.status(200).json({
    update_at: updateAt,
  });
}
export default status;
