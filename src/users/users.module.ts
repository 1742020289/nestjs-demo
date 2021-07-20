import { HttpModule, Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UsersService } from "./usres.service";


@Module({
    imports:[HttpModule],
    controllers:[UserController],
    providers:[UsersService],

})
export class UsersModule{}