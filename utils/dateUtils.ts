export const convertToReadableDate = (isoString: string): string => {
    const date: Date = new Date(isoString);
    const now: Date = new Date();
    const timeDifference: number = now.getTime() - date.getTime();

    const oneDay: number = 24 * 60 * 60 * 1000; // milliseconds in one day

    if (timeDifference < oneDay) {
        // Less than 24 hours ago, show hours and minutes
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        // More than 24 hours ago, show full date
        return date.toLocaleDateString();
    }
};
