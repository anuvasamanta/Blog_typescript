export interface UserInterface {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'author';
    is_verified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}