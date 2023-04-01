import { IsNumber, IsString, ValidateNested, IsOptional } from "class-validator";

export class Pollution{

    @IsString()
    ts: string;
    @IsNumber()
    aqius: number;
    @IsString()
    mainus: string;
    @IsNumber()
    aqicn: number;
    @IsString()
    maincn: string;

}
export class NearestCityPollutionQueryParams {
    
    @IsNumber()
    @IsOptional()
    lat: number;

    @IsNumber()
    @IsOptional()
    lon: number;
}

export class Result {
    @ValidateNested()
    Pollution: Pollution;
}
export class NearestCityPollutionResponseDTO{

    @ValidateNested()
    Result: Result;
}





