import * as ActionTypes from "./ActionTypes";
import {baseURL} from "../shared/BaseURL";

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseURL + "comments", {
        method: "POST", 
        body: JSON.stringify(newComment),
        headers: {
            "Content-type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Error" + response.status + ":" + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {console.log("Post comments: " + error.message);
            alert("Your comment could not be posted\nError: " + error.message);
        });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    fetch(baseURL + "dishes")
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Error" + response.status + ":" + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    fetch(baseURL + "comments")
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Error" + response.status + ":" + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    fetch(baseURL + "promotions")
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Error" + response.status + ":" + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = (leader) => (dispatch) => {
    dispatch(leadersLoading(true));

    fetch(baseURL + "leaders")
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error("Error" + response.status + ":" + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(errors => dispatch(leadersFailed(errors)));
}

export const addLeaders = (leader) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leader
});

export const leadersFailed = (error) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: error
});

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const postFeedback = (firstname, lastname, number, email, agree, contactType, message) => (dispatch) => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        number: number,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }
    

    fetch(baseURL + "feedback", {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error("Error" + error.status + ":" + error.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(response => alert('Thank you for your feedback!\n'+JSON.stringify(response)))
    .catch(error => {
        console.log("Feedback couldn't be posted: " + error.message);
        alert("Feedback couldn't be posted: " + error.message);
    });
}
