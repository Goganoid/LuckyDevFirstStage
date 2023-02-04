import { MealDbApi } from 'src/api/mealdb.service';
import type { Meal } from "./mealdb.service";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export type MealsFilter = {
    name: string,
    ingredients: string[],
    area: string,
    category: string,
}
// MealDB API can only return meals based on first letter. It can't return all meals at one time.
// This special service implements seamless data loading by tracking the last letter used.

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

    private Filter(meals: Meal[], filters: MealsFilter) {
        if (filters.name !== '') {
            meals = meals.filter(meal => meal.strMeal.toLowerCase().includes(filters.name.toLowerCase()!));
        }
        if (filters.category !== '') {
            meals = meals.filter(meal => meal.strCategory === filters.category);
        }
        if (filters.area !== '') {
            meals = meals.filter(meal => meal.strArea === filters.area);
        }
        if (filters.ingredients.length !== 0) {
            meals = meals.filter(meal => {
                let occured = false;
                for (let filterIngredient of filters.ingredients) {
                    
                    for (let i = 1; i <= 20; i++) {
                        if ((meal as any)[`strIngredient${i}`] === filterIngredient)
                            occured = true;
                    }
                    
                }
                return occured;
            });
        }
        return meals
    }

    public async TakeNext(n: number, filters?: MealsFilter): Promise<Meal[]> {
        if (this.end) return Promise.resolve([]);
        while (this.last_meal + n > this._meals.length) {
            let new_meals = await MealDbApi.getMeals(alphabet[this.last_letter]) ?? [];
            if(filters) new_meals = this.Filter(new_meals,filters)
            this._meals.push(...new_meals);

            if (this.last_letter < alphabet.length - 1) this.last_letter += 1;
            else {
                n = this._meals.length;
                this.end = true;
                break;
            }
        }
        const result = this._meals.slice(this.last_meal, this.last_meal + n);
        this.last_meal += n;
        return Promise.resolve(result);
    }

}

export const MealsLoader = MealsLoaderService.Instance;