import axios from "axios";

const API_KEY = 'uFYeV_W9h0TUfrgPso1NGpknBKOyaao1Yvr5MeyUyZ8';

axios.defaults.baseURL = 'https://api.unsplash.com';

axios.defaults.params = {
    orientation: 'landscape',
    per_page: 15,
};

export const getImages = async (searchQuery, page) => {
    const {data} = await axios.get(`/search/photos?client_id=${API_KEY}&query=${searchQuery}&page=${page}`
    );
    return data;
}