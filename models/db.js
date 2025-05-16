const { Pool } = require('pg');

// Crear una conexión a PostgreSQL
const pool = new Pool({
  user: 'admin',
  host: 'dpg-d0j96fje5dus73c91qvg-a.oregon-postgres.render.com',
  database: 'empleado',
  password: 'eSHzdwGmkoBcx1whnPUB92ebUx6d6jnA',
  port: 5432
});

module.exports = pool;
