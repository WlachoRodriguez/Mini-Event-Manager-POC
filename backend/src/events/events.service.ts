import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data) {
    return this.prisma.event.create({
      data: { ...data, date: new Date(data.date) },
    });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException();
    return event;
  }

  async update(id: number, data) {
    await this.findOne(id);
    return this.prisma.event.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.event.delete({ where: { id } });
    return { message: "Evento eliminado." };
  }
}
