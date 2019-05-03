import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchMaps } from '.';

describe('GOOGLE_FETCH_MAPS', ()=>{
    it('returns data', done =>{
        let mock = new MockAdapter(axios);
        const data = {response: {
            "success": true,
            "response": [
                {
                    "_id": "5ccb15152ceec36f4497ff93",
                    "address": "46 Rue Joseph Ducret, 25680 Rougemont, France",
                    "lat": 47.472806666702475,
                    "lng": 11.35085302734376
                }
            ]
        }};
        mock.onGet('/api/all').reply(200, data);

        fetchMaps({}).then(response => {
            expect(response).toEqual(data);
            done();
        })
    })
})

