import { HttpClient, HttpResponse, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable, Subject, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../domain.ts/user';




@Injectable()
export class userService{
    constructor(private _httpService: HttpClient ){}
   

    listAllUser(): Observable<User[]>{
     return this._httpService.get<User[]>("http://localhost:8081/users")
  }

    private handelError(error: Response){
        return Observable.throw(error);
    }
    registerUser(user:User){
        
        let body=JSON.stringify(user);
        
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
          if(user.uid){
              return this._httpService.put("http://localhost:8081/users/"+user.uid , body, httpOptions)
          }else{
        return this._httpService.post("http://localhost:8081/users/registerNewUser", body, httpOptions);
    }
}

deleteUser(uid:bigint){

        return this._httpService.delete('http://localhost:8081/users/'+uid);
    }
 
    getUserbyid(uid : bigint):Observable<User>{
       return this._httpService.get<User>("http://localhost:8081/users/"+uid);
       
    }
 getSortedDob(){
            return (this._httpService.get<User>("http://localhost:8081/users/sortdob/"));
            }
getSortedDoj(){
        return (this._httpService.get<User>("http://localhost:8081/users/sortjoiningdate/"));
                }

}

