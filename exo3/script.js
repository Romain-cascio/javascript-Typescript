"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    });
}
function getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    });
}
function displayData(usersWithPosts) {
    return __awaiter(this, void 0, void 0, function* () {
        const container = document.getElementById('user-posts');
        container.innerHTML = '';
        usersWithPosts.forEach(user => {
            const userColumn = document.createElement('div');
            userColumn.className = 'col-md-4 card-column';
            const userCard = document.createElement('div');
            userCard.className = 'card';
            userCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${user.name}</h5>
        <h6 class="card-text text-secondary">${user.email}</h6>
        <p class="text-warning">Titre des articles rédigés:</p>
        <ul>
          ${user.posts.map(post => `<li>${post.title}</li>`).join('')}
        </ul>
      </div>
    `;
            userColumn.appendChild(userCard);
            container.appendChild(userColumn);
        });
    });
}
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [users, posts] = yield Promise.all([getUsers(), getPosts()]);
            const usersWithPosts = users.map(user => (Object.assign(Object.assign({}, user), { posts: posts.filter(post => post.userId === user.id) })));
            displayData(usersWithPosts);
        }
        catch (error) {
            console.error('There was an error fetching the data', error);
        }
    });
}
function filterData() {
    return __awaiter(this, void 0, void 0, function* () {
        const titleInput = document.getElementById('search-title');
        const authorInput = document.getElementById('search-author');
        const titleQuery = titleInput.value.toLowerCase();
        const authorQuery = authorInput.value.toLowerCase();
        const [users, posts] = yield Promise.all([getUsers(), getPosts()]);
        const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(titleQuery));
        const usersWithFilteredPosts = users
            .map(user => (Object.assign(Object.assign({}, user), { posts: filteredPosts.filter(post => post.userId === user.id) })))
            .filter(user => user.name.toLowerCase().includes(authorQuery) && user.posts.length > 0);
        displayData(usersWithFilteredPosts);
    });
}
document.getElementById('search-button').addEventListener('click', filterData);
loadData();
