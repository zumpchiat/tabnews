function status(req, res) {
  res.status(200).json({ chave: "São Paulo" });
  //res.status(200).send("São Paulo");
}

export default status;
