// generates string with 10 digits
export const genId = () => (Math.random() * Math.pow(10, 10)).toFixed(0);

//generates random number within specified range
export const genRandom = (from, to) => {
    const digitsCount = Math.ceil(Math.log10(to - from));
    const range = (Math.random() * Math.pow(10, digitsCount)).toFixed(0);
    const rangeLimit = (to - from + 1);

    return range % rangeLimit + from;
};