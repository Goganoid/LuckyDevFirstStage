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
        console.log(`Called Instance, _sampleService is null = ${this._sampleService == null}`)
        return this._sampleService || (this._sampleService = new this());
    }

    public IsEnd(): boolean {
        return this.end;
    }

    public async TakeNext(n: number): Promise<Meal[]> {
        console.log(`Called TakeNext n=${n}, last_letter=${this.last_letter}, last_meal=${this.last_meal}, length=${this._meals.length}`);
        if (this.end) return Promise.resolve([]);
        this._cycles = 0;
        while (this.last_meal + n > this._meals.length && this._cycles < 10) {
            this._cycles += 1;
            console.log(`Getting meals with letter '${alphabet[this.last_letter]}'`);
            const new_meals = await MealDbApi.getMeals(alphabet[this.last_letter]) ?? [];
            console.log(`Received ${new_meals.length} meals`);
            this._meals.push(...new_meals);

            if (this.last_letter < alphabet.length - 1) this.last_letter += 1;
            else {
                n = this._meals.length;
                console.log("Reached the end of the alphabet");
                this.end = true;
                break;
            }
        }
        console.log(`Returning in range [${this.last_meal},${this.last_meal + n}) of array with size ${this._meals.length}`);
        const result = this._meals.slice(this.last_meal, this.last_meal + n);
        console.log(result.length);
        this.last_meal += n;
        return Promise.resolve(result);
    }

}

export const MealsLoader = MealsLoaderService.Instance;