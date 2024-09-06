import database from "../../../../infra/database.js";

async function status(req, res) {
  const result = await database.query("select 1 + 1 as sum;");
  console.log(result.rows);

  res.status(200).json({ chave: "São Paulo" });
  //res.status(200).send("São Paulo");
}

export default status;
