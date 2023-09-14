import axios from 'axios';


export const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
export const BASE_URL = 'https://api.themoviedb.org/3/'

// for getting cardImg 
export function getImg(img_path, hd = false) {
    return `https://image.tmdb.org/t/p/${hd ? 'original' : 'w500'}/${img_path}`
}

export function previewStr(inputString) {
    // Split the input string into words
    const words = inputString.split(' ');

    // Slice the first 30 words and join them back into a string
    return words.slice(0, 40).join(' ') + ' ...';
}



export function convertToUTC(dateString) {
    // Parse the input date string into a Date object
    const parts = dateString.split('-');
    if (parts.length !== 3) {
        throw new Error('Invalid date format. Use yyyy-mm-dd.');
    }

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are 0-based
    const day = parseInt(parts[2]);

    const date = new Date(Date.UTC(year, month, day));

    // Extract the UTC date components (year, month, and day)
    const utcYear = date.getUTCFullYear();
    const utcMonth = date.getUTCMonth() + 1; // Months are 0-based, so add 1
    const utcDay = date.getUTCDate();

    // Construct the UTC date string without the time
    const utcDateString = `${utcYear}-${utcMonth.toString().padStart(2, '0')}-${utcDay.toString().padStart(2, '0')}`;

    return utcDateString;

}



// pass the endpoint as argument to fetch data
// eg getData('trending/all/week') to get _all_ _trending_ media for the _week_

// params: { language: 'en-US', page: '1', region: 'NG' } <---  use this when fetching top movies
// movie/popular <-- endpoint for top movies

// export function getData(endpoint, params = { language: 'en-US' }) {
//     const options = {
//         method: 'GET',
//         url: `${BASE_URL + endpoint}`,
//         params: params,
//         headers: {
//             accept: 'application/json',
//             Authorization: TMDB_ACCESS_TOKEN
//         }
//     };

//     axios
//         .request(options)
//         .then(response => response)
//         .catch(error => error.message);
// }