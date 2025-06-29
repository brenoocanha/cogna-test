#!/bin/sh

set -e

echo "Aguardando o banco de dados iniciar..."
sleep 5

echo "Rodando as migrações do banco de dados..."
npx prisma migrate deploy

echo "Iniciando a aplicação backend..."
exec "$@"