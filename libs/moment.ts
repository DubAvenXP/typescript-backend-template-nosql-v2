import moment from 'moment-timezone';

export const now = moment().tz('America/Guatemala').format('YYYY-MM-DD HH:mm:ss');