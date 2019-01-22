/**
 * example Validator
 */

const isEmpty = value => value === undefined || value === null || value === ''


export const required = value => isEmpty(value) && "return some error message"