require("dotenv").config();
const config = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.NEONUSER,
    password: process.env.NEONPASSWORD,
    database: process.env.NEONDATABASE,
    host: process.env.NEONHOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = config;
