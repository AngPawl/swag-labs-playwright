import { Data } from "dataclass";

export class UserInfo extends Data {
    firstName: string = "John";
    lastName: string = "Doe";
    postalCode: number = 55555;
}

export const user = UserInfo.create();