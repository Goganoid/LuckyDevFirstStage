import { AxiosError, type AxiosResponse } from "axios";
import { BaseService } from "./base.service";


export interface Ingredient {
    ingredientInfoId: string;
    measure: string;
}

export interface UserCustomMeal {
    id: number;
    name: string;
    ingredients: Ingredient[];
    instructions: string;
}

export interface UserMeals {
    savedMealsIds: string[];
    userMeals: UserCustomMeal[];
}


class UserService extends BaseService {
    private static _sampleService: UserService;
    private static _controller: string = 'Users';
    private _tokenIsSet = false;
    private constructor(name: string) {
        super(name);
    }

    public static get Instance(): UserService {
        return this._sampleService || (this._sampleService = new this(this._controller));
    }

    public SetToken(token: string) {
        this.$http.defaults.headers.common['Authorization'] = `bearer ${token}`;
        this._tokenIsSet = true;
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