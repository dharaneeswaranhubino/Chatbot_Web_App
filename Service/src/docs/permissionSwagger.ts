/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission Management APIs
 */

/**
 * @swagger
 * /api/v1/permission/all:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: view:role
 *                       description:
 *                         type: string
 *                         example: Can view roles
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/permission/role/{roleId}:
 *   get:
 *     summary: Get all permissions for a specific role
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the role
 *     responses:
 *       200:
 *         description: Role permissions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       roleId:
 *                         type: integer
 *                         example: 1
 *                       permissionId:
 *                         type: integer
 *                         example: 2
 *                       Permission:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           name:
 *                             type: string
 *                             example: edit:role
 *                           description:
 *                             type: string
 *                             example: Can edit roles
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /api/v1/permission/assign:
 *   post:
 *     summary: Assign a permission to a role
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionName
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 1
 *               permissionName:
 *                 type: string
 *                 example: edit:role
 *     responses:
 *       200:
 *         description: Permission assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Permission "edit:role" assigned to role 1 successfully
 *       400:
 *         description: Permission already assigned or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Permission already assigned to this role
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 */

/**
 * @swagger
 * /api/v1/permission/remove:
 *   delete:
 *     summary: Remove a permission from a role
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionName
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 1
 *               permissionName:
 *                 type: string
 *                 example: edit:role
 *     responses:
 *       200:
 *         description: Permission removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Permission "edit:role" removed from role successfully
 *       400:
 *         description: Role or permission not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Permission not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 */