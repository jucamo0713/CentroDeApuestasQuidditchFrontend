import { BetHttpRepository } from '../../../domain/model/gateways/BetHttp.Repository';
import { SessionData } from '../../../../auth/domain/model/SessionData';
import { PaginatedModel } from '../../../../shared/domain/model/PaginatedModel';
import { Bet } from '../../../domain/model/Bet';

export class HttpBetRepository implements BetHttpRepository {
    //TODO:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getBetsPaginated(page: number, limit: number, sessionData: SessionData): Promise<PaginatedModel<Bet>> {
        //TODO: integrate with backend
        const data: Bet[] = [
            {
                betId: '41c158f4-8d75-43c6-8a6e-dbf6607ff258',
                finished: true,
                profit: 40.473,
                value: {
                    galleons: 7064,
                    knuts: 29,
                    sickles: 10,
                },
                won: true,
            },
            {
                betId: '27f62faf-b14f-4c4e-9b81-126c55760ebb',
                finished: false,
                profit: 15.202,
                value: {
                    galleons: 44861,
                    knuts: 29,
                    sickles: 10,
                },
                won: false,
            },
            {
                betId: '474c3157-7d1c-493e-871f-eca9aad504da',
                finished: false,
                profit: 1.763,
                value: {
                    galleons: 42511,
                    knuts: 9,
                    sickles: 10,
                },
                won: false,
            },
            {
                betId: 'bbdbe34e-f5a9-46bf-9b1c-aedd2541a70d',
                finished: true,
                profit: 26.811,
                value: {
                    galleons: 891,
                    knuts: 10,
                    sickles: 5,
                },
                won: false,
            },
            {
                betId: 'b20e34bd-452e-478b-a637-e5f586b0609a',
                finished: true,
                profit: 25.799,
                value: {
                    galleons: 19746,
                    knuts: 18,
                    sickles: 15,
                },
                won: false,
            },
            {
                betId: '40df73a5-2dbc-4b5a-b73d-5270db8a5c50',
                finished: true,
                profit: 26.158,
                value: {
                    galleons: 35341,
                    knuts: 4,
                    sickles: 5,
                },
                won: true,
            },
            {
                betId: '89366fce-68e1-4244-a94b-e4a099aa6f1a',
                finished: true,
                profit: 43.237,
                value: {
                    galleons: 45498,
                    knuts: 20,
                    sickles: 3,
                },
                won: true,
            },
            {
                betId: '36b12424-a6e7-4329-a779-2ac88def1d35',
                finished: true,
                profit: 6.605,
                value: {
                    galleons: 17545,
                    knuts: 29,
                    sickles: 6,
                },
                won: true,
            },
            {
                betId: '57babcbd-7c70-4a21-9388-258fed9f5a19',
                finished: false,
                profit: 41.006,
                value: {
                    galleons: 20503,
                    knuts: 23,
                    sickles: 11,
                },
                won: false,
            },
            {
                betId: 'de5e55a8-e8c8-491e-a6e0-e1d360be6b1e',
                finished: false,
                profit: 32.483,
                value: {
                    galleons: 38026,
                    knuts: 26,
                    sickles: 13,
                },
                won: false,
            },
            {
                betId: 'df2bc7d1-8f8a-446c-b675-3115ab521ea8',
                finished: false,
                profit: 4.687,
                value: {
                    galleons: 49627,
                    knuts: 28,
                    sickles: 13,
                },
                won: false,
            },
            {
                betId: '51c75ceb-146b-4476-b95d-aa295a7a6346',
                finished: false,
                profit: 18.713,
                value: {
                    galleons: 4145,
                    knuts: 8,
                    sickles: 8,
                },
                won: false,
            },
            {
                betId: '47902d37-fec8-4c59-88e4-2d3141f638ea',
                finished: false,
                profit: 20.639,
                value: {
                    galleons: 15171,
                    knuts: 21,
                    sickles: 15,
                },
                won: false,
            },
            {
                betId: '37659f84-58d9-440c-bd97-95caade52c08',
                finished: false,
                profit: 14.192,
                value: {
                    galleons: 9995,
                    knuts: 11,
                    sickles: 15,
                },
                won: false,
            },
            {
                betId: 'b932913c-78ad-4fc3-9bfc-3db5b4b1f306',
                finished: false,
                profit: 21.596,
                value: {
                    galleons: 29815,
                    knuts: 3,
                    sickles: 12,
                },
                won: false,
            },
            {
                betId: 'c10e10fe-5e28-4f40-8916-c402241dafa1',
                finished: false,
                profit: 49.772,
                value: {
                    galleons: 12639,
                    knuts: 22,
                    sickles: 17,
                },
                won: false,
            },
            {
                betId: '98fcb7fd-37e6-4503-b6be-b7fb295f4275',
                finished: true,
                profit: 42.717,
                value: {
                    galleons: 28214,
                    knuts: 24,
                    sickles: 2,
                },
                won: true,
            },
            {
                betId: '41160d1a-feb8-4c7e-a238-b8d881122ec3',
                finished: false,
                profit: 46.348,
                value: {
                    galleons: 21615,
                    knuts: 24,
                    sickles: 5,
                },
                won: false,
            },
            {
                betId: '9dcaa6e3-58a4-4d24-a960-f6d8101f1ef5',
                finished: true,
                profit: 17.071,
                value: {
                    galleons: 29990,
                    knuts: 13,
                    sickles: 1,
                },
                won: true,
            },
            {
                betId: '4e9d1dea-0525-45c6-94db-a5b051993b10',
                finished: false,
                profit: 28.111,
                value: {
                    galleons: 26477,
                    knuts: 13,
                    sickles: 15,
                },
                won: false,
            },
            {
                betId: '4888ce35-fd93-4752-9645-80a1f51e016f',
                finished: false,
                profit: 47.9,
                value: {
                    galleons: 44817,
                    knuts: 24,
                    sickles: 11,
                },
                won: false,
            },
            {
                betId: 'ac2dada2-3711-43b7-9cd4-f5e2e25d23d2',
                finished: true,
                profit: 21.396,
                value: {
                    galleons: 49162,
                    knuts: 12,
                    sickles: 11,
                },
                won: true,
            },
            {
                betId: 'd8050145-bcc5-4e71-99f8-5a84f919483b',
                finished: true,
                profit: 2.286,
                value: {
                    galleons: 1436,
                    knuts: 28,
                    sickles: 11,
                },
                won: false,
            },
            {
                betId: '6f463d83-84ed-4ba8-b075-a6d90366c0e8',
                finished: false,
                profit: 13.664,
                value: {
                    galleons: 47619,
                    knuts: 7,
                    sickles: 16,
                },
                won: false,
            },
            {
                betId: 'b95e566b-f1c8-4f19-b795-8dcba0a4b0ec',
                finished: true,
                profit: 31.338,
                value: {
                    galleons: 47182,
                    knuts: 19,
                    sickles: 8,
                },
                won: true,
            },
            {
                betId: 'c314be8f-099b-4e7c-bfcc-60b8d473e698',
                finished: false,
                profit: 17.713,
                value: {
                    galleons: 6696,
                    knuts: 28,
                    sickles: 15,
                },
                won: false,
            },
            {
                betId: '68f63366-2dea-4018-85ee-8084916dd952',
                finished: true,
                profit: 37.226,
                value: {
                    galleons: 26094,
                    knuts: 24,
                    sickles: 13,
                },
                won: false,
            },
            {
                betId: '7b6e875e-5524-4937-86f4-5b13f200c939',
                finished: false,
                profit: 49.798,
                value: {
                    galleons: 32895,
                    knuts: 13,
                    sickles: 4,
                },
                won: false,
            },
            {
                betId: '0888dddd-562a-41b0-9ef4-4c672d78a22a',
                finished: false,
                profit: 48.207,
                value: {
                    galleons: 41366,
                    knuts: 12,
                    sickles: 8,
                },
                won: false,
            },
            {
                betId: '85430a4a-acec-42ef-86df-e6bc038f9b50',
                finished: true,
                profit: 16.797,
                value: {
                    galleons: 45005,
                    knuts: 19,
                    sickles: 13,
                },
                won: true,
            },
            {
                betId: 'b759281a-be28-4d96-aa02-54445517d9f8',
                finished: true,
                profit: 31.214,
                value: {
                    galleons: 29498,
                    knuts: 19,
                    sickles: 6,
                },
                won: false,
            },
            {
                betId: '9c113baa-2787-4a75-933a-cd12cccf13d1',
                finished: false,
                profit: 46.55,
                value: {
                    galleons: 19507,
                    knuts: 2,
                    sickles: 12,
                },
                won: false,
            },
            {
                betId: '5d4bbf81-4662-48a5-b7db-91315a246a3e',
                finished: false,
                profit: 7.227,
                value: {
                    galleons: 11204,
                    knuts: 18,
                    sickles: 6,
                },
                won: false,
            },
        ];
        const metadata = {
            limit: limit,
            page: page,
            total: data.length,
            totalPages: Math.ceil(data.length / limit),
        };
        const start = (page - 1) * limit;
        const response = {
            data: data.slice(start, start + limit),
            metadata,
        };
        return response;
    }
}
