import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(data) {
    const exists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (exists)
      throw new BadRequestException(
        "El correo ya ha sido utilizado con otro usuario."
      );
    const password = await bcrypt.hash(data.password, 10);
    await this.prisma.user.create({ data: { ...data, password } });
    return { message: "Usuario creado." };
  }

  async login(data) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new UnauthorizedException("Correo o contraseña equivocada.");
    return {
      message: "Inicio de session correcto.",
      token: this.jwt.sign({ sub: user.id }),
    };
  }
}
