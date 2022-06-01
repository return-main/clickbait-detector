import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

const SERVER_URL = 'https://clickbaitiness-api.herokuapp.com';

// A simple counter for http requests

export const requests = new Counter('http_reqs');

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
    stages: [
        { duration: '10s', target: 100 }, // below normal load
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 }, // spike to 1400 users
        { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
        { duration: '10s', target: 100 }, // scale down. Recovery stage.
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 },
    ],
    // thresholds: {
    //     http_reqs: ['count < 100'],
    // },
};

const url = new URL(`${SERVER_URL}/detect`);
const headline = "Just 22 Cute Animal Pictures You Need Right Now";
url.searchParams.append('headline', headline);
const url_to_test = url.toString();

export default function () {
    // our HTTP request, note that we are saving the response to res, which can be accessed later
    const res = http.get(url_to_test);

    const checkRes = check(res, {
        'status is 200': (r) => r.status === 200,
        'response body': (r) => r.json().clickbaitiness === 99.3,
    });
}
