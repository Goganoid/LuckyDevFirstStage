import { MealDbApi } from 'src/api/mealdb.service';
import type { Meal } from "./mealdb.service";
// import { sort } from 'fast-sort';
const alphabet = "abcdefghijklmnopqrstuvwxyz";
type IngredientsMatched = {
    matches: number;
}

export type SearchResults = Meal & IngredientsMatched;

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
    private _meals: SearchResults[] = [];
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

    private Filter(meals: Meal[], filters: MealsFilter): SearchResults[] {
        let results = meals.map(meal => { return { ...meal, matches: 0 } }) as SearchResults[];
        if (filters.name !== '') {
            results = results.filter(meal => meal.strMeal.toLowerCase().includes(filters.name.toLowerCase()!));
        }
        if (filters.category !== '') {
            results = results.filter(meal => meal.strCategory === filters.category);
        }
        if (filters.area !== '') {
            results = results.filter(meal => meal.strArea === filters.area);
        }
        if (filters.ingredients.length !== 0) {
            results = results.map((meal) => {
                for (let filterIngredient of filters.ingredients) {
                    for (let i = 1; i <= 20; i++) {
                        if ((meal as any)[`strIngredient${i}`] == null) continue;
                        if ((meal as any)[`strIngredient${i}`].toLowerCase() === filterIngredient.toLowerCase())
                        {
                            meal.matches += 1;
                        }
                    }
                }
                return meal
            });
            results = results.filter((meal) => meal.matches > 0);
        }
        return results
    }

    public async TakeNext(n: number, filters?: MealsFilter): Promise<SearchResults[]> {
        if (this.end) return Promise.resolve([]);
        while (this.last_meal + n > this._meals.length) {
            const request = await MealDbApi.getMeals(alphabet[this.last_letter]) ?? [];
            let new_meals: SearchResults[] = request.map(meal => { return { ...meal, matches: 0 }});
            if (filters) new_meals = this.Filter(new_meals, filters);
            this._meals.push(...new_meals);

            if (this.last_letter < alphabet.length - 1) this.last_letter += 1;
            else {
                n = this._meals.length;
                this.end = true;
                break;
            }
        }
        // this._meals = sort(this._meals).by([
        //     { desc: m => m.matches  },
        //     { asc: m => m.strMeal },
        //   ]);
        const result = this._meals.slice(this.last_meal, this.last_meal + n);
        this.last_meal += n;
        return Promise.resolve(result);
    }

}

export const MealsLoader = MealsLoaderService.Instance;