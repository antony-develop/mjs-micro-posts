import { http } from './http';
import { ui } from './ui';

const apiBaseUrl = 'http://localhost:3000';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
    http.get(apiBaseUrl + '/posts')
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error));
}