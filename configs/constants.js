module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    MAX_YEAR: (new Date().getFullYear() - 2),
    MIN_YEAR: (new Date().getFullYear() - 40),

    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,

    ACCESS_DENIED: 'Access denied',
    AUTHORIZATION: 'Authorization',
    CAN_NOT_CHANGE_FIELDS: 'You can not change email , password or role',
    CAR_ID_DOES_NOT_EXIST: 'Car_id does not exist',
    EMAIL_ALREADY_EXISTS: 'Email already exist',
    INVALID_TOKEN: 'Invalid token',
    USER_ID_DOES_NOT_EXIST: 'User_id does not exist',
    WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password',
    WRONG_TOKEN_TYPE: 'Wrong token type',
    USER_IS_ACTIVE: 'User is Active'
};
