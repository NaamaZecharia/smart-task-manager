import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const { code, name, type } = req.body  as { code: string, name: string, type: string };;
  if (!code || !name) {
    return res.status(400).json({ message: 'Code and Name fields are required' });
  }

  const exists = await prisma.category.findUnique({ where: { code } });
  if (exists) {
    return res.status(409).json({ message: 'Category code already exists' });
  }

  const category = await prisma.category.create({
    data: { code, name, type },
  });

  res.status(201).json(category);
};