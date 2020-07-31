let idOfThePost = parseInt(document.querySelector('.PostIDcarrier').innerHTML);
console.log('id of the post is '+idOfThePost);
let userPost;

let deleteComment = function(e){
  let cmntID = e.target.classList[2];
  params = 'cmntID='+cmntID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/deletecmntphp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
      if(this.status==200){
          console.log('successful js for delete cmnt');
          console.log(this.responseText);
          loadPreviousComments();
      }
  }
  xhr.send(params);
}
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
          window.location = "forum.php";
      }
  }
  xhr.send(params);
}

//loads the post on the page
let loadThePost = function(){
    
    let params= 'id='+idOfThePost;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "purephp/postphp.php" ,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onload = function(){
        if(this.status==200){
            console.log('successful js for loadthepost');
            //console.log(JSON.parse(this.responseText));
            let post = JSON.parse(this.responseText);
            //console.log(post[0].body);
            output = '<div class=postDivContainer>'+
                '<div class = "postDiv '+post[0].ID+'">'+
                  '<div class="postHeader">'+
                    '<div class="topicOfThePost">'+post[0].topic+'</div>'+
                    '<div class= "postHeaderButtons '+post[0].byUser+'">'+
                      //'<div class= "postEditButton '+post[0].ID+'">Edit</div>'+
                      '<div class= "postDeleteButton '+post[0].ID+'">Delete</div>'+                      
                    '</div>'+
                  '</div>'+
                  '<div class="bodyOfThePost">'+post[0].body+' </div>'+
                '</div>'+
                '<div class="postInfo">By: '+post[0].byUser+'</div>'+
                '<div class="postID invisible"> <p>ID: '+post[0].ID+'</p></div>'+
                '<div class="postActionButtons '+post[0].ID+'">'+
                  '<div class="likeButton"><i class="likeButtonIcon likeButtonIcon'+post[0].ID+' far fa-thumbs-up"></i><p class="likeNo likeNo'+post[0].ID+'"></p></div>'+
                  '<div class="dislikeButton"><i class="dislikeButtonIcon dislikeButtonIcon'+post[0].ID+' far fa-thumbs-down"></i><p class="dislikeNo dislikeNo'+post[0].ID+'"></p></div>'+
                  '<div class="CommentButton"><i class="commentButtonIcon commentButtonIcon'+post[0].ID+' far fa-comment-dots"></i><p class="commentNo commentNo'+post[0].ID+'"></p></div>'+
                '</div>'+
                '</div>';      
            document.querySelector('.PostContainer').innerHTML = output;
            userPost = post[0].byUser;
            document.querySelector(".postDeleteButton").removeEventListener("click", deletePost);
            document.querySelector(".postDeleteButton").addEventListener("click", deletePost);
            //document.querySelector(".postEditButton").removeEventListener("click", editPost);
            //document.querySelector(".postEditButton").addEventListener("click", editPost);      
            
            let params = 'postID='+post[0].ID;
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "purephp/gettinglikestatusofpostsphp.php" ,true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.onload = function(){
              if(this.status==200){
                console.log('successful js for gettinglikestatusofpostsphp'); 
                console.log(this.responseText);
                if(this.responseText != 'No recorded status by this user'){
                  let status = JSON.parse(this.responseText);
                  if(status == 1){
                    console.log('here');
                    document.querySelector('.likeButtonIcon'+post[0].ID).classList.remove('far');
                    document.querySelector('.likeButtonIcon'+post[0].ID).classList.add('fas');
                    document.querySelector('.dislikeButtonIcon'+post[0].ID).classList.remove('fas');
                    document.querySelector('.dislikeButtonIcon'+post[0].ID).classList.add('far');
                  }else if(status == -1){
                    document.querySelector('.likeButtonIcon'+post[0].ID).classList.remove('fas');
                    document.querySelector('.likeButtonIcon'+post[0].ID).classList.add('far');
                    document.querySelector('.dislikeButtonIcon'+post[0].ID).classList.remove('far');
                    document.querySelector('.dislikeButtonIcon'+post[0].ID).classList.add('fas');
                  }else if(status == 0){
                    document.querySelector('.likeButtonIcon'+post[0].ID).classList.remove('fas');
                    document.querySelector('.likeButtonIcon'+post[0].ID).classList.add('far');
                    document.querySelector('.dislikeButtonIcon'+post[0].ID).classList.remove('fas');
                    document.querySelector('.dislikeButtonIcon'+post[0].ID).classList.add('far');
                  }   
                }    
              }
            } 
            xhr.send(params);
            likeCount(post[0].ID);
            dislikeCount(post[0].ID);


            
            //adding eventlisteners to the like and dislike buttons
            document.querySelector(".likeButton").addEventListener("click", likeFunction);
            document.querySelector(".dislikeButton").addEventListener("click", dislikeFunction);

            //hiding/making visible the post header buttons
            let username = document.querySelector('.usernameDiv').innerHTML;
            if(document.querySelector('.userTypeInfo').innerHTML == "Admin" || document.querySelector('.postHeaderButtons').classList.contains(username)){
              document.querySelector('.postHeaderButtons').classList.add("visible");
            }else{
              document.querySelector('.postHeaderButtons').classList.add("invisible");
            }
        }
    }
    xhr.send(params);
    //console.log(params);
}
loadThePost();


// TODOOOOOOOOOO
//make a function that sends anything inputted in the comment box as an ajax request to file new commentphp.php ...... check if its the first comment .. if it is... first create a table to store all the comments .... then store the comment.....if it isnt....then ..... only run the code which inserts the data into the table........


let newComment = function(e){
    e.preventDefault();
    let commentBody = document.querySelector("#commentBox").value;
    if(document.querySelector("#commentBox").value !== ''){
        let postID = idOfThePost;
        //wrong user
        
    
        params = "commentBody="+commentBody+"&postID="+postID;
    
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "purephp/newcmntphp.php" ,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onload = function(){
            if(this.status==200){
                console.log('successful js for passing comment info');
                console.log(this.responseText);
                loadPreviousComments();
            }
        }
        xhr.send(params);
    }
    
}






document.querySelector("#comment-submit").addEventListener("click", newComment);




//loading comments on the page

//function to load all the previous comments on the main page
let loadPreviousComments = function(){
    params = "postID="+idOfThePost;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'purephp/allcmntsphp.php', true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  
    xhr.onload = function(){
      if(this.status == 200){
        console.log("loadPreviousComments js successful");
        console.log(this.responseText);
        if(this.responseText !== 'Empty'){
          let cmnts = JSON.parse(this.responseText);
      
          let output = '';
          
          for(let i in cmnts){
          output += 
              '<div class=cmntDivContainer>'+
                '<div class = "cmntDiv">'+
                  '<div class="bodyOfTheCmnt">'+cmnts[i].cmntBody+' </div>'+
                  '<div class="cmntInfo">By: '+cmnts[i].byUser+'</div>'+
                '</div>'+
                '<div class="commentButtonsDiv">'+
                  '<div class="commentDeleteButton commentDeleteButton'+cmnts[i].cmntID+' '+cmnts[i].cmntID+'">Delete</div>'+
                '</div>'+  
                '<div class="cmntID invisible"> <p>ID: '+cmnts[i].cmntID+'</p></div>'+
              '</div>';
              //console.log(output);
          }
          document.querySelector('.cmntsSection').innerHTML = output;
        }   
      }
    }
  
    xhr.send(params);
    //adding event handlers to delete comment button
    setTimeout(function(){
      console.log('hi');
      let commentsNo = document.querySelectorAll(".commentDeleteButton").length;
      console.log(commentsNo);
      for (let i = 0; i < commentsNo; i++){
        console.log('hiyhy');
        document.querySelectorAll(".commentDeleteButton")[i].removeEventListener("click", deleteComment);
        document.querySelectorAll(".commentDeleteButton")[i].addEventListener("click", deleteComment);
      }
    },100);
        
  }
  
  loadPreviousComments()


  //like and dislike functions

let likeFunction= function(e){
  //sending ajax request to like/unlike a post
  let postID = e.target.parentNode.parentNode.classList[1];
  let dislikeIcon = e.target.parentNode.parentNode.children[1].children[0];//i element of the dislike button
  let likeIcon = e.target;
  
  //checking if the dislike button was pressed before
  
  let params = 'postID='+postID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/likephp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status==200){
        console.log('successful js for likeFunction'); 
        console.log(this.responseText);
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
        console.log('successful js for dislikeFunction'); 
        console.log(this.responseText);
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

//updating like dislike and comment count
let likeCount = function(postID){
  console.log('going into likecount');
  let params = 'postID='+postID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/updatelikecountphp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status==200){
        console.log('successful js for likeCount');
        console.log(this.responseText);
        let likeNo = this.responseText; 
        console.log('likeNo= '+likeNo);
        setTimeout(function(){
          console.log('here');
          document.querySelector(".likeNo"+postID).innerHTML = likeNo;
        },1800);
    }
  } 
  xhr.send(params);
}

let dislikeCount = function(postID){
  console.log('going into dislikecount');
  let params = 'postID='+postID;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "purephp/updatedislikecountphp.php" ,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status==200){
        console.log('successful js for dislikeCount');
        console.log(this.responseText);
        let dislikeNo = this.responseText; 
        console.log('likeNo= '+dislikeNo);
        setTimeout(function(){
          document.querySelector(".dislikeNo"+postID).innerHTML = dislikeNo;
        },1800);
        
    }
  } 
  xhr.send(params);
}


