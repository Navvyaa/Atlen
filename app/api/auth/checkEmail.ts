import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import apiClient from '../apiClient';

const checkEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = checkEmailSchema.parse(req.body);
    const response = await apiClient.post('/auth/check-email/', validatedData);
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}