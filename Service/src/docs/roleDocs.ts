/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management APIs
 */

/**
 * @swagger
 * /api/v1/role/create-role:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleName
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: manager
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Role created successfully
 *               data:
 *                 id: 1
 *                 roleName: manager
 *                 createdAt: 2026-04-17T10:00:00.000Z
 *                 updatedAt: 2026-04-17T10:00:00.000Z
 *       400:
 *         description: Role already exists or validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/role/all-roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched roles
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   roleName: admin
 *                   createdAt: 2026-04-17T10:00:00.000Z
 *                   updatedAt: 2026-04-17T10:00:00.000Z
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/role/delete-role/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Role deleted successfully
 *       400:
 *         description: Role not found / assigned to users / admin cannot be deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 */