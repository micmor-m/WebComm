const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

function sendHttpRequest(method, url, data) {
  //create a Promise to handle the data from the server
  const promise = new Promise((resolve, reject) => {
    //commnicate with the server
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";

    //the onload function is async
    xhr.onload = function () {
      resolve(xhr.response);
      //const listOfPosts = JSON.parse(xhr.response);
    };

    //send the request to te server
    //if data in not undefined, the data will be append to thhe request
    xhr.send(JSON.stringify(data));
  });
  return promise;
}

function fetchPosts() {
  sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts").then(
    (responseData) => {
      const listOfPosts = responseData;
      //now that we have all posts we need to render them in the DOM
      for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector("h2").textContent = post.title.toUpperCase();
        postEl.querySelector("p").textContent = post.body;
        listElement.append(postEl);
      }
    }
  );
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

fetchPosts();
createPost("DUMMY", "A dummy post!");
