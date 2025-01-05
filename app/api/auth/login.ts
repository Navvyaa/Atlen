import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import apiClient from '../apiClient';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = loginSchema.parse(req.body);
    const response = await apiClient.post('/auth/login/', validatedData);
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}