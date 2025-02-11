import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CtaSubmissionDto } from "../domain/dto/cta.dto";
import { Subscriber } from "../subscriber/subscriber.entity";

@Injectable()
export class CtaService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepo: Repository<Subscriber>
  ) {}

  async submitEmail(data: CtaSubmissionDto): Promise<boolean> {
    try {
      const subscriber = this.subscriberRepo.create({ email: data.email });
      await this.subscriberRepo.save(subscriber);
      return true;
    } catch (error) {
      console.error("Error processing CTA submission:", error);
      return false;
    }
  }

  async getSubmissions(): Promise<Subscriber[]> {
    return this.subscriberRepo.find();
  }
}
