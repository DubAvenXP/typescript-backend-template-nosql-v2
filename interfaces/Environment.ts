export interface Environment {
    env: string,
    port: string,
    mongo: {
        user: string,
        password: string,
        host: string,
        name: string,
    },
    email: {
        host: string,
        port: string,
        user: string,
        password: string,
    },
    jwt: {
        secret: string,
        expiresIn: string,
    }
};