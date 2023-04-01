export interface IQAIRNearestCityResponse {

    status: string;
    data: IQAIRNearestCityData

}

interface IQAIRNearestCityData{

    city: string;
    state: string;
    country: string;
    location: IQAIRLocation;
    current: CurrentData;
}

interface IQAIRLocation{
    type: string;
    coordinates: number[];
}

interface CurrentData {
    pollution: PollutionData;
    weather: WeatherData;
}

interface PollutionData {
    ts: string;
    aqius: number;
    mainus: string;
    aqicn: number;
    maincn: string;
}

interface WeatherData{
    ts: string;
    tp: number;
    pr: number;
    hu: number;
    ws: number;
    wd: number;
    ic: string;
}