import { HttpBetRepository } from '../../infrastructure/driven-adapters/http/HttpBet.Repository';
import { BetUseCase } from '../../domain/usecase/Bet.UseCase';

export const BetUseCaseInstance = new BetUseCase(new HttpBetRepository());
