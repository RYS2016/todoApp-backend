import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET /tasks (Fetch all tasks)
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// GET /tasks/:id (Fetch a single task)
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({ where: { id: Number(id) } });

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// POST /tasks (Create a new task)
app.post('/tasks', async (req, res) => {
  const { title, color } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = await prisma.task.create({
    data: { title, color: color || 'blue', completed: false },
  });
  res.json(newTask);
});

// PUT /tasks/:id (Update a task)
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, color, completed },
  });
  res.json(updatedTask);
});

// DELETE /tasks/:id (Delete a task)
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id) } });
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
