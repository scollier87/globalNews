export function timeSince(dateIsoFormat) {
    const seconds = Math.floor((new Date() - new Date(dateIsoFormat)) / 1000);

    //Year in seconds
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + 'y';

    //Month in seconds
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + 'm';

    //Day in seconds
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + 'd';

    //Hour in seconds
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + 'h';

    //Minute in seconds
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + 'm';

    //Seconds in second
    return Math.floor(seconds) + 's'
}