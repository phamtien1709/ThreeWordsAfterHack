let input3words = document.getElementById('input-3-words');
let currentPicture, currentLog;

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

		// post and append to log 
		$.ajax({type: 'post', url: url, data: word})
		.done((addedWordId) => {
			let logInfo = {
				userId: currentUser.id,
				imageId: currentPicture._id
			}
			console.log(currentLog);
			if(currentLog){
				if(currentLog.threewords.length < 3){
					appendToLog(currentLog._id, addedWordId);
				}
			} else {
				url = `log/create`;
				
				$.ajax({type:'post', url: url, data: logInfo})
				.done((data) => {
					currentLog = data;
					currentLog.threewords.push(addedWordId);
					appendToLog(currentLog._id, addedWordId);
				})
			}
		})

		function appendToLog(logId, addedWordId){
			url = `/log/append`;
			data = {
				logId: logId,
				addedWordId: addedWordId
			}
			$.ajax({type:'post', url: url, data: data})
			.done((data) => {
				currentLog = data;
				console.log(currentLog);
			})
		}
		
		// reset input
		input3words.value = "";
	}
})

let openPictureDim = document.getElementById('open-picture-dim');
let commentsContainer = document.getElementById('comments-container');
let pictureOwnersName = document.getElementById('owners-name');
let currentUserAvatar = document.getElementById('user-avatar-tiny')

// Open and append picture in big size
function openPictureByClick(portfolio, chosenUser){
	portfolio.addEventListener('click', function(){
		openPictureDim.style.display = "block";
		document.getElementsByTagName('body')[0].style.overflow = "hidden";// prevent body scrolling when pop up

		//append owner's information
		console.log(chosenUser);
		console.log(currentUser);
		pictureOwnersName.innerHTML = chosenUser.name;
		currentUserAvatar.src = currentUser.smallURL;

		//append picture and comments
		url = `/image/${chosenUser.currentImageId}`;
		$.ajax({type: 'get', url: url})
		.done((data) => {
			//append picture
			currentPicture = data;

			document.getElementById('big-instant-picture-image').src = data.url;
			//append Comments
			console.log(currentPicture.words);

			for(let i = 0, n = currentPicture.words.length; i < n; i++){
				//create comment
				let comment = document.createElement('div');
				comment.className = "comment";

				let commentContent = document.createElement('span');
				commentContent.className = "word";
				commentContent.innerHTML = currentPicture.words[i].content;// append comment content 

				let voteCountWrapper = document.createElement('div');
				voteCountWrapper.className = "vote-count-display";

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

				// voteWordByClick(comment, currentPicture.words[i]);
			}

			//get user log about the picture
			url = `/log/${currentUser.id}/${currentPicture._id}`
			console.log(url);
			$.ajax({type:'get', url: url})
			.done((data) => {
				currentLog = data;
			})
		})
	})
}
// Close the big picture
function closePictureByClick(){
	openPictureDim.addEventListener('click', function(){
		openPictureDim.style.display = "none";
		document.getElementsByTagName('body')[0].style.overflowY = "scroll";
		commentsContainer.innerHTML = "";
		document.getElementById('big-instant-picture-image').src = "";
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