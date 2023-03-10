import type { AxiosResponse } from "axios";
import { BaseService } from "./base.service";

// This service is responsible for Login and Register actions

export type LoginResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

class AuthService extends BaseService {
    private static _sampleService: AuthService;
    private static _controller: string = 'Auth';
    
    private constructor(name: string) {
      super(name);
    }
  
    public static get Instance(): AuthService {
      return this._sampleService || (this._sampleService = new this(this._controller));
    }

    public async Login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        const url = `login`;
        const request = {
            email,
            password
        }
        const data  = await this.$http.post<LoginResponse>(url,JSON.stringify(request), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }
    public async Register(firstName:string,lastName:string,email: string, password: string): Promise<AxiosResponse<any>> {
        const url = `register`;
        const request = {
            firstName,
            lastName,
            email,
            password
        }
        const data  = await this.$http.post(url,JSON.stringify(request), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }
  }
  
export const AuthApi = AuthService.Instance;
  
// Usage Example

// AuthApi.Register("Test1","Test2","john_doe1111@gmail.com", "123456").then(response => {
//     console.log(response);
// })
// AuthApi.Login("john_doe1111@gmail.com", "123456").then(response => {
//     console.log(response);
// })