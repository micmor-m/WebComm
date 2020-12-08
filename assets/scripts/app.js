//to be able to commnicate with the server
const xhr = new XMLHttpRequest();

//the xhr obj takes 2 params. The method and the URL
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

xhr.responseType = "json";

//to handle the loading of the data we need to create and eventListener
//but xhr event listener is not  supported by all browser
//so we use an alternativ method
xhr.onload = function () {
  //const listOfPosts = JSON.parse(xhr.response);
  const listOfPosts = xhr.response;
  console.log(listOfPosts);
};

xhr.send();
