import { http } from './http';
import { ui } from './ui';

const apiBaseUrl = 'http://localhost:3000';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Add post click
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

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

function deletePost(e) {
    e.preventDefault();

    const deleteLink = e.target.closest('.delete.card-link')
    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;

        if (confirm('Are you sure')) {
            http.delete(apiBaseUrl + '/posts/' + id)
                .then(data => {
                    ui.flashMessage('Post successfuly deleted', 'success');
                    getPosts()
                })
                .catch(err => console.log(err));
        }
    }
}