import * as functions from 'firebase-functions';

const POE_API: string = 'https://www.pathofexile.com/api/trade';
const axios = require('axios');

export const getPOEStats = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Origin', 'https://www.pathofshopping.com');
    response.set('Access-Control-Allow-Methods', 'GET');

    const POE_STATS: string = '/data/stats';

    axios.get(POE_API + POE_STATS).then((res: any) => {
        response.status(200).send(res.data);
    }).catch((err: any) => {
        if (err.response) {
            response.status(err.response.status).send(err.message);
        } else {
            response.status(500).send(err.message);
        }
    })
});


export const getPOEItems = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Origin', 'https://www.pathofshopping.com');
    response.set('Access-Control-Allow-Methods', 'GET');

    const POE_ITEMS: string = '/data/items';

    axios.get(POE_API + POE_ITEMS).then((res: any) => {
        response.status(200).send(res.data);
    }).catch((err: any) => {
        if (err.response) {
            response.status(err.response.status).send(err.message);
        } else {
            response.status(500).send(err.message);
        }
    })
});

export const getPOELeagues = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Origin', 'https://www.pathofshopping.com');
    response.set('Access-Control-Allow-Methods', 'GET');

    const POE_LEAGUES: string = '/data/leagues';

    axios.get(POE_API + POE_LEAGUES).then((res: any) => {
        response.status(200).send(res.data);
    }).catch((err: any) => {
        if (err.response) {
            response.status(err.response.status).send(err.message);
        } else {
            response.status(500).send(err.message);
        }
    })
});

export const poeFetch = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Origin', 'https://www.pathofshopping.com');
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method == "OPTIONS") {
        response.status(200).send(request.body);
    } else { 
        const POE_FETCH: string = '/fetch/';

        axios.get(POE_API + POE_FETCH + request.body.items).then((res: any) => {
            response.status(200).send(res.data);
        }).catch((err: any) => {
            if (err.response) {
                response.status(err.response.status).send(err.message);
            } else {
                response.status(500).send(err.message);
            }
        });   
    }
});

export const poeSearch = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Origin', 'https://www.pathofshopping.com');
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method == "OPTIONS") {
        response.status(200).send(request.body);
    } else {
        const POE_SEARCH: string = '/search/';

        axios.post(POE_API + POE_SEARCH + request.body.league, request.body.data).then((res: any) => {
            response.status(200).send(res.data);
        }).catch((err: any) => {
            if (err.response) {
                response.status(err.response.status).send(err.message);
            } else {
                response.status(500).send(err.message);
            }
        });
    }
});
