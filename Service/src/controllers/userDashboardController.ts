import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddelware.js";
import { userDashboardService } from "../container/userDashboardContainer.js";

export class UserDashboardController {
  async getDashboard(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const dashboardData = await userDashboardService.getDashboardData(userId);
      
      res.status(200).json({ 
        success: true, 
        data: dashboardData 
      });
    } catch (error: any) {
      console.error("Dashboard error:", error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Failed to load dashboard data" 
      });
    }
  }
}