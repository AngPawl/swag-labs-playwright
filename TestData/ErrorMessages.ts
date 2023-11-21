import { Data } from "dataclass";

class ErrorMessages extends Data {
    errorNotMatchingCreds: string = 'Epic sadface: Username and password do not match any user in this service';
    errorEmptyCreds: string = 'Epic sadface: Username is required';
    errorUsernameRequired: string = 'Epic sadface: Username is required';
    errorPasswordRequired: string = 'Epic sadface: Password is required';

    errorCheckoutEmptyFirstName: string = 'Error: First Name is required';
    errorCheckoutEmptyLastName: string = 'Error: Last Name is required';
    errorCheckoutEmptyPostalCode: string = 'Error: Postal Code is required';
}

export const errorMessage = ErrorMessages.create();