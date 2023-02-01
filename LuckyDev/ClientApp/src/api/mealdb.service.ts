import axios, { type AxiosInstance } from 'axios';

export type Meal = {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate?: any;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strIngredient16: string;
    strIngredient17: string;
    strIngredient18: string;
    strIngredient19: string;
    strIngredient20: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    strMeasure16: string;
    strMeasure17: string;
    strMeasure18: string;
    strMeasure19: string;
    strMeasure20: string;
    strSource: string;
    strImageSource?: string;
    strCreativeCommonsConfirmed?: boolean;
    dateModified?: string;
}
export type MealsSelection = {
    meals:Meal[]
}

/**
 * Mealdb API class - configures default settings/error handling for inheriting class
 */
export abstract class BaseMealDbService {
  protected readonly $http: AxiosInstance;

  protected constructor(controller: string, timeout: number = 50000) {
    this.$http = axios.create({
      timeout,
      baseURL: `https://www.themealdb.com/api/json/v2/9973533/${controller}/`
    });
  }
}
class MealDbService extends BaseMealDbService {
    private static _sampleService: MealDbService;
    private static _controller: string = '';
  
    private constructor(name: string) {
      super(name);
    }
  
    public static get Instance(): MealDbService {
      return this._sampleService || (this._sampleService = new this(this._controller));
    }
  
    public async getRandomSelection(): Promise<Meal[]> {
      const url = `randomselection.php`;
      const { data } = await this.$http.get<MealsSelection>(url);
      return data.meals;
    }

    public async getMeals(): Promise<Meal[]> {
      const url = `search.php?f=a`;
      const { data } = await this.$http.get<MealsSelection>(url);
      return data.meals;
    }
  }
  
  export const MealDbApi = MealDbService.Instance;
