import { InsertResult, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Pollution } from "../entities/Pollution";

export class PollutionRepository {

     pollutionRepo = AppDataSource.getRepository(Pollution)

    async findOneByDate(date: Date): Promise<Pollution | null>{
        return this.pollutionRepo.findOne({
            where:{
                date: date,
            }
        })
    }

    async insertPollutionRecord(pollutionData: {
        aqius: number;
        mainus: string;
        aqicn: number;
        maincn: string;
        date: Date;
    }): Promise<InsertResult>{
        return this.pollutionRepo.insert({
            aqius: pollutionData.aqius,
            mainus: pollutionData.mainus,
            aqicn: pollutionData.aqicn,
            maincn: pollutionData.maincn,
            date: pollutionData.date,
        })
    }

}