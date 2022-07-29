import {dateObjectInterface} from '../interfaces/utils';

export const formatDateIntoString = (date: dateObjectInterface): string => {
    const {day, month, year} = date;
    return `${year}, ${month}, ${day}`;
}