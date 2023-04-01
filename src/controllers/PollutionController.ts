import { Controller, Get, QueryParam, QueryParams, Req } from "routing-controllers";
import { Request } from "express";
import { PollutionService } from "../services/PollutionService";
import { NearestCityPollutionQueryParams, NearestCityPollutionResponseDTO } from "./dto.pollution-controller";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

@Controller('/pollution')
export class PollutionController {

    private pollutionService = new PollutionService();
    /**
     * Controller to get nearest city pollution data based on the coordinates sent
     * 
     * @param {NearestCityPollutionQueryParams} queryParam coordinates data
     * @returns {NearestCityPollutionResponseDTO} Controller DTO mapping pollution data
     */
    @Get('/nearest_city')
    @OpenAPI({ summary: 'Get Polllution Data' })
    @ResponseSchema(NearestCityPollutionResponseDTO)
    async getNearestCityPollution(@QueryParams() query:NearestCityPollutionQueryParams): Promise<NearestCityPollutionResponseDTO>{
        const nearestCityPollution = await this.pollutionService.getNearestCityPollution(query);
        return nearestCityPollution;
    }
    
    /**
     * Controller to Get Max data where paris was polluted
     */
    @Get('/max')
    async getMaxPollutionDate(): Promise<Date>{
        const maxPollutedDate = await this.pollutionService.maxPollutedDate();
        return maxPollutedDate
    }


}