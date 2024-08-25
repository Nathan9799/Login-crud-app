document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (username === 'user' && password === 'password') {
        alert('Login successful!');
        loadApp(); 
    } else {
        alert('Invalid username or password');
    }
});

function loadApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h2>Posts</h2>
        <div id="posts"></div>
        <button onclick="createPost()">Create New Post</button>
    `;
    loadPosts();
}

function loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const postsDiv = document.getElementById('posts');
            postsDiv.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <button onclick="editPost(${post.id})">Edit</button>
                    <button onclick="deletePost(${post.id})">Delete</button>
                `;
                postsDiv.appendChild(postElement);
            });
        });
}

function createPost() {
    const title = prompt('Enter post title:');
    const body = prompt('Enter post body:');
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(post => {
        alert('Post created successfully!');
        loadPosts();
    });
}

function editPost(id) {
    const title = prompt('Enter new title:');
    const body = prompt('Enter new body:');
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(post => {
        alert('Post updated successfully!');
        loadPosts();
    });
}

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
    .then(() => {
        alert('Post deleted successfully!');
        loadPosts();
    });
}
