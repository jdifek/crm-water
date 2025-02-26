import $api from "../http";
export interface CurrentDaySummaryResponse {
  data: CurrentDaySummary;
  errors: string[];
  status: string;
}

export interface CurrentDaySummary {
  sessions: number;
  litres: string;
  income: string;
}

export interface Last30DaysResponse {
  data: Last30DaysData[];
  errors: string[];
  status: string;
}

export interface Last30DaysData {
  [date: string]: DailyStats;
}

export interface DailyStats {
  sessions: number;
  litres: number;
  income: number;
}

export default class StatsService {
  static async currentDaySummary(): Promise<CurrentDaySummaryResponse> {
    return (
      await $api.get<CurrentDaySummaryResponse>(
        "stats/general/current-day-summary/"
      )
    ).data;
  }
  static async currentLast(): Promise<Last30DaysResponse> {
    return (await $api.get<Last30DaysResponse>("stats/general/last-30-days/"))
      .data;
  }
}
