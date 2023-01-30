import { BaseService } from './base.service';
export type WeatherForecast = Readonly<{
  id: number;
  summary: string;
  temperatureC: number;
  temperatureF: number;
  dateFormatted: string;
}>;
/**
 * SampleData API abstraction layer communication via Axios (typescript singleton pattern)
 */
class SampleService extends BaseService {
  private static _sampleService: SampleService;
  private static _controller: string = 'SampleData';

  private constructor(name: string) {
    super(name);
  }

  public static get Instance(): SampleService {
    return this._sampleService || (this._sampleService = new this(this._controller));
  }

  public async getForecastsAsync(startDateIndex: number): Promise<WeatherForecast[]> {
    const url = `WeatherForecasts?startDateIndex=${startDateIndex}`;
    const { data } = await this.$http.get<WeatherForecast[]>(url);
    return data;
  }
}

export const SampleApi = SampleService.Instance;
