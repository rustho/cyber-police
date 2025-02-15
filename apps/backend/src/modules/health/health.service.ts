import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class HealthService {
  constructor(private dataSource: DataSource) {}

  async checkHealth() {
    try {
      // Check database connection
      const dbStatus = await this.checkDatabase();

      return {
        status: "ok",
        timestamp: new Date().toISOString(),
        services: {
          database: dbStatus,
        },
      };
    } catch (error: any) {
      return {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error?.message || "Unknown error",
      };
    }
  }

  private async checkDatabase(): Promise<"up" | "down"> {
    try {
      await this.dataSource.query("SELECT 1");
      return "up";
    } catch (error) {
      return "down";
    }
  }
}
