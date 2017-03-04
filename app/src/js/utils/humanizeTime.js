
const months = ['januar', 'feburar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];

export const dateToString = (date) => {
    if (!date) {
        return '';
    }

    return `${date.getDate()}. ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

const humanizeTime = (date) => {
    if (!date) {
        return '';
    }

    const diff = ((new Date()).getTime() - date.getTime());

    if (!window || (diff / 86400000) > 7) {
        return dateToString(date);
    }

    const diffMin = Math.ceil(diff / 1000 / 60);
    const diffHour = Math.floor(diff / 1000 / 60 / 60);
    const diffDay = Math.floor(diff / 1000 / 60 / 60 / 24);

    if (diffDay >= 1) {
        return `${diffDay} ${diffDay == 1 ? 'dag' : 'dager'} siden`;
    }

    if (diffHour >= 1) {
        return `${diffHour} ${diffHour == 1 ? 'time' : 'timer'} siden`;
    }

    return `${diffMin} ${diffMin == 1 ? 'minutt' : 'minutter'} siden`;
};

export default humanizeTime;