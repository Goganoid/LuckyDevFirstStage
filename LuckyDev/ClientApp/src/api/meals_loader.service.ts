import { MealDbApi } from 'src/api/mealdb.service';
import type { Meal } from "./mealdb.service";

const alphabet = "abcdefghijklmnopqrstuvwxyz";


export type MealsFilter = {
    name: string,
    ingredients: string[],
    area: string,
    category: string,
}
class MealsLoaderService {
    private static _sampleService: MealsLoaderService;
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
    public Reset() {
        this._meals = [];
        this.last_letter = 0;
        this.last_meal = 0;
        this.end = false;
    }

    public async TakeNext(n: number, filters?: MealsFilter): Promise<Meal[]> {
        if (this.end) return Promise.resolve([]);
        while (this.last_meal + n > this._meals.length) {
            var new_meals = await MealDbApi.getMeals(alphabet[this.last_letter]) ?? [];
            if (filters !== undefined) {
                if (filters.name !== '') {
                    new_meals = new_meals.filter(meal => meal.strMeal.toLowerCase().includes(filters.name.toLowerCase()!));
                }
                if (filters.category !== '') {
                    new_meals = new_meals.filter(meal => meal.strCategory === filters.category);
                }
                if (filters.area !== '') {
                    new_meals = new_meals.filter(meal => meal.strArea === filters.area);
                }
                if (filters.ingredients.length !== 0) {
                    new_meals = new_meals.filter(meal => {
                        for (let filterIngredient of filters.ingredients) {
                            let occured = false;
                            for (let i = 1; i <= 20; i++) {
                                if ((meal as any)[`strIngredient${i}`] === filterIngredient)
                                    occured = true;
                            }
                            if (!occured) return false;
                        }
                        return true;
                    });
                }
            }
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