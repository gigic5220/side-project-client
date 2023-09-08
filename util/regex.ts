export const REGEX = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    NUMBER: /[^0-9]/g,
    PASSWORD: /^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]{8,16}$/,
    PHONE: /^01[16789][0-9]{7,8}$/
}
