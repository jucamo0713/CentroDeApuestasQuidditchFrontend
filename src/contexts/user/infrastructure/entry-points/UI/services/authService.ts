import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';

export const loginUser = async (email: string, password: string) => {
    await SessionManageInstance.loginUser(email, password);
};
