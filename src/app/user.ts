import { Permission } from './permission';

export class User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
    active: boolean;
    permissions: Permission;
}
