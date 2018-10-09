import { http } from './http';
import { ui } from './ui';

const apiBaseUrl = 'http://localhost:3000';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Add post click
document.querySelector('.post-submit').addEventListener('click', submitPost);

function getPosts() {
    http.get(apiBaseUrl + '/posts')
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error));
}

function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = { title, body };

    // Create post
    http.post(apiBaseUrl + '/posts', data)
        .then(data => {
            ui.flashMessage('Post added', 'success');
            ui.clearInputs();
            getPosts();
        })
        .catch(err => console.log(err));
}