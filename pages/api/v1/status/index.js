import database from "infra/database.js";
import { version } from "react";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const versionPostgres = await database.query("SHOW server_version;");
  const dbVersionValue = versionPostgres.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const dbMaxConnections = maxConnections.rows[0].max_connections;

  const maxActivity = await database.query(
    "select count(*)::int from pg_stat_activity where datname = 'db_local';",
  );

  const dbMaxConnectionsActivity = maxActivity.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(dbMaxConnections),
        conections_activity: parseInt(dbMaxConnectionsActivity),
      },
    },
  });
}
export default status;
