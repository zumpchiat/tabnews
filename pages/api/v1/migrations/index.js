import database from "infra/database.js";
import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";

async function migrations(req, res) {
  const dbClient = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: false,
    dir: join("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    //verbose: true,
  };

  if (req.method === "POST") {
    const migrateMigrations = await migrationsRunner(defaultMigrationsOptions);

    if (migrateMigrations.length > 0) {
      await dbClient.end();
      return res.status(201).json(migrateMigrations);
    }
    await dbClient.end();
    return res.status(200).json(migrateMigrations);
  }

  if (req.method === "GET") {
    const pedingMigrations = await migrationsRunner({
      ...defaultMigrationsOptions,
      dryRun: true,
    });
    await dbClient.end();
    return res.status(200).json(pedingMigrations);
  }

  return res.status(405).end;
}
export default migrations;
