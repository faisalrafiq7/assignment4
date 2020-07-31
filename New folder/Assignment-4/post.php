<?php
require 'header.php';
// echo $_GET['topicPost'];
?>


<div class="PostContainer">

</div>
<div class="PostIDcarrier invisible">
    
    <?php
       echo $_GET["idPost"];
    ?>
    
</div>

<div class="cmntsSection">

</div>

<div class="commentBoxDiv">
<form id="commentForm">
    <div class="commentArea">
        <textarea name="commentBox" id="commentBox" cols="100" rows="5" placeholder='Comment...'></textarea>
    </div>
    <div class="commentButtonArea">
        <button type="submit" name="comment-submit" id="comment-submit">Comment</button>
    </div>
</form>
</div>
<script src="post.js"></script>

<?php
require "footer.php";
?>