/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/v1/user/create-user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User created successfully
 *               data:
 *                 id: 1
 *                 name: John Doe
 *                 email: john@example.com
 *       400:
 *         description: User already exists
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/assign-role:
 *   post:
 *     summary: Assign role to user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleName
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               roleName:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Role assigned successfully
 *       400:
 *         description: User or role not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/remove-role:
 *   delete:
 *     summary: Remove role from user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleName
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               roleName:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Role removed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Role removed successfully
 *       400:
 *         description: User or role not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/all-users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   name: John Doe
 *                   email: john@example.com
 *                   createdAt: 2026-04-17T10:00:00.000Z
 *                   role:
 *                     - admin
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/dashboard-summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 totalUser: 10
 *                 totalRole: 3
 *                 totalPermission: 12
 *                 totalChatSession: 5
 *                 recentUser:
 *                   - id: 1
 *                     name: John Doe
 *                     email: john@example.com
 *                     role:
 *                       - admin
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User updated successfully
 *               data:
 *                 id: 1
 *                 name: Updated Name
 *                 email: updated@example.com
 *                 role:
 *                   - admin
 *       400:
 *         description: Validation error / email already exists
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User deleted successfully
 *       403:
 *         description: Forbidden or user not found
 *       401:
 *         description: Unauthorized
 */