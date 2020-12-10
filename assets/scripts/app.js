const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");

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
  if (listElement.children.length > 0) {
    while (listElement.firstChild) {
      listElement.removeChild(listElement.firstChild);
    }
  }
  console.log(listElement.children.length);
  sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts").then(
    (responseData) => {
      const listOfPosts = responseData;
      //now that we have all posts we need to render them in the DOM
      for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector("h2").textContent = post.title.toUpperCase();
        postEl.querySelector("p").textContent = post.body;
        postEl.querySelector("li").id = post.id;
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

//FECTH posts
fetchButton.addEventListener("click", fetchPosts);

//ADD new post
form.addEventListener("submit", (event) => {
  //prevent default
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});

listElement.addEventListener("click", (event) => {
  //take advantage of the event propagation listen event on all list
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
  // event.target.querySelector("");
});
