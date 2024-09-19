import database from "infra/database.js";
import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(req, res) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      //verbose: true,
    };

    if (req.method === "POST") {
      const migrateMigrations = await migrationsRunner(
        defaultMigrationsOptions,
      );

      if (migrateMigrations.length > 0) {
        return res.status(201).json(migrateMigrations);
      }

      return res.status(200).json(migrateMigrations);
    }

    if (req.method === "GET") {
      const pedingMigrations = await migrationsRunner({
        ...defaultMigrationsOptions,
        dryRun: true,
      });

      return res.status(200).json(pedingMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
