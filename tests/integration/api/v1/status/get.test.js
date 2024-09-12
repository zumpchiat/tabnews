test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.conections_activity).toEqual(1);
});

// test.only("Teste de SQL Injection", async () => {
//   await fetch("http://localhost:3000/api/v1/status?dbName=db_local");
//   await fetch(
//     "http://localhost:3000/api/v1/status?dbName='; select pg_sleep(4) --;",
//   );
// });
