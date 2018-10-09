class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
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

        this.posts.before(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    clearInputs() {
        this.titleInput.value = '';
        this.bodyInput.value = '';

        this.titleInput.focus();
    }
}

export const ui = new UI();