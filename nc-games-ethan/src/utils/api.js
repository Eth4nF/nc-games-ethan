import axios from "axios";

const ncGames = axios.create({baseURL:"https://ethan-games.herokuapp.com/",});

export const getReviews = () => {
    return ncGames.get('/api/reviews')
    .then((res) => {
        return res.data.reviews;
    })
}

export const getCategories = () => {
    return ncGames.get('/api/categories')
    .then((res) => {
        return res.data.categories;
    })
}

export const getSingleReview = (reviewNumber) => {
    return ncGames.get(`/api/reviews/${reviewNumber}`)
    .then((res) => {
        return res.data.review;
    })
}

export const getSingleComment = (reviewNumber) => {
    return ncGames.get(`/api/reviews/${reviewNumber}/comments`)
    .then((res) => {
        return res.data.comments;
    })
}

export const getSingleUser = (userName) => {
    return ncGames.get(`/api/users/${userName}}`)
    .then((res) => {
        return res.data;
    })
}

export const getFilteredReviews = (category) => {
    return ncGames.get(`/api/reviews/?category=${category}`)
    .then((res) => {
        return res.data.reviews;
    })
}