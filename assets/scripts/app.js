//to be able to commnicate with the server
const xhr = new XMLHttpRequest();

//the xhr obj takes 2 params. The method and the URL
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

xhr.responseType = "json";

//1 select the ul element where to add the posts
const listElement = document.querySelector(".posts");
// 2 select the template to inject a single post
const postTemplate = document.getElementById("single-post");

//the onload function is async
xhr.onload = function () {
  //const listOfPosts = JSON.parse(xhr.response);
  const listOfPosts = xhr.response;

  //now that we have all posts we need to render them in the DOM
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  }
};

xhr.send();
