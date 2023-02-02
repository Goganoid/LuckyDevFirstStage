import { MealDbApi } from 'src/api/mealdb.service';
import type { Meal } from "./mealdb.service";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

class MealsLoaderService {
    private static _sampleService: MealsLoaderService;
    private _cycles = 0;
    private _meals: Meal[] = [];
    private last_letter = 0;
    private last_meal = 0;
    private end = false;

    public static get Instance(): MealsLoaderService {
        return this._sampleService || (this._sampleService = new this());
    }

    public IsEnd(): boolean {
        return this.end;
    }

    public async TakeNext(n: number): Promise<Meal[]> {
        if (this.end) return Promise.resolve([]);
        this._cycles = 0;
        while (this.last_meal + n > this._meals.length && this._cycles < 10) {
            this._cycles += 1;
            const new_meals = await MealDbApi.getMeals(alphabet[this.last_letter]) ?? [];
            this._meals.push(...new_meals);

            if (this.last_letter < alphabet.length - 1) this.last_letter += 1;
            else {
                n = this._meals.length;
                this.end = true;
                break;
            }
        }
        const result = this._meals.slice(this.last_meal, this.last_meal + n);
        console.log(result.length);
        this.last_meal += n;
        return Promise.resolve(result);
    }

}

export const MealsLoader = MealsLoaderService.Instance;