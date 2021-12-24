export const genId = () => (Math.random() * Math.pow(10, 10)).toFixed(0);
export const genRandom = (from, to) => {
    const digitsCount = Math.ceil(Math.log10(to - from));
    const range = (Math.random() * Math.pow(10, digitsCount)).toFixed(0);
    const rangeLimit = (to - from + 1);

    return range % rangeLimit + from;
};