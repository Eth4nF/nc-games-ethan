import axios from "axios";

const ncGames = axios.create({baseURL:"https://back-end-project-ethanf.herokuapp.com",});

export const getReviews = () => {
    return ncGames.get('/api/reviews')
    .then((res) => {
        return res.data;
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
        return res.data[0];
    })
}

export const getSingleComment = (reviewNumber) => {
    return ncGames.get(`/api/reviews/${reviewNumber}/comments`)
    .then((res) => {
        return res.data;
    })
}

export const getUsers = (userName) => {
    return ncGames.get(`/api/users`)
    .then((res) => {
        return res.data;
    })
}

export const getFilteredReviews = (category) => {
    return ncGames.get(`/api/reviews/?category=${category}`)
    .then((res) => {
        console.log(res.data);
        return res.data;
    })
}

export const patchReviewById = (incVote, review_id) => {
    return ncGames
        .patch(`/api/reviews/${review_id}`, { inc_votes: incVote })
        .then((res) => { return res.data });
}