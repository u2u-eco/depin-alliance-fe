////////////////////////////////////////////////////////////
// EDIT TRACKS
////////////////////////////////////////////////////////////
var edit = {show:true, option:'', xmlFile:'', layoutNum:0, answerNum:0, sortNum:0, isLandscape:true, preview:false};

var puzzleLoader, puzzleFileFest;

/*!
 * 
 * EDIT READY
 * 
 */
$(function() {
	$.editor.enable = true;
});

function loadEditPage(){
	displayContainer.visible = false;
	optionsContainer.removeChild(buttonExit);
	
	$.get('editTools.html', function(data){
		$('body').prepend(data);
		$('#editWrapper').show();
		toggleEditOption();
		buildEditButtons();
		buttonExit.visible = false;
	});		
}

/*!
 * 
 * BUILD EDIT BUTTONS - This is the function that runs to build edit buttons
 * 
 */
function buildEditButtons(){
	$('#toggleShowOption').click(function(){
		toggleShowOption();
	});
	
	$("#viewport").change(function() {
		if($(this).val() != ''){
			if($(this).val() == 'true'){
				viewport.isLandscape = edit.isLandscape = true;	
			}else{
				viewport.isLandscape = edit.isLandscape = false;
			}
			
			changeViewport(viewport.isLandscape);
			resizeGameFunc();
		}
	});
	
	//puzzles list
	gameData.puzzleNum = 0;
	buildPuzzleDropdown();
	
	$('#togglePanel').click(function(){
		togglePanel();
	});
	
	$("#puzzlesList").change(function() {
		if($(this).val() != ''){
			gameData.puzzleNum = $(this).val();
			loadPuzzleData();
		}
	});
	
	$('#prevPuzzle').click(function(){
		togglePuzzle(false);
	});
	
	$('#nextPuzzle').click(function(){
		togglePuzzle(true);
	});
	
	$('#addPuzzle').click(function(){
		actionPuzzle('new');
	});
	
	$('#removePuzzle').click(function(){
		actionPuzzle('remove');
	});
	
	$('#movePuzzleUp').click(function(){
		actionPuzzle('moveup');
	});
	
	$('#movePuzzleDown').click(function(){
		actionPuzzle('movedown');
	});
	
	$('#updateImage').click(function(){
		updatePuzzle();
		loadPuzzleAssets();
	});
	
	$('#editPuzzle').click(function(){
		toggleEditOption('puzzle', true);
	});
	
	$('#puzzleBack').click(function(){
		toggleEditOption();
	});
	
	
	//generate
	$('#generateArray').click(function(){
		generateArray();
	});
}

 /*!
 * 
 * TOGGLE DISPLAY OPTION - This is the function that runs to toggle display option
 * 
 */
 
function toggleShowOption(){
	if(edit.show){
		edit.show = false;
		$('#editOption').hide();
		$('#toggleShowOption').val('Show Edit Option');
	}else{
		edit.show = true;
		$('#editOption').show();
		$('#toggleShowOption').val('Hide Edit Option');
	}
}

/*!
 * 
 * TOGGLE EDIT OPTION - This is the function that runs to toggle edit option
 * 
 */
function toggleEditOption(con, update){
	edit.option = con;
	
	$('#editPuzzleWrapper').hide();
	$('#puzzleEditWrapper').hide();
	$('#hiddenEditWrapper').hide();
	
	if(con == 'puzzle'){
		$('#puzzleEditWrapper').show();
	}else{
		$('#editPuzzleWrapper').show();
	}
}

/*!
 * 
 * BUILD PUZZLE DROPDOWN - This is the function that runs to build puzzle dropdown
 * 
 */
function buildPuzzleDropdown(){
	$('#puzzlesList').empty();
	for(n=0;n<puzzles_arr.length;n++){
		$('#puzzlesList').append($("<option/>", {
			value: n,
			text: 'Puzzle '+(n+1)
		}));
	}
	$('#puzzlesList').val(gameData.puzzleNum);
	
	loadPuzzleData();
}

/*!
 * 
 * TOGGLE PUZZLE - This is the function that runs to toggle puzzle
 * 
 */
function togglePuzzle(con){
	if(con){
		gameData.puzzleNum++;
		gameData.puzzleNum = gameData.puzzleNum > puzzles_arr.length - 1 ? 0 : gameData.puzzleNum;
	}else{
		gameData.puzzleNum--;
		gameData.puzzleNum = gameData.puzzleNum < 0 ? puzzles_arr.length - 1 : gameData.puzzleNum;
	}
	
	$('#puzzlesList').prop("selectedIndex", gameData.puzzleNum);
	
	loadPuzzleData();
}

/*!
 * 
 * LOAD EDITOR PUZZLE - This is the function that runs to load editor data
 * 
 */
function loadPuzzleData(){
	toggleEditOption();
	
	$('#puzzleImage').val(puzzles_arr[gameData.puzzleNum].src);
	$('#puzzleCategory').val(puzzles_arr[gameData.puzzleNum].category);
	$('#puzzleTimer').val(puzzles_arr[gameData.puzzleNum].timer);
	
	var outerCon = puzzles_arr[gameData.puzzleNum].outerLock == true ? 0 : 1;
	var innerCon = puzzles_arr[gameData.puzzleNum].innerLock == true ? 0 : 1;
	$('#puzzleOuter').prop("selectedIndex", outerCon);
	$('#puzzleInner').prop("selectedIndex", innerCon);
	
	loadPuzzleAssets();
}

/*!
 * 
 * EDITOR ACTION - This is the function that runs to for editor action
 * 
 */
function actionPuzzle(action){
	switch(action){
		case 'new':
			puzzles_arr.push({src:'', category:'', timer:30000, outerLock:true, innerLock:false});
			gameData.puzzleNum = puzzles_arr.length - 1;
			buildPuzzleDropdown();
		break;
		
		case 'remove':
			if(puzzles_arr.length > 1){
				puzzles_arr.splice(gameData.puzzleNum, 1);
				gameData.puzzleNum = 0;
				buildPuzzleDropdown();
			}
		break;
		
		case 'moveup':
			if(gameData.puzzleNum-1 >= 0){
				swapArray(puzzles_arr, gameData.puzzleNum-1, gameData.puzzleNum);
				gameData.puzzleNum--;
				buildPuzzleDropdown();
			}
		break;
		
		case 'movedown':
			if(gameData.puzzleNum+1 < puzzles_arr.length){
				swapArray(puzzles_arr, gameData.puzzleNum+1, gameData.puzzleNum);
				gameData.puzzleNum++;
				buildPuzzleDropdown();
			}
		break;
	}
}

/*!
 * 
 * UPDATE PUZZLE - This is the function that runs to update puzzle
 * 
 */
function updatePuzzle(){
	puzzles_arr[gameData.puzzleNum].src = $('#puzzleImage').val();
	puzzles_arr[gameData.puzzleNum].category = $('#puzzleCategory').val();
	puzzles_arr[gameData.puzzleNum].timer = $('#puzzleTimer').val();
	
	var outerCon = $('#puzzleOuter').val() == 'true' ? true : false;
	var innerCon = $('#puzzleInner').val() == 'true' ? true : false;
	puzzles_arr[gameData.puzzleNum].outerLock = outerCon;
	puzzles_arr[gameData.puzzleNum].innerLock = innerCon;
}

/*!
 * 
 * GENERATE ARRAY - This is the function that runs to generate array
 * 
 */
function generateArray(){
	var outputArray = '';
	var space = '					';
	var space2 = '						';
	var space3 = '							';
	
	outputArray += "[\n";
	for(e=0;e<puzzles_arr.length;e++){		
		outputArray += space+"{src:'"+puzzles_arr[e].src+"', category:'"+puzzles_arr[e].category+"', puzzle:"+puzzles_arr[e].puzzle+", timer:"+puzzles_arr[e].timer+", outerLock:"+puzzles_arr[e].outerLock+", innerLock:"+puzzles_arr[e].innerLock+"},";
		outputArray += space+"},\n\n";
	}
	outputArray += space+'];';
	outputArray = outputArray.replace(/undefined/g,0);
	$('#outputArray').val(outputArray);	
}

/*!
 * 
 * LOAD PUZZLE ASSETS - This is the function that runs to load puzzle assets
 * 
 */
function loadPuzzleAssets(){	
	puzzleFileFest = [];
	puzzleFileFest = [{src:puzzles_arr[gameData.puzzleNum].src, id:'puzzleImage'}];
	
	puzzleLoader = new createjs.LoadQueue(false);
	puzzleLoader.addEventListener("complete", handlePuzzleComplete);
	puzzleLoader.loadManifest(puzzleFileFest);
}

function handlePuzzleComplete() {
	$.puzzle[gameData.puzzleNum] = new createjs.Bitmap(puzzleLoader.getResult('puzzleImage'));
	centerReg($.puzzle[gameData.puzzleNum]);
	
	loadPuzzle();
};