document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/books', {
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const title = document.createElement('li');
        title.innerText = data[i].title;
        title.id = i + 1;
        document.getElementById('list').appendChild(title);

        title.addEventListener('click', (e) => {
          const infoPanel = document.getElementById('show-panel');

          const image = document.createElement('img');
          image.src = data[i].img_url;
          infoPanel.appendChild(image);

          const description = document.createElement('p');
          description.innerText = data[i].description;
          infoPanel.appendChild(description);

          function listUsers() {
            const usersLike = data[i].users;
            console.log(usersLike);
            const userList = document.createElement('ul');
            userList.id = 'user-list';
            for (let j = 0; j < usersLike.length; j++) {
              const userName = document.createElement('li');
              userName.innerText = usersLike[j].username;
              userList.appendChild(userName);
            }
            infoPanel.appendChild(userList);
          }
          listUsers();

          const likeButton = document.createElement('button');
          likeButton.innerText = 'Like';
          likeButton.id = data[i].id + '-button';
          infoPanel.appendChild(likeButton);

          likeButton.addEventListener('click', (e) => {
            const bookId = e.target.id.split('-')[0];
            console.log(document.getElementById('user-list'));
            fetch(`http://localhost:3000/books/${bookId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                users: [
                  ...data[i].users,
                  { id: '12', username: 'leavingvalhalla' },
                ],
              }),
            })
              .then(() => document.getElementById('user-list').remove())
              .then(listUsers());
          });
        });
      }
    });
});
