import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UsersService } from "./usres.service";
import { User } from "src/interfaces/user.interface";



@Controller('user')
export class UserController {
    constructor(private usersService: UsersService) { }
    //初始化用户列表
    @Get('init')
    async Init():Promise<string>{
        this.usersService.Init()
        return '初始化完成！'
    }
    //添加用户
    @Post('addUser')
    async addUser(@Body() createUserDto: CreateUserDto): Promise<string> {
        var flag = this.usersService.addUser(createUserDto);
        if (flag) {
            return '添加用户成功'
        } else {
            return '用户id 已存在，添加失败！'
        }

    }
    //删除用户
    @Delete('delUser')
    async delUser(@Query() query) {

        let flag = this.usersService.delUser(query.id);
        if (flag) {
            return `成功删除id：${query.id}的用户！`;
        } else {
            return `删除失败，id:${query.id}不存在！`;
        }
    }
    //更新用户
    @Put('updateUser')
    async updateUser(@Query() query) {

        let flag = this.usersService.updateUser(query)
        if (flag) {
            return `成功修改id：${query.id}的用户信息！`;
        } else {
            return `修改失败，id:${query.id}不存在！`;
        }
    }
    //查询指定id用户
    @Get('searchUser')
    async searchUser(@Query() query): Promise<any> {

        let result = this.usersService.searchUser(query.id);
        if (typeof result == 'undefined') {
            return `找不到id:${query.id}的用户！`
        }
        return result;
    }
    //查询所有用户
    @Get('findAll')
    async findAll(): Promise<User[]> {
        let userArr: User[] = [];
        let userMap = this.usersService.findAll();
        //map转成数组，保证接口返回的数据格式不变；
        for (let item of userMap.values()) {
            userArr.push(item);
        }
        return userArr;


    }
    //获取用户
    @Get('getUser')
    async getUser(){
         this.usersService.getUser();
        return '获取数据完成！'
    }
    //保存用户
    @Get('saveUser')
    async saveUser(): Promise<string> {
        let flag = this.usersService.saveUser();
        if (flag) {
            return '保存成功！'
        } else {
            return '保存失败！'
        }
    }
    //读取用户
    @Get('readUser')
    async readUser(): Promise<string> {
        return this.usersService.readUser();
    }
    //合并用户
    @Get('merge')
    async mergeUser():Promise<string>{
        this.usersService.mergeUser();
        return '合并完成！'
    }
}