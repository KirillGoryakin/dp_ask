import { customAlphabet } from 'nanoid';

export const generatePassword = customAlphabet('23456789_abcdefghijkmnopqrstuvwxyz-', 10);
