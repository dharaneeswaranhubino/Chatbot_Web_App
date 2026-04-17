export const chatSwaggerDocs = `
/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chatbot APIs
 */

/**
 * @swagger
 * /api/v1/chat/send:
 *   post:
 *     summary: Send message to chatbot
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 maxLength: 2000
 *                 example: joke?
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Validation or processing error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/chat/messages:
 *   get:
 *     summary: Get user chat messages (paginated)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 50
 *         description: Number of messages to fetch
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Pagination offset
 *     responses:
 *       200:
 *         description: Messages fetched successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/chat/search:
 *   get:
 *     summary: Search chat messages
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           example: joke
 *         description: Search query (minimum 2 characters)
 *     responses:
 *       200:
 *         description: Search results fetched successfully
 *       400:
 *         description: Invalid query
 *       401:
 *         description: Unauthorized
 */
`;