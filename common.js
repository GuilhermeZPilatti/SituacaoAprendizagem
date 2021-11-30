const api_url = 'http://10.1.92.135:3001';
const api_token = 'AABBCCDDEEFFG';

const api_headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': api_token
};

function toHome() {
    window.location = "../index.html"
}