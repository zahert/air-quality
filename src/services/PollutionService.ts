import axios from 'axios'
import { IsNull, Not } from 'typeorm';
import { NearestCityPollutionQueryParams, NearestCityPollutionResponseDTO } from '../controllers/dto.pollution-controller';
import { PollutionRepository } from '../repositories/PollutionRepo';
import { IQAIRNearestCityResponse } from './dto-pollution-service';


export class PollutionService {


  private pollutionRepo = new PollutionRepository();

  /**
   * function to fullfill nearest location pollution request
   * 
   * @param {NearestCityPollutionQueryParams} coordinates lat & long received from the API query params
   * @returns {NearestCityPollutionResponseDTO} DTO of the pollution data
   */
  async getNearestCityPollution(coordinates: NearestCityPollutionQueryParams): Promise<NearestCityPollutionResponseDTO> {
    // fetch nearest city pollutions API
    const airqResponse = await this.fetchNearestCityData(coordinates);
    // map IQAIR Response to our DTO
    return this.mapIQAIRResponseToDTO(airqResponse);


  }

  /**
   * function responsible on mapping the Remote API response to DTO
   * 
   * @param {IQAIRNearestCityResponse} iqAirResponse response received from the remote API
   * @returns {NearestCityPollutionResponseDTO} Controller DTO
   */
  mapIQAIRResponseToDTO(iqAirResponse: IQAIRNearestCityResponse): NearestCityPollutionResponseDTO {
    return {
      Result: {
        Pollution: iqAirResponse.data.current.pollution,
      }
    }

  }

  /**
   * Function Fetching Remote API and returning the response without any manipulation
   * 
   * @param {NearestCityPollutionQueryParams} coordinates lat & long of the location
   * @returns {IQAIRNearestCityResponse} IQAIR API response object
   */
  private async fetchNearestCityData(coordinates: NearestCityPollutionQueryParams): Promise<IQAIRNearestCityResponse> {
    console.log(`${process.env.IQAIR_BASE_URL}${process.env.IQAIR_NEAREST_CITY_PATH_URL}`);
    const iqAirResponse = await axios.get(`${process.env.IQAIR_BASE_URL}${process.env.IQAIR_NEAREST_CITY_PATH_URL}`, {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
        key: process.env.IQAIR_API_KEY
      }
    });
    return iqAirResponse.data as IQAIRNearestCityResponse;
  }

  /**
   * CRON Job Logic
   */
  async schedulerLogic(): Promise<void> {

    // fetch paris pollution data
    const pollutionData = (await this.fetchNearestCityData({
      lat: 48.856613,
      lon: 2.352222
    })).data.current.pollution;
    // check if an old record with same date already exists
    const record = await this.pollutionRepo.findOneByDate(new Date(pollutionData.ts));

    if (!record) {
      // trigger pollution repository to save pollution data
      await this.pollutionRepo.insertPollutionRecord({
        aqicn: pollutionData.aqicn,
        aqius: pollutionData.aqius,
        maincn: pollutionData.maincn,
        mainus: pollutionData.mainus,
        date: new Date(pollutionData.ts),
      })
    }

  }

  /**
   * 
   * @returns {Date} Returns Date where Paris Air Quality was most poulluted
   */
  async maxPollutedDate(): Promise<Date> {
    // Assumption the lower aqius indicates more pollution
    const maxPollutedDate = await this.pollutionRepo.pollutionRepo.findOneOrFail({
      where: { aqius: Not(IsNull()) },
      order: {
        aqius: 'ASC'
      }
    });
    return maxPollutedDate?.date;
  }
}