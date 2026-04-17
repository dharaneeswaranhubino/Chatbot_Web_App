/**
 * @swagger
 * tags:
 *   name: UserDashboard
 *   description: User Dashboard APIs
 */

/**
 * @swagger
 * /api/v1/userDashboard/user_dashboard:
 *   get:
 *     summary: Get user dashboard data
 *     tags: [UserDashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalMessages:
 *                           type: integer
 *                           example: 120
 *                         totalChatSessions:
 *                           type: integer
 *                           example: 60
 *                         messagesThisWeek:
 *                           type: integer
 *                           example: 15
 *                         lastActive:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-17T10:30:00.000Z"
 *                     recentChats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           message:
 *                             type: string
 *                             example: "Hello! How are you?"
 *                           sender:
 *                             type: string
 *                             enum: [user, bot]
 *                             example: user
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-17T10:30:00.000Z"
 *                     activityData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             example: Mon
 *                           count:
 *                             type: integer
 *                             example: 5
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to load dashboard data
 */