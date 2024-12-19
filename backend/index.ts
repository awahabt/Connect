import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const prisma = new PrismaClient();
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

// Routes
app.get("/api/hello/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.get("/api/test-db", async (req: Request, res: Response) => {
  try {
    // Prisma doesn't require a manual database connection; it handles that internally
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({ message: "Database connection successful", time: result[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Add student (using Prisma)
app.post("/api/add-student", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  try {
    const student = await prisma.student.create({
      data: {
        name,
        email,
      },
    });
    res.json({ message: "Student added successfully.", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add student." });
  }
});

// Retrieve all students (using Prisma)
app.get("/api/students", async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    res.json({ students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve students." });
  }
});

// Update student data (using Prisma)
app.put("/api/update-student/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({ error: "At least one field (name or email) is required to update." });
  }

  try {
    const updatedStudent = await prisma.student.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
      },
    });
    res.json({ message: "Student updated successfully.", updatedStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update student." });
  }
});

// Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
