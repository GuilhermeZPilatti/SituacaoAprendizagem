const api_url = 'https://tempoalerta.com.br/siscad/';
const api_token = 'AABBCCDDEEFFG';

const api_headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': api_token
};

function toHome() {
    window.location = "../index.html"
}