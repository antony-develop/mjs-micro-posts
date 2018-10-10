import { http } from './http';
import { ui } from './ui';

const apiBaseUrl = 'http://localhost:3000';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Add post click
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete click
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit click
document.querySelector('#posts').addEventListener('click', enableEditState);

// Listen for cancel click
document.querySelector('.card-form').addEventListener('click', cancelEditState);

function getPosts() {
    http.get(apiBaseUrl + '/posts')
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error));
}

function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    if (title === '' || body === '') {
        ui.flashMessage('Please fill in all fields', 'danger');
        return;
    }

    const postData = { title, body };

    if (id === '') {
        createPost(postData)
    } else {
        updatePost(id, postData);
    }
}

function createPost(data) {
    http.post(apiBaseUrl + '/posts', data)
        .then(data => {
            ui.flashMessage('Post added', 'success');
            ui.clearInputs();
            getPosts();
        })
        .catch(err => console.log(err));
}

function updatePost(id, data) {
    http.put(apiBaseUrl + '/posts/' + id, data)
        .then(data => {
            ui.flashMessage('Post updated', 'success');
            ui.changeFormState('add');
            getPosts();
        })
        .catch(err => console.log(err));
}

function deletePost(e) {
    e.preventDefault();

    const deleteLink = e.target.closest('.delete.card-link')
    if (e.target.parentElement.classList.contains('delete')) {
        const postId = e.target.parentElement.dataset.id;

        if (confirm('Are you sure')) {
            http.delete(apiBaseUrl + '/posts/' + postId)
                .then(data => {
                    ui.flashMessage('Post successfuly deleted', 'success');
                    getPosts()
                })
                .catch(err => console.log(err));
        }
    }
}

function enableEditState(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.closest('.card-body').querySelector('.card-title').textContent;
        const body = e.target.closest('.card-body').querySelector('.card-text').textContent;
        
        const post = { id, title, body };

        ui.fillForm(post);
    }
}

function cancelEditState(e) {
    e.preventDefault();

    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
}