export const generateId = (): string => {
    const random: string = Math.random().toString(36).substring(2, 11);
    const date: string = Date.now().toString(36);
    return random + date;
}