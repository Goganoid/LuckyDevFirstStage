import { AxiosError, type AxiosResponse } from "axios";
import { isLoggedIn, getToken } from "src/utils/storage";
import { BaseService } from "./base.service";


export interface Ingredient {
    name: string;
    measure?: string;
}
// Describes meals that our database stores
export interface UserCustomMeal {
    id?: number;
    image: string;
    name: string;
    area: string;
    category: string;
    ingredients: Ingredient[];
    instructions: string;
    youtubeUrl: string;
}
export interface UserMeals {
    savedMealsIds: string[];
    userMeals: UserCustomMeal[];
}

export interface UserInformation{
        id: number,
        firstName: string,
        lastName: string,
        email: string
}

// Service that handles all requests connected with user actions
class UserService extends BaseService {
    private static _sampleService: UserService;
    private static _controller: string = 'Users';
    private constructor(name: string) {
        super(name);
        if (isLoggedIn())
            this.$http.defaults.headers.common['Authorization'] = `bearer ${getToken()}`;
    }

    public static get Instance(): UserService {
        return this._sampleService || (this._sampleService = new this(this._controller));
    }

    public async Ping(): Promise<AxiosResponse<any> | undefined>{
        const url = `ping`;
        try {
            const data = await this.$http.get(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response;
        }
    }

    public async GetUserIngredients(): Promise<AxiosResponse<Ingredient[]>>{
        const url = `stored-ingredients/get`;
        const data = await this.$http.get<Ingredient[]>(url);
        return data;
    }

    public async GetUserInfo(): Promise<AxiosResponse<UserInformation>>{
        const url = `info/`;
        const data = await this.$http.get<UserInformation>(url);
        return data;
    }
    public async GetMeals(): Promise<AxiosResponse<UserMeals>> {
        const url = `meals/get`;
        const data = await this.$http.get<UserMeals>(url);
        return data;
    }
    public async SaveMeal(mealId: string): Promise<AxiosResponse<any>|undefined> {
        const url = `meals/saved/add/${mealId}`;
        try {
            const data = await this.$http.post(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response
        }
    }
    public async DeleteSavedMeal(mealId: string): Promise<AxiosResponse<any>|undefined> {
        const url = `meals/saved/delete/${mealId}`;
        try {
            const data = await this.$http.delete(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response
        }
    }
    public async AddCustomMeal(meal: UserCustomMeal): Promise<AxiosResponse<any>|undefined> {
        const url = `meals/custom/add`;
        try {
            const data = await this.$http.post(url,JSON.stringify(meal), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response
        }
    }
    public async AddIngredient(name: string): Promise<AxiosResponse<any>|undefined> {
        const url = `stored-ingredients/add/${name}`;
        try {
            const data = await this.$http.post(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response
        }
    }
    public async UpdateIngredient(ingredient:Ingredient): Promise<AxiosResponse<any> | undefined>{
        const url = `stored-ingredients/update/`;
        try {
            const data = await this.$http.put(url,JSON.stringify(ingredient), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response
        }
    }
    public async DeleteIngredient(name: string): Promise<AxiosResponse<any>|undefined> {
        const url = `stored-ingredients/delete/${name}`;
        try {
            const data = await this.$http.delete(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response
        }
    }
    public async DeleteCustomMeal(mealId: string): Promise<AxiosResponse<any>|undefined> {
        const url = `meals/custom/delete/${mealId}`;
        try {
            const data = await this.$http.delete(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response
        }
    }
}

export const UserApi = UserService.Instance;

// Usage example (this token won't work!)

// UserApi.SetToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJuYmYiOjE2NzUzMzkyODIsImV4cCI6MTY3NTk0NDA4MiwiaWF0IjoxNjc1MzM5MjgyfQ.H3HRqQnmPkD4cD5nMDNcR_NiLU9MUYNErKci6b4qrdI");
//     UserApi.GetMeals().then(response => {
//         console.log("GetMeals response");
//         console.log(response);
//     });
//     UserApi.SaveMeal("33").then(response => {
//         console.log("SaveMeal response");
//         console.log(response);
//     }).catch(error => {
//         console.log("Catched Error");
//         console.log(error);
//     })