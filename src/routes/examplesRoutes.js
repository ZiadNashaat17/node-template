import express from 'express';
import { z } from 'zod';
import validateRequest from '../middlewares/validateRequest.js';
import AppError from '../utils/appError.js';

const router = express.Router();

// Validation schemas
const createExampleSchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    email: z.string().email('Invalid email address'),
    description: z.string().optional(),
  }),
};

const updateExampleSchema = {
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    description: z.string().optional(),
  }).strict(),
};

const getExampleSchema = {
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
};

// Mock database
const examples = new Map();

/**
 * Get all examples
 * @route GET /api/examples
 * @returns {Array} List of all examples
 * @example
 * GET /api/examples
 * Response: { status: 'success', data: [...], count: 0 }
 */
router.get('/', (req, res) => {
  const data = Array.from(examples.values());

  res.json({
    status: 'success',
    count: data.length,
    data,
  });
});

/**
 * Get example by ID
 * @route GET /api/examples/:id
 * @param {string} param.id - Example ID
 * @returns {object} Single example object
 * @example
 * GET /api/examples/123
 * Response: { status: 'success', data: { id: '123', name: '...', ... } }
 */
router.get('/:id', validateRequest(getExampleSchema), (req, res, next) => {
  const { id } = req.params;
  const example = examples.get(id);

  if (!example) {
    return next(new AppError(`Example with ID ${id} not found`, 404));
  }

  res.json({
    status: 'success',
    data: example,
  });
});

/**
 * Create a new example
 * @route POST /api/examples
 * @param {string} body.name - Example name (required)
 * @param {string} body.email - Example email (required)
 * @param {string} [body.description] - Example description (optional)
 * @returns {object} Created example object with ID
 * @example
 * POST /api/examples
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "description": "A sample example"
 * }
 * Response: { status: 'success', data: { id: '...', name: 'John Doe', ... }, message: 'Example created successfully' }
 */
router.post('/', validateRequest(createExampleSchema), (req, res) => {
  const { name, email, description } = req.body;
  const id = Date.now().toString();

  const newExample = {
    id,
    name,
    email,
    description: description || null,
    createdAt: new Date().toISOString(),
  };

  examples.set(id, newExample);

  res.status(201).json({
    status: 'success',
    data: newExample,
    message: 'Example created successfully',
  });
});

/**
 * Update an example
 * @route PATCH /api/examples/:id
 * @param {string} param.id - Example ID
 * @param {string} [body.name] - Updated name
 * @param {string} [body.email] - Updated email
 * @param {string} [body.description] - Updated description
 * @returns {object} Updated example object
 * @example
 * PATCH /api/examples/123
 * {
 *   "name": "Jane Doe",
 *   "email": "jane@example.com"
 * }
 * Response: { status: 'success', data: { id: '123', name: 'Jane Doe', ... }, message: 'Example updated successfully' }
 */
router.patch('/:id', validateRequest(updateExampleSchema), (req, res, next) => {
  const { id } = req.params;
  const example = examples.get(id);

  if (!example) {
    return next(new AppError(`Example with ID ${id} not found`, 404));
  }

  const updatedExample = {
    ...example,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  examples.set(id, updatedExample);

  res.json({
    status: 'success',
    data: updatedExample,
    message: 'Example updated successfully',
  });
});

/**
 * Delete an example
 * @route DELETE /api/examples/:id
 * @param {string} param.id - Example ID
 * @returns {object} Deleted example object
 * @example
 * DELETE /api/examples/123
 * Response: { status: 'success', data: { id: '123', ... }, message: 'Example deleted successfully' }
 */
router.delete('/:id', validateRequest(getExampleSchema), (req, res, next) => {
  const { id } = req.params;
  const example = examples.get(id);

  if (!example) {
    return next(new AppError(`Example with ID ${id} not found`, 404));
  }

  examples.delete(id);

  res.json({
    status: 'success',
    data: example,
    message: 'Example deleted successfully',
  });
});

export default router;
