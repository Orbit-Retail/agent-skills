import {
  AppError,
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  spira,
} from "@froggydev/spira";
import z from "zod";

@Injectable()
class UsersService {
  find(id: string) {
    if (id !== "u1") {
      throw new AppError({
        code: "USER_NOT_FOUND",
        status: 404,
        message: "User not found",
      });
    }
    return { id, name: "Ada" };
  }
}

const CreateUser = z.object({ name: z.string().min(1) });

@Controller("/users")
class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get("/:id")
  find(@Param("id") id: string) {
    return this.users.find(id);
  }

  @Post("/")
  create(@Body(CreateUser) input: z.infer<typeof CreateUser>) {
    // Demonstrates validation only; persistence belongs in an application service.
    return { name: input.name };
  }
}

const users = spira.module.create({
  name: "users",
  controllers: [UsersController],
});

export const app = spira.create({ modules: [users] });
// Start from your bootstrap with app.listen(port).
