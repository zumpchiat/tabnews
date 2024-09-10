import database from "infra/database.js";
import { version } from "react";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const versionPostgres = await database.query("SHOW server_version;");
  const dbVersionValue = versionPostgres.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const dbMaxConnections = maxConnections.rows[0].max_connections;

  const maxActivity = await database.query(
    "select count(*) from pg_stat_activity;",
  );
  const dbMaxConnectionsActivity = maxActivity.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: dbMaxConnections,
        conections_activity: dbMaxConnectionsActivity,
      },
    },
  });
}
export default status;
