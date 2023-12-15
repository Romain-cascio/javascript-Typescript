declare const axios: any;

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserWithPosts extends User {
  posts: Post[];
}

async function getUsers(): Promise<User[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

async function getPosts(): Promise<Post[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
}

async function displayData(usersWithPosts: UserWithPosts[]): Promise<void> {
  const container = document.getElementById('user-posts') as HTMLDivElement;
  container.innerHTML = '';

  usersWithPosts.forEach(user => {
    const userColumn = document.createElement('div');
    userColumn.className = 'col-md-4 content-column';
    
    const userCard = document.createElement('div');
    userCard.className = 'content-card';
    
    userCard.innerHTML = `
      <div class="content-card-body">
        <h5 class="content-card-title">${user.name}</h5>
        <h6 class="content-card-text text-secondary">${user.email}</h6>
        <p class="text-warning">Titre des articles rédigés:</p>
        <ul>
          ${user.posts.map(post => `<li>${post.title}</li>`).join('')}
        </ul>
      </div>
    `;
    
    userColumn.appendChild(userCard);
    container.appendChild(userColumn);
  });
}

async function loadData() {
  try {
    const [users, posts] = await Promise.all([getUsers(), getPosts()]);
    const usersWithPosts = users.map(user => ({
      ...user,
      posts: posts.filter(post => post.userId === user.id),
    }));
    displayData(usersWithPosts);
  } catch (error) {
    console.error('There was an error fetching the data', error);
  }
}

async function filterData() {
  const titleInput = document.getElementById('search-title') as HTMLInputElement;
  const authorInput = document.getElementById('search-author') as HTMLInputElement;

  const titleQuery = titleInput.value.toLowerCase();
  const authorQuery = authorInput.value.toLowerCase();

  const [users, posts] = await Promise.all([getUsers(), getPosts()]);

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(titleQuery));

  const usersWithFilteredPosts = users
    .map(user => ({
      ...user,
      posts: filteredPosts.filter(post => post.userId === user.id),
    }))
    .filter(user => user.name.toLowerCase().includes(authorQuery) && user.posts.length > 0);

  displayData(usersWithFilteredPosts);
}

document.getElementById('search-btn')!.addEventListener('click', filterData);

loadData();
