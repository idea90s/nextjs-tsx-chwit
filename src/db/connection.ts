import { createPool } from "mysql2/promise";

const dbPool = createPool({
  host: process.env.NEXT_PUBLIC_DB_HOST,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASS,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
});

export default dbPool;
