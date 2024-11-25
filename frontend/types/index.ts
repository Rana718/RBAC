interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    permissions: string[];
    admin_email?: string;
    password?: string;
}


export type {
    User,
}