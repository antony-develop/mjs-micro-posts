class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmitBtn = document.querySelector('.post-submit');
        this.formState = document.querySelector('add');
    }

    showPosts(posts) {
        let output = '';
        
        for (let post of posts) {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>

                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove text-danger"></i>
                        </a>
                    </div>    
                </div>
            `;
        }

        this.posts.innerHTML = output;
    }

    flashMessage(message, type) {
        const div = document.createElement('div');
        div.className = 'alert alert-' + type;
        div.textContent = message;
        
        // Remove previous alerts
        if (this.posts.previousElementSibling.classList.contains('alert')) {
            this.posts.previousElementSibling.remove();
        }

        this.posts.before(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    clearInputs() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
        this.idInput.value = '';

        this.titleInput.focus();
    }

    fillForm(item) {
        this.titleInput.value = item.title;
        this.bodyInput.value = item.body;
        this.idInput.value = item.id;

        this.changeFormState('edit');
    }

    changeFormState(type) {
        if (type == 'edit') {
            this.postSubmitBtn.textContent = 'Update post';
            this.postSubmitBtn.classList.remove('btn-primary');
            this.postSubmitBtn.classList.add('btn-warning');

            const cancelButton = document.createElement('button');
            cancelButton.className = 'post-cancel btn btn-light btn-block';
            cancelButton.textContent = 'Cancel edit';

            this.postSubmitBtn.after(cancelButton);

            this.titleInput.focus();
        } else if (type == 'add') {
            this.postSubmitBtn.textContent = 'Post it';
            this.postSubmitBtn.classList.remove('btn-warning');
            this.postSubmitBtn.classList.add('btn-primary');

            // Remove cancel button
            document.querySelector('.post-cancel').remove();

            this.clearInputs()
        }
    }
}

export const ui = new UI();