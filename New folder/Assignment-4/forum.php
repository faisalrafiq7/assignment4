<?php
    require "header.php";
?>

<div class="newPostButtonDiv">
    <button class="newPostButton">New Post</button>
</div>
<div class="postContainer invisible">
    <form id="postForm">
        <div class="topicOfPost">
            <label for="postTopic">Topic</label>
            <input type="text" name = "postTopic" id = "postTopic" placeholder="Type...">
        </div>
        <div class="bodyOfPost">
            <label for="postBody">Body</label>
            <textarea type="text" name = "postBody" id = "postBody" placeholder="Type..." rows="23" cols="65"></textarea>
        </div>
        <div class="registerButtons">    
            <button type="submit" name="post-submit" id="post-submit">Post</button>
            <button name='cancelNewPost' class='cancelNewPost' type="button">Back</button>
        </div>
    </form>
</div>
<div class="editPostContainer invisible">
    <form id="editpostForm">
        <div class="topicOfPost">
            <label for="editpostTopic">Topic</label>
            <input type="text" name = "postTopic" id = "editpostTopic" placeholder="Type...">
        </div>
        <div class="bodyOfPost">
            <label for="editpostBody">Body</label>
            <textarea type="text" name = "postBody" id = "editpostBody" placeholder="Type..." rows="22" cols="65"></textarea>
        </div>
        <div class="registerButtons">    
            <button type="submit" name="editpost-submit" id="editpost-submit">Edit</button>
            <button name='cancelEditPost' class='cancelEditPost' type="button">Back</button>
        </div>
    </form>
</div>
<div class="postsSection">

</div>



<script src="forum.js"></script>

<?php
require "footer.php";
?>