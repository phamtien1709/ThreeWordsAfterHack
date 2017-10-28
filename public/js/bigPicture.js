let input3words = document.getElementById('input-3-words');
let currentPicture;

// Comment trigger
document.addEventListener('keydown', function(event){
	// Press enter key while input is being focused to comment
	if ((event.keyCode === 13 || event.which === 13) && input3words === document.activeElement){
		// post comment
		url = `/image/comment`;
		let word = {
			content: input3words.value,
			targetOwner: currentPicture.ownerId,
			targetPicture: currentPicture._id,
			authorId: currentUser.id
		}
		$.ajax({type: 'post', url: url, data: word})
		
		// reset input
		input3words.value = "";
	}
})

let openPictureDim = document.getElementById('open-picture-dim');
let commentsContainer = document.getElementById('comments-container');
let pictureOwnersName = document.getElementById('owners-name');

// Open and append picture in big size
function openPictureByClick(portfolio, chosenUser){
	portfolio.addEventListener('click', function(){
		openPictureDim.style.display = "block";

		//append owner's information
		console.log(chosenUser);
		pictureOwnersName.innerHTML = chosenUser.name;

		//append picture and comments
		url = `/image/${chosenUser.currentImageId}`;
		$.ajax({type: 'get', url: url})
		.done((data) => {
			//append picture
			currentPicture = data;
			document.getElementById('big-instant-picture-image').src = data.url;
			//append Comments
			console.log(currentPicture.words);

			commentsContainer.innerHTML = "";
			for(let i = 0, n = currentPicture.words.length; i < n; i++){
				//create comment
				let comment = document.createElement('div');
				comment.className = "comment";

				let commentContent = document.createElement('span');
				commentContent.className = "word";
				commentContent.innerHTML = currentPicture.words[i].content;// append comment content 

				let voteCountWrapper = document.createElement('div');

				let voteIcon = document.createElement('span');
				voteIcon.className = "fa fa-heart-o";

				let voteNumber = document.createElement('span');
				voteNumber.className = "vote-number";
				voteNumber.innerHTML = currentPicture.words[i].vote;// append vote number

				voteCountWrapper.appendChild(voteIcon);
				voteCountWrapper.appendChild(voteNumber);

				comment.appendChild(commentContent);
				comment.appendChild(voteCountWrapper);

				commentsContainer.appendChild(comment);
			}
		})
	})
}
// Close the big picture
function closePictureByClick(){
	openPictureDim.addEventListener('click', function(){
		openPictureDim.style.display = "none";
	});
}

closePictureByClick();

// prevent clicking in the picture and comment section to close the big picture
function suspendClickOpenPictureWrapper(){	
	// suspend picture click
	document.querySelector(".instant-picture-wrapper").addEventListener('click', function(event){
		event.stopPropagation();
	});
	// suspend comment section click
	document.querySelector(".right-section-wrapper").addEventListener('click', function(event){
		event.stopPropagation();
	});
}

suspendClickOpenPictureWrapper();