import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import apiClient from '../apiClient';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirm_password: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = registerSchema.parse(req.body);
    const response = await apiClient.post('/auth/register/', validatedData);
    res.status(201).json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}