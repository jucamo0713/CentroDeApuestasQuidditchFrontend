import { MoneyManageUseCase } from '../../domain/usecase/MoneyManage.UseCase';
import { HttpMoneyRepository } from '../../infrastructure/driven-adapters/http/HttpMoney.Repository';

export const MoneyManageInstance = new MoneyManageUseCase(new HttpMoneyRepository());
