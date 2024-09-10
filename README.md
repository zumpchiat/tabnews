# tabnews

Projeto base

# Subir o banco de dados local

sudo docker compose -f infra/compose.yaml up

# Stop o banco de dados local

sudo docker compose -f infra/compose.yaml down

# Acesso pelo client psql

comando de acesso: (psql client)
psql --host=localhost --port=5432 --user=postgres
