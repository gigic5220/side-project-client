export const REGEX = {
    USER_ID: /^(?=.*[a-zA-Z]).{7,}$/,
    NUMBER: /[^0-9]/g,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
    PHONE: /^01[016789][0-9]{7,9}$/,
    PHONE_VERIFY_NUMBER: /^\d{6,}$/
}
