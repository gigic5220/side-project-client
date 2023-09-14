export type JoinInputs = {
    name: string;
    nickname: string;
    phone: string;
    id: string;
    password: string;
    passwordCheck: string;
    birth: string;
};

export type JoinReqData = {
    username: string;
    id: string;
    password: string;
    birth: string;
    phone: string;
};

export type LoginReqData = {
    id: string;
    password: string;
};

export type LoginInputs = {
    id: string;
    password: string;
};

export type LoginInfo = {
    accessToken: string;
    accessTokenExpiresIn: number;
    grantType: string;
    id: number;
    refreshToken: string;
    username: string;
};
