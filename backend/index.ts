import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import pg from "pg"; // Import pg module

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());

// PostgreSQL connection
const { Pool } = pg;
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: 5432,
});

// Routes
app.get("/api/hello/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.get("/api/test-db", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect(); 
    const result = await client.query("SELECT NOW()");
    client.release();
    res.json({ message: "Database connection successful", time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});