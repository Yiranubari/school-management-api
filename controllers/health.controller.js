export class HealthController {
  checkHealth(req, res) {
    return res.status(200).json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  }
}

const healthController = new HealthController();
export default healthController;
