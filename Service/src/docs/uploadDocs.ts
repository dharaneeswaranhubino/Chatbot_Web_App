/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File Upload APIs
 */

/**
 * @swagger
 * /api/v1/upload/profile-picture:
 *   post:
 *     summary: Upload profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profilePicture
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture file (jpg/png)
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
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
 *                   example: Profile picture uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                       example: 1713343434343-profile.png
 *                     path:
 *                       type: string
 *                       example: uploads/profile/1713343434343-profile.png
 *                     size:
 *                       type: integer
 *                       example: 204800
 *                     mimetype:
 *                       type: string
 *                       example: image/png
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: john@example.com
 *                         profilePicture:
 *                           type: string
 *                           example: uploads/profile/1713343434343-profile.png
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No file uploaded
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */