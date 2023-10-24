export class UserModel {
    id: string;
    token: string;
    login: string;
    firstName: string;
    lastName: string;
    authorities: string[];
    featureFlags: number[];
}
