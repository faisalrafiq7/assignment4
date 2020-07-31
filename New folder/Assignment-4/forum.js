
// adding removing classing to the post box
let hidePostContainer = function(){
  document.querySelector(".postContainer").classList.remove("visible");
  document.querySelector(".postContainer").classList.add("invisible");

  document.querySelector("#postTopic").value = '';
  document.querySelector("#postBody").value = '';
}

let hideEditPostContainer = function(){
  document.querySelector(".editPostContainer").classList.remove("visible");
  document.querySelector(".editPostContainer").classList.add("invisible");

  document.querySelector("#editpostTopic").value = '';
  document.querySelector("#editpostBody").value = '';
}

let showPostContainer = function(){
  document.querySelector(".postContainer").classList.remove("invisible");
  document.querySelector(".postContainer").classList.add("visible");
}

document.querySelector(".newPostButton").addEventListener('click', showPostContainer);
document.querySelector(".cancelNewPost").addEventListener('click', hidePostContainer);
document.querySelector(".cancelEditPost").addEventListener('click', hideEditPostContainer);




//deletePost function

let deletePost = function(e){
  let postID = e.target.classList[1];
  params = 'postID='+postID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/deletepostphp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
      if(this.status==200){
          console.log('successful js for delete post');
          console.log(this.responseText);
          loadPostsOnMainPage();
      }
  }
  xhr.send(params);
}

let editPostID;
//Edit PostS
let editPostShow = function(e){
  document.querySelector(".editPostContainer").classList.remove("invisible");
  document.querySelector(".editPostContainer").classList.add("visible");
  editPostID = e.target.classList[1];
  document.querySelector('#editpostTopic').value = document.querySelector('.topicOfThePost'+editPostID).innerHTML;
  document.querySelector('#editpostBody').value = document.querySelector('.bodyOfThePost'+editPostID).innerHTML;
}

let editPost = function(e){
  e.preventDefault();
  let editPostTopic = document.querySelector("#editpostTopic").value;
  let editPostBody = document.querySelector("#editpostBody").value;
  console.log('here');
  params = "editpostTopic="+editPostTopic+"&editpostBody="+editPostBody+"&editpostID="+editPostID;
  
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/editpostphp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
      if(this.status==200){
          console.log('successful js for edit post');
          console.log(this.responseText);
          loadPostsOnMainPage();
      }
  }
  xhr.send(params);
  hideEditPostContainer();
}
document.querySelector("#editpost-submit").addEventListener("click", editPost);







//Load Posts on main page function
let loadPostsOnMainPage = function(){
  let xhr = new XMLHttpRequest();
  // console.log('inside loadposts on main page function');
  xhr.open('GET', 'purephp/allpostsphp.php', true);
  xhr.onload = function(){
    if(this.status == 200){
      // console.log("loadPostsOnMainPage js successful");
      if(this.responseText !== 'Empty'){
        let posts = JSON.parse(this.responseText);
        let output = '';
        
        for(let i in posts){
          output += 
          '<div class=postDivContainer>'+
            '<div class = "postDiv '+posts[i].ID+'">'+
              '<div class="postHeader">'+
                '<div class="topicOfThePost topicOfThePost'+posts[i].ID+'">'+posts[i].topic+'</div>'+
                '<div class= "postHeaderButtons '+posts[i].byUser+'">'+
                  '<div class= "postEditButton '+posts[i].ID+'">Edit</div>'+
                  '<div class= "postDeleteButton '+posts[i].ID+'">Delete</div>'+  
                '</div>'+
              '</div>'+
              '<div class="bodyOfThePost bodyOfThePost'+posts[i].ID+'">'+posts[i].body+' </div>'+
            '</div>'+
            '<div class="postInfo">By: '+posts[i].byUser+'</div>'+
            '<div class="postID invisible"> <p>ID: '+posts[i].ID+'</p></div>'+
            '<div class="postActionButtons '+posts[i].ID+'">'+
              '<div class="likeButton"><i class="likeButtonIcon likeButtonIcon'+posts[i].ID+' far fa-thumbs-up"></i><p class="likeNo likeNo'+posts[i].ID+'"></p></div>'+
              '<div class="dislikeButton"><i class="dislikeButtonIcon dislikeButtonIcon'+posts[i].ID+' far fa-thumbs-down"></i><p class="dislikeNo dislikeNo'+posts[i].ID+'"></p></div>'+
              '<div class="CommentButton"><i class="commentButtonIcon commentButtonIcon'+posts[i].ID+' '+posts[i].ID+' far fa-comment-dots"></i><p class="commentNo commentNo'+posts[i].ID+'"></p></div>'+
            '</div>'+
          '</div>';
            

        }
        document.querySelector('.postsSection').innerHTML = output;
        

        let username = document.querySelector('.usernameDiv').innerHTML;
        let headerButtonClassAdder = document.querySelectorAll('.postHeaderButtons');
        for (let i = 0; i < headerButtonClassAdder.length; i++) {
          if(document.querySelector('.userTypeInfo').innerHTML == "Admin" || document.querySelector('.postHeaderButtons').classList.contains(username)){
            headerButtonClassAdder[i].classList.add("visible");
          }else if(document.querySelector('.userTypeInfo').innerHTML == "User"){
            headerButtonClassAdder[i].classList.add("invisible");
          }
        }

        //loading the likes/dislikes for everypost
        for(let i in posts){
          let params = 'postID='+posts[i].ID;
          let xhr = new XMLHttpRequest();
          xhr.open("POST", "purephp/gettinglikestatusofpostsphp.php" ,true);
          xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          xhr.onload = function(){
            if(this.status==200){
              // console.log('successful js for gettinglikestatusofpostsphp'); 
              // console.log(this.responseText);
              if(this.responseText != 'No recorded status by this user'){
                let status = JSON.parse(this.responseText);
                if(status == 1){
                  // console.log('here');
                  document.querySelector('.likeButtonIcon'+posts[i].ID).classList.remove('far');
                  document.querySelector('.likeButtonIcon'+posts[i].ID).classList.add('fas');
                  document.querySelector('.dislikeButtonIcon'+posts[i].ID).classList.remove('fas');
                  document.querySelector('.dislikeButtonIcon'+posts[i].ID).classList.add('far');
                }else if(status == -1){
                  document.querySelector('.likeButtonIcon'+posts[i].ID).classList.remove('fas');
                  document.querySelector('.likeButtonIcon'+posts[i].ID).classList.add('far');
                  document.querySelector('.dislikeButtonIcon'+posts[i].ID).classList.remove('far');
                  document.querySelector('.dislikeButtonIcon'+posts[i].ID).classList.add('fas');
                }else if(status == 0){
                  document.querySelector('.likeButtonIcon'+posts[i].ID).classList.remove('fas');
                  document.querySelector('.likeButtonIcon'+posts[i].ID).classList.add('far');
                  document.querySelector('.dislikeButtonIcon'+posts[i].ID).classList.remove('fas');
                  document.querySelector('.dislikeButtonIcon'+posts[i].ID).classList.add('far');
                }   
              }    
            }
            likeCount(posts[i].ID);
            dislikeCount(posts[i].ID);
          } 
          xhr.send(params);
        }
      }

      //adding event handlers to the posts displayed
      let addEventListenerToThePosts = function(){
        // document.querySelector(".postDiv").removeEventListener("click", goToPostComments);
        let postsAddEL =  document.querySelectorAll(".commentButtonIcon");
        for (let index = 0; index < postsAddEL.length; index++) {
          postsAddEL[index].addEventListener("click", goToPostComments); 
        }
        let likeAddEL = document.querySelectorAll(".likeButton");
        for (let index = 0; index < likeAddEL.length; index++) {
          likeAddEL[index].addEventListener("click", likeFunction); 
        }
        let dislikeAddEL = document.querySelectorAll(".dislikeButton");
        for (let index = 0; index < dislikeAddEL.length; index++) {
          dislikeAddEL[index].removeEventListener("click", dislikeFunction); 
          dislikeAddEL[index].addEventListener("click", dislikeFunction); 
        }
      }
      addEventListenerToThePosts();

      
    }
  }

  xhr.send();
  setTimeout(function(){
    console.log('hi');
    let postsNo = document.querySelectorAll(".postDeleteButton").length;
    console.log(postsNo);
    for (let i = 0; i < postsNo; i++){
      console.log('hiyhy');
      document.querySelectorAll(".postDeleteButton")[i].removeEventListener("click", deletePost);
      document.querySelectorAll(".postDeleteButton")[i].addEventListener("click", deletePost);
      document.querySelectorAll(".postEditButton")[i].removeEventListener("click", editPostShow);
      document.querySelectorAll(".postEditButton")[i].addEventListener("click", editPostShow);
    }
  },100);
  // addEventListenerToPostHeaderButtons();

      
}


//sending httpreq to store post details
let newPost = function(e){
    e.preventDefault();
    let postTopic = document.querySelector("#postTopic").value;
    let postBody = document.querySelector("#postBody").value;
    params = "postTopic="+postTopic+"&postBody="+postBody;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "purephp/newpostphp.php" ,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onload = function(){
        if(this.status==200){
            //console.log('successful js');
            loadPostsOnMainPage();
        }
    }
    xhr.send(params);
    hidePostContainer();
}

document.querySelector("#post-submit").addEventListener("click", newPost);






// load all the posts once the login is successful and update them when the user posts anything





//the function to take to the post page
let goToPostComments = function(e){
  // to do : go to a separate page where the post shows on top..... all the previous comments are available and a comment box is available....which takes the comment to a table and displays them
  let idPost = e.target.classList[2];
  let topicPost = e.target.parentNode.children[0].innerHTML;
  let bodyPost = e.target.parentNode.children[1].innerHTML;

  window.location='post.php?idPost='+idPost;
  
}


//updating like dislike and comment count
let likeCount = function(postID){
  //console.log('going into likecount');
  let params = 'postID='+postID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/updatelikecountphp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status==200){
        //console.log('successful js for likeCount');
        //console.log(this.responseText);
        let likeNo = this.responseText; 
        //console.log('likeNo= '+likeNo);
        setTimeout(function(){
          document.querySelector(".likeNo"+postID).innerHTML = likeNo;
        },3000);
    }
  } 
  xhr.send(params);
}

let dislikeCount = function(postID){
  //console.log('going into dislikecount');
  let params = 'postID='+postID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/updatedislikecountphp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status==200){
        //console.log('successful js for dislikeCount');
        //console.log(this.responseText);
        let dislikeNo = this.responseText; 
        //console.log('likeNo= '+dislikeNo);
        setTimeout(function(){
          document.querySelector(".dislikeNo"+postID).innerHTML = dislikeNo;
        },3000);
    }
  } 
  xhr.send(params);
}

//functions for like and dislike matters

let likeFunction= function(e){
  //sending ajax request to like/unlike a post
  let postID = e.target.parentNode.parentNode.classList[1];
  //console.log(e.target.parentNode.parentNode.classList);
  let dislikeIcon = e.target.parentNode.parentNode.children[1].children[0];//i element of the dislike button
  let likeIcon = e.target;
  
  //checking if the dislike button was pressed before
  
  let params = 'postID='+postID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/likephp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status==200){
        //console.log('successful js for likeFunction'); 
        //console.log(this.responseText);
        //let likes = JSON.parse(this.responseText);  
        if(dislikeIcon.classList.contains('fas')){
          dislikeIcon.classList.remove('fas');
          dislikeIcon.classList.add('far');
        }
        if(likeIcon.classList.contains('far')){
          likeIcon.classList.remove('far');
          likeIcon.classList.add('fas');
        }else if(likeIcon.classList.contains('fas')){
          likeIcon.classList.remove('fas');
          likeIcon.classList.add('far');
        }
    }
  } 
  xhr.send(params);
  likeCount(postID);
  dislikeCount(postID);
}
//dislike function
let dislikeFunction= function(e){
  //sending ajax request to like/unlike a post
  let postID = e.target.parentNode.parentNode.classList[1];
  let likeIcon = e.target.parentNode.parentNode.children[0].children[0];//i element of the dislike button
  let dislikeIcon = e.target;
  let params = 'postID='+postID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/dislikephp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status==200){
        //console.log('successful js for dislikeFunction'); 
        //console.log(this.responseText);
        //let likes = JSON.parse(this.responseText);  
        if(likeIcon.classList.contains('fas')){
          likeIcon.classList.remove('fas');
          likeIcon.classList.add('far');
        }
        if(dislikeIcon.classList.contains('far')){
          dislikeIcon.classList.remove('far');
          dislikeIcon.classList.add('fas');
        }else if(dislikeIcon.classList.contains('fas')){
          dislikeIcon.classList.remove('fas');
          dislikeIcon.classList.add('far');
        }
    }
  } 
  xhr.send(params);
  likeCount(postID);
  dislikeCount(postID);
}



loadPostsOnMainPage()








