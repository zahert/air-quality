import { PollutionService } from "../src/services/PollutionService";
import { PollutionController } from "../src/controllers/PollutionController";
import chai from 'chai';
require('dotenv').config();


const assert = require("assert");
import request from 'supertest';
import 'reflect-metadata';
import app  from "../src/app";
describe('Mapping Pollution API Response', function () {
    it('It should return mapped DTO based on the API response', function () {
    //     Initialize Pollution service
         const pollutionService = new PollutionService();
    //     prepare the pollution data
        const data = {"status": "success",
        "data": {
            "city": "New Cairo",
            "state": "Cairo",
            "country": "Egypt",
            "location": {
                "type": "Point",
                "coordinates": [
                    31.47,
                    30.03
                ]
            },
            "current": {
                "pollution": {
                    "ts": "2023-03-31T18:00:00.000Z",
                    "aqius": 25,
                    "mainus": "p2",
                    "aqicn": 9,
                    "maincn": "p2"
                },
                "weather": {
                    "ts": "2023-03-31T19:00:00.000Z",
                    "tp": 14,
                    "pr": 1021,
                    "hu": 55,
                    "ws": 4.12,
                    "wd": 10,
                    "ic": "03n"
                }
            }
        }
    }
    const mappedDTO = pollutionService.mapIQAIRResponseToDTO(data);
    assert.equal(JSON.stringify(mappedDTO),JSON.stringify({
        Result:{
            Pollution:{
                ts:"2023-03-31T18:00:00.000Z",
                aqius:25,
                mainus:"p2",
                aqicn: 9,
                maincn: "p2"
            }
        }
        }))
    });
});

describe('API Integration Test', function () {
    it('It should return Pollution DTO', function (done) {
        this.timeout(3000);
       const  pollutionController = new PollutionController();
       const result =  pollutionController.getNearestCityPollution({
        lat: 12,
        lon:12,
       }).then((res)=>{
            chai.expect(res).to.contain.keys('Result');
            done()        
       });
    })
})