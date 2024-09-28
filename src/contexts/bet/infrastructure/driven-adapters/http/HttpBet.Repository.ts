import { BetHttpRepository } from '../../../domain/model/gateways/BetHttp.Repository';
import { SessionData } from '../../../../auth/domain/model/SessionData';
import { PaginatedModel } from '../../../../shared/domain/model/PaginatedModel';
import { Bet } from '../../../domain/model/Bet';
import { MoneyData } from '../../../../money/domain/model/MoneyData';
import { BackendRepository } from '../../../../shared/infrastructure/driven-adapters/bck/backend.repository';
import { BackendUrlConstants } from '../../../../shared/infrastructure/driven-adapters/bck/backend-url.constants';

export class HttpBetRepository implements BetHttpRepository {
    //TODO:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getBetsPaginated(page: number, limit: number, sessionData: SessionData): Promise<PaginatedModel<Bet>> {
        //TODO: integrate with backend
        const data: Bet[] = [
            {
                betId: '16d325b2-b01d-402a-b5a6-121ea39e2976',
                finished: false,
                profit: 13.548,
                value: {
                    galleons: 74,
                    knuts: 29,
                    sickles: 1,
                },
                won: false,
            },
            {
                betId: 'c3dfbfe1-69b5-4b39-8786-a96eeb416c2c',
                finished: false,
                profit: 12.667,
                value: {
                    galleons: 110,
                    knuts: 12,
                    sickles: 17,
                },
                won: false,
            },
            {
                betId: 'ee5683ed-39f6-42f9-b71d-a4e865651ff8',
                finished: false,
                profit: 16.212,
                value: {
                    galleons: 15,
                    knuts: 8,
                    sickles: 6,
                },
                won: false,
            },
            {
                betId: 'dd7897c5-59c4-40c3-95fb-595e650dacee',
                finished: false,
                profit: 9.404,
                value: {
                    galleons: 152,
                    knuts: 29,
                    sickles: 12,
                },
                won: false,
            },
            {
                betId: '47276595-c9b4-4f2c-9fe1-db10fdde141c',
                finished: false,
                profit: 15.829,
                value: {
                    galleons: 177,
                    knuts: 8,
                    sickles: 12,
                },
                won: false,
            },
            {
                betId: '1a0dcb12-f22e-40d7-9e3b-c1451f9469cc',
                finished: false,
                profit: 5.41,
                value: {
                    galleons: 79,
                    knuts: 29,
                    sickles: 5,
                },
                won: false,
            },
            {
                betId: '057925ad-ee79-412e-86bd-b876284274a5',
                finished: false,
                profit: 14.18,
                value: {
                    galleons: 24,
                    knuts: 19,
                    sickles: 7,
                },
                won: false,
            },
            {
                betId: '7049859b-6adf-4998-bd20-0ce99edbb36d',
                finished: true,
                profit: 14.974,
                value: {
                    galleons: 12,
                    knuts: 1,
                    sickles: 16,
                },
                won: true,
            },
            {
                betId: 'cc0c0d49-333b-4949-bc40-0f8a45ff20cb',
                finished: false,
                profit: 8.932,
                value: {
                    galleons: 144,
                    knuts: 24,
                    sickles: 15,
                },
                won: false,
            },
            {
                betId: '3b9fd37d-6046-4c65-8f45-7339a496b606',
                finished: false,
                profit: 3.278,
                value: {
                    galleons: 139,
                    knuts: 6,
                    sickles: 7,
                },
                won: false,
            },
            {
                betId: 'ab009ce6-3db5-471b-a847-d3a00ce8d6fb',
                finished: false,
                profit: 14.855,
                value: {
                    galleons: 32,
                    knuts: 21,
                    sickles: 9,
                },
                won: false,
            },
            {
                betId: '6f48776e-ca42-4ff0-9469-6f2a5e81dead',
                finished: true,
                profit: 16.571,
                value: {
                    galleons: 50,
                    knuts: 5,
                    sickles: 15,
                },
                won: false,
            },
            {
                betId: 'de380b0c-fbd7-4a64-a55d-9cf9885b3a67',
                finished: true,
                profit: 3.369,
                value: {
                    galleons: 1,
                    knuts: 12,
                    sickles: 12,
                },
                won: false,
            },
            {
                betId: '13c56639-91d9-4ecf-867a-7fe1ff604929',
                finished: false,
                profit: 4.13,
                value: {
                    galleons: 6,
                    knuts: 9,
                    sickles: 13,
                },
                won: false,
            },
            {
                betId: '63f9f3af-617b-4daf-a0e0-7cf4eef6a852',
                finished: true,
                profit: 9.073,
                value: {
                    galleons: 126,
                    knuts: 27,
                    sickles: 8,
                },
                won: true,
            },
            {
                betId: 'c304b843-ff53-4766-83b2-3340ec121767',
                finished: true,
                profit: 10.838,
                value: {
                    galleons: 97,
                    knuts: 22,
                    sickles: 3,
                },
                won: true,
            },
            {
                betId: '35ccd378-b9bf-483c-a61f-f0e2c5094d6d',
                finished: true,
                profit: 19.897,
                value: {
                    galleons: 168,
                    knuts: 11,
                    sickles: 13,
                },
                won: false,
            },
            {
                betId: '9deae4c0-2cb5-40a2-be91-fcf8a25473d2',
                finished: true,
                profit: 8.724,
                value: {
                    galleons: 34,
                    knuts: 18,
                    sickles: 6,
                },
                won: true,
            },
            {
                betId: 'bb59ef3d-d863-4c29-9ec9-a917425a77d8',
                finished: false,
                profit: 10.946,
                value: {
                    galleons: 200,
                    knuts: 28,
                    sickles: 3,
                },
                won: false,
            },
            {
                betId: 'e97cd78f-6793-44aa-8e72-f4589ec56a74',
                finished: true,
                profit: 14.104,
                value: {
                    galleons: 45,
                    knuts: 26,
                    sickles: 17,
                },
                won: false,
            },
            {
                betId: '93627596-1bc2-45a6-8682-420f42c88f2e',
                finished: false,
                profit: 14.364,
                value: {
                    galleons: 17,
                    knuts: 23,
                    sickles: 8,
                },
                won: false,
            },
            {
                betId: 'c35d0544-c61f-4421-8f97-0e436a330ec9',
                finished: false,
                profit: 2.232,
                value: {
                    galleons: 69,
                    knuts: 25,
                    sickles: 1,
                },
                won: false,
            },
            {
                betId: 'ff145313-4b2c-4bc5-b701-0449e5b402e2',
                finished: false,
                profit: 17.212,
                value: {
                    galleons: 173,
                    knuts: 27,
                    sickles: 14,
                },
                won: false,
            },
            {
                betId: '03a4542c-9089-46b2-a05d-a7a395a5615e',
                finished: true,
                profit: 14.233,
                value: {
                    galleons: 190,
                    knuts: 23,
                    sickles: 5,
                },
                won: true,
            },
            {
                betId: '1af826b7-6c6a-4ab6-8893-41766922194c',
                finished: true,
                profit: 2.273,
                value: {
                    galleons: 158,
                    knuts: 27,
                    sickles: 3,
                },
                won: true,
            },
            {
                betId: '37334e8e-f948-42fd-95b0-8b64bbbb2b5d',
                finished: false,
                profit: 12.659,
                value: {
                    galleons: 193,
                    knuts: 9,
                    sickles: 15,
                },
                won: false,
            },
            {
                betId: '57add22b-1aba-4bf9-bc27-02db923f8533',
                finished: false,
                profit: 7.172,
                value: {
                    galleons: 138,
                    knuts: 12,
                    sickles: 12,
                },
                won: false,
            },
            {
                betId: '999cfe41-570f-42b9-af48-e2faa4dae091',
                finished: true,
                profit: 13.904,
                value: {
                    galleons: 65,
                    knuts: 26,
                    sickles: 8,
                },
                won: false,
            },
            {
                betId: '0a50f0a0-7ddd-46ca-af71-509fce3c8282',
                finished: true,
                profit: 8.501,
                value: {
                    galleons: 93,
                    knuts: 15,
                    sickles: 14,
                },
                won: false,
            },
            {
                betId: '7a3c4a4a-0a0c-42e3-b793-62e05e6f7077',
                finished: true,
                profit: 2.826,
                value: {
                    galleons: 129,
                    knuts: 15,
                    sickles: 1,
                },
                won: false,
            },
            {
                betId: '6db178d0-3650-44bc-a32c-03aee3a41c35',
                finished: false,
                profit: 9.893,
                value: {
                    galleons: 188,
                    knuts: 22,
                    sickles: 2,
                },
                won: false,
            },
            {
                betId: 'fbefb843-f5ea-4d22-bc4c-6ce763dbe195',
                finished: true,
                profit: 3.568,
                value: {
                    galleons: 89,
                    knuts: 25,
                    sickles: 17,
                },
                won: false,
            },
            {
                betId: '2eb8f9cf-8513-4ff4-8ad4-36a61a9dbdce',
                finished: true,
                profit: 9.822,
                value: {
                    galleons: 59,
                    knuts: 29,
                    sickles: 15,
                },
                won: true,
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
    async create(betValue: MoneyData, betType: string, matchId: string): Promise<boolean> {
        const data = await BackendRepository.post(
            { matchId: matchId, type: betType, value: betValue },
            {
                URL: BackendUrlConstants.CREATE_BET,
            },
        );
        return !!data;
    }
}
