function voteWordByClick(listeningWord, word){
	listeningWord.addEventListener('click', function(){
		for(let i = 0, n = currentUser.spokenWordsId.length; i < n; i++){
			if(currentUser.spokenWords[i].id === word._id.toString()){
				if(currentUser.spokenWords[i].voted){
					currentUser.spokenWords[i].voted = false;
				}
			}
		}
	});
}