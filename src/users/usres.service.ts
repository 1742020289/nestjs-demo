import { HttpService, Injectable } from "@nestjs/common";
import { timeStamp } from "console";
import { User } from "src/interfaces/user.interface";
const fs = require('fs');
const path = require('path')
const axios = require('axios');



@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService) { }
   /** 当前所有用户列表*/
    private userMap = new Map();

    /**从远程服务获取的用户列表 */
    private usersMap_=new Map();

   

/**
 * 初始化用户列表
 */
    Init(){

        let userList={
            U005: { id: 'U005', name: 'lili', email: '1215@qq.com' },
            U006: { id: 'U006', name: 'lucy', email: '56wweq25@163.com' },
            U007: { id: 'U007', name: 'cindy', email: '5625@163.com' },
            U008: { id: 'U008', name: 'rose', email: 'ejfiwjfo@qq.com' }
          };
          for(let key in userList){
            this.userMap.set(key,userList[key]);
          }

    }
    /**
     * 添加用户
     * @param user 
     * @returns 
     */
    addUser(user: User): boolean {

        if (!this.userMap.has(user.id)) {
            this.userMap.set(user.id, user);
            return true;
        } else {
            return false;
        }

    }
    /**
     * 删除指定id的用户
     * @param id 
     */
    delUser(id: string): boolean {

        let result: boolean;
        if (this.userMap.has(id)) {
            result = this.userMap.delete(id);
            return result;
        } else {
            return false;
        }
    }
    /**
     * 修改用户
     * @param query 
     * @returns 
     */
    updateUser(query): boolean {

        if (this.userMap.has(query.id)) {
            this.userMap.set(query.id, query);
            return true;
        } else {
            return false;
        }

    }
    /**
     * 查询用户
     * @param id 
     * @returns 
     */
    searchUser(id: string): any {
        return this.userMap.get(id);
    }
    /**
     * 查看所有用户
     * @returns 
     */
    findAll(): any {
        return this.userMap;
    }
    /**
     * 获取用户
     * @returns 
     */
    getUser(){
        
        axios.post('http://10.0.0.118:3010/phone/read').then(res => {
            console.log(res.data);
            
                 //将获取到的json转换为map 对象
            for(let key in res.data){
                this.usersMap_.set(key,res.data[key]);
           
              
            }
           
        }).catch(err => {
            console.log(err);
        });
        


    }
    /**
     * 保存用户到文件user.json
     */
    saveUser(): boolean {
        let userJson={}

        //map对象转json
        for (let [key,value] of this.userMap.entries()) {
            userJson[key]=value;
        }
        let content = JSON.stringify(userJson);

        fs.writeFile(path.resolve(__dirname, './user.json'), content, err => {
            if (err) {
                console.log(err);
                return false;
            }

        })
        return true;


    }
    /**
     * 读取用户
     * @returns 
     */
    readUser():string {

      return fs.readFileSync(path.resolve(__dirname, './user.json'), 'utf8') 
        
    }
    /**
     * 合并用户
     */
    mergeUser() {

        for(let key of this.usersMap_.keys()){
            if(this.userMap.has(key)){
                //比较对象
                
            }else{
                //直接添加进去
                this.userMap.set(key,this.usersMap_.get(key));
            }
        }
        //根据id 排序
        /**排序后的用户列表 */
        let userArr=[];
       for(let val of this.userMap.values()){
            userArr.push(val);
       }
       
       userArr.sort(function(a:any,b:any):number{
         return (a.id.slice(1))-(b.id.slice(1))
       });
       //数组对象转map
       console.log(userArr)
       let map=new Map();
       for(let i=0;i<userArr.length;i++){
            map.set(userArr[i].id,userArr[i]);
       }
        this.userMap=map;
    }

}