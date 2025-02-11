import { Body, Controller, Post } from "@nestjs/common";
import { CtaService } from "../services/cta.service";
import { CtaSubmissionDto } from "../domain/dto/cta.dto";

@Controller("api/cta")
export class CtaController {
  constructor(private readonly ctaService: CtaService) {}

  @Post("submit")
  async submitEmail(@Body() data: CtaSubmissionDto) {
    const success = await this.ctaService.submitEmail(data);
    if (success) {
      return { status: "success" };
    }
    return { status: "error", message: "Failed to process submission" };
  }
}
