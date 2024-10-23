////////////////////////////////////////////////////////////
// GAME v1.2
////////////////////////////////////////////////////////////

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */

var isPassMission = false
//cateogyr array list
var cateogyr_arr = [
  { src: 'puzzle/assets/puzzle/thumb/animal.png', name: 'ANIMAL' },
  { src: 'puzzle/assets/puzzle/thumb/landmark.png', name: 'LANDMARK' },
  { src: 'puzzle/assets/puzzle/thumb/zodiac.png', name: 'ZODIAC' },
  { src: 'puzzle/assets/puzzle/thumb/pattern.png', name: 'PATTERN' },
  { src: 'puzzle/assets/puzzle/thumb/all.png', name: 'ALL' }
]

//puzzle array list
var puzzles_arr = [
  {
    src: 'puzzle/assets/puzzle/animal01.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal02.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal03.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal04.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal05.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal06.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal07.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal08.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal09.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/animal10.png',
    category: 'ANIMAL',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/landmark01.png',
    category: 'LANDMARK',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/landmark02.png',
    category: 'LANDMARK',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/landmark03.png',
    category: 'LANDMARK',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/landmark04.png',
    category: 'LANDMARK',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/landmark05.png',
    category: 'LANDMARK',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/landmark06.png',
    category: 'LANDMARK',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/landmark07.png',
    category: 'LANDMARK',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac01.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac02.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac03.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac04.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac05.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac06.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac07.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac08.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac09.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac10.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac11.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/zodiac12.png',
    category: 'ZODIAC',
    puzzle: 5,
    timer: 30000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/pattern01.png',
    category: 'PATTERN',
    puzzle: 5,
    timer: 60000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/pattern02.png',
    category: 'PATTERN',
    puzzle: 5,
    timer: 60000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/pattern03.png',
    category: 'PATTERN',
    puzzle: 5,
    timer: 60000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/pattern04.png',
    category: 'PATTERN',
    puzzle: 5,
    timer: 60000,
    outerLock: true,
    innerLock: false
  },
  {
    src: 'puzzle/assets/puzzle/pattern05.png',
    category: 'PATTERN',
    puzzle: 5,
    timer: 60000,
    outerLock: true,
    innerLock: false
  }
]

//game test display
var textDisplay = {
  categoryStage: '[NUMBER]/[TOTAL]',
  challengeStage: 'Lvl[NUMBER]',
  challengeName: 'CHALLENGE',
  exitTitle: 'Exit Game',
  exitMessage: 'Are you sure you want\nto quit game?',
  share: 'Share your score:',
  resultWonTitle: 'Congratulation',
  resultWonDesc: 'You have complete all\npuzzles on time!',
  resultFailTitle: 'Game over',
  resultFailDesc: 'You did not complete\npuzzle on time!',
  resultChallengeTitle: 'Game over',
  resultChallengeDesc: 'You complete level [NUMBER]'
}

//game settings
var gameSettings = {
  category: {
    select: true, //select category page
    random: true, //random puzzle
    all: 'ALL'
  },
  challenge: {
    option: true, //challenge option
    random: true, //random puzzle
    startTimer: 50000, //start timer
    decreaseTimer: 1000, //timer decrease each stage
    startPuzzle: 3, //total circle
    increasePuzzle: 1, //circle increase each stage
    maxPuzzle: 8 //max circle
  },
  strokeEnable: false,
  strokeColor: '#000',
  strokeNum: 0,
  shadowColor: '#000',
  shadowAlpha: 0.5
}

//Social share, [SCORE] will replace with game score
var shareEnable = false //toggle share
var shareTitle = 'Highscore on Circle Puzzle is [SCORE]' //social share score title
var shareMessage = '[SCORE] is mine new highscore on Circle Puzzle! Try it now!' //social share score message
window.addEventListener('message', function (event) {
  switch (event.data) {
    case 'CONTINUE':
      if (isPassMission) {
        nextPuzzle()
      }
      break
    case 'PASS_MISSION':
      isPassMission = true
      break
  }
})
/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = { enable: false }
var gameData = { paused: true, mode: '', dragCon: false, categoryNum: 0, puzzleNum: 0 }
var rotateData = { lastX: null, speed: 50, distance: 20 }
var timeData = { enable: false, startDate: null, nowDate: null, timer: 0 }

/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */
function buildGameButton() {
  buttonStart.cursor = 'pointer'
  buttonStart.addEventListener('click', function (evt) {
    playSound('soundButton')
    if (gameSettings.category.select) {
      goPage('select')
    } else {
      gameData.puzzleArray = gameData.puzzleArrayAll
      goPage('game')
    }
  })

  buttonChallenge.cursor = 'pointer'
  buttonChallenge.addEventListener('click', function (evt) {
    playSound('soundButton')
    gameData.mode = 'challenge'
    goPage('game')
  })

  if (!gameSettings.challenge.option) {
    buttonChallenge.visible = false
  }

  buttonSelect.cursor = 'pointer'
  buttonSelect.addEventListener('click', function (evt) {
    playSound('soundButton')
    gameData.mode = 'category'

    if ($.select[gameData.categoryNum].puzzleArray.length > 0) {
      gameData.puzzleArray = $.select[gameData.categoryNum].puzzleArray
      goPage('game')
    }
  })

  buttonLeft.cursor = 'pointer'
  buttonLeft.addEventListener('click', function (evt) {
    playSound('soundButton')
    toggleSelect(false)
  })

  buttonRight.cursor = 'pointer'
  buttonRight.addEventListener('click', function (evt) {
    playSound('soundButton')
    toggleSelect(true)
  })

  itemExit.addEventListener('click', function (evt) {})

  buttonContinue.cursor = 'pointer'
  buttonContinue.addEventListener('click', function (evt) {
    playSound('soundButton')
    // goPage('main')
    goPage('game')
  })

  buttonFacebook.cursor = 'pointer'
  buttonFacebook.addEventListener('click', function (evt) {
    share('facebook')
  })

  buttonTwitter.cursor = 'pointer'
  buttonTwitter.addEventListener('click', function (evt) {
    share('twitter')
  })
  buttonWhatsapp.cursor = 'pointer'
  buttonWhatsapp.addEventListener('click', function (evt) {
    share('whatsapp')
  })

  buttonSoundOff.cursor = 'pointer'
  buttonSoundOff.addEventListener('click', function (evt) {
    toggleGameMute(true)
  })

  buttonSoundOn.cursor = 'pointer'
  buttonSoundOn.addEventListener('click', function (evt) {
    toggleGameMute(false)
  })

  buttonFullscreen.cursor = 'pointer'
  buttonFullscreen.addEventListener('click', function (evt) {
    toggleFullScreen()
  })

  buttonExit.cursor = 'pointer'
  buttonExit.addEventListener('click', function (evt) {
    togglePop(true)
    toggleOption()
  })

  buttonSettings.cursor = 'pointer'
  buttonSettings.addEventListener('click', function (evt) {
    toggleOption()
  })

  buttonConfirm.cursor = 'pointer'
  buttonConfirm.addEventListener('click', function (evt) {
    window.parent.postMessage('BACK', '*')
    playSound('soundButton')
    togglePop(false)

    stopAudio()
    stopGame()
    goPage('game')
  })

  buttonCancel.cursor = 'pointer'
  buttonCancel.addEventListener('click', function (evt) {
    playSound('soundButton')
    togglePop(false)
  })

  gameData.puzzleArrayAll = []
  gameData.puzzleArrayChallenge = []
  for (var n = 0; n < cateogyr_arr.length; n++) {
    var puzzleArray = []
    for (var p = 0; p < puzzles_arr.length; p++) {
      if (cateogyr_arr[n].name == gameSettings.category.all) {
        gameData.puzzleArrayAll.push(p)
        gameData.puzzleArrayChallenge.push(p)
        puzzleArray.push(p)
      } else if (puzzles_arr[p].category == cateogyr_arr[n].name) {
        puzzleArray.push(p)
      }
    }
    $.select[n].puzzleArray = puzzleArray
  }

  selectThumb()
}

function toggleSelect(con) {
  if (con) {
    gameData.categoryNum++
    gameData.categoryNum = gameData.categoryNum > cateogyr_arr.length - 1 ? 0 : gameData.categoryNum
  } else {
    gameData.categoryNum--
    gameData.categoryNum = gameData.categoryNum < 0 ? cateogyr_arr.length - 1 : gameData.categoryNum
  }

  selectThumb()
}

function selectThumb() {
  for (var n = 0; n < cateogyr_arr.length; n++) {
    $.select[n].visible = false
  }

  $.select[gameData.categoryNum].visible = true

  buttonSelect.alpha = 0.7
  if ($.select[gameData.categoryNum].puzzleArray.length > 0) {
    buttonSelect.alpha = 1
  }
}

/*!
 *
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 *
 */
function togglePop(con) {
  confirmContainer.visible = con
}

/*!
 *
 * DISPLAY PAGES - This is the function that runs to display pages
 *
 */
var curPage = ''
function goPage(page) {
  curPage = page

  mainContainer.visible = false
  selectContainer.visible = false
  gameContainer.visible = false
  resultContainer.visible = false

  var targetContainer = null
  switch (page) {
    case 'main':
      targetContainer = mainContainer

      break

    case 'select':
      selectContainer.visible = true
      break

    case 'game':
      gameContainer.visible = true
      stopSoundLoop('musicMain')

      startGame()
      break

    case 'result':
      targetContainer = resultContainer
      stopGame()
      togglePop(false)
      playSound('soundResult')

      if (gameData.mode == 'category') {
        if (gameData.complete) {
          isPassMission = true
          resultTitleTxt.text = textDisplay.resultWonTitle
          resultDescTxt.text = textDisplay.resultWonDesc
          window.parent.postMessage('WIN', '*')
        } else {
          resultTitleTxt.text = textDisplay.resultFailTitle
          resultDescTxt.text = textDisplay.resultFailDesc
        }
      } else {
        var _level = gameData.puzzleNum + 1
        if (_level >= 3 && gameData.complete) {
          isPassMission = true
          resultTitleTxt.text = textDisplay.resultWonTitle
          resultDescTxt.text = textDisplay.resultWonDesc
          window.parent.postMessage('WIN', '*')
        } else {
          resultTitleTxt.text = textDisplay.resultChallengeTitle
          resultDescTxt.text = textDisplay.resultChallengeDesc.replace(
            '[NUMBER]',
            gameData.puzzleNum + 1
          )
        }
      }

      saveGame(gameData.puzzleNum + 1)
      break
  }

  if (targetContainer != null) {
    targetContainer.visible = true
    targetContainer.alpha = 0
    TweenMax.to(targetContainer, 0.5, { alpha: 1, overwrite: true })
  }

  resizeCanvas()
}

/*!
 *
 * START GAME - This is the function that runs to start game
 *
 */
function startGame() {
  gameData.paused = false
  window.parent.postMessage('start game', '*')

  if ($.editor.enable) {
    gameData.mode = 'category'
    gameData.puzzleArray = gameData.puzzleArrayAll
  } else {
    playSound('soundPlay')
    if (gameData.mode == 'category') {
      if (gameSettings.category.random) {
        shuffle(gameData.puzzleArray)
      }
    } else {
      gameData.puzzleArray = gameData.puzzleArrayChallenge
      if (gameSettings.challenge.random) {
        shuffle(gameData.puzzleArray)
      }

      gameData.challengeTimer = gameSettings.challenge.startTimer
      gameData.challengePuzzle = gameSettings.challenge.startPuzzle
    }
  }

  gameData.puzzleNum = 0
  displayStatus()
  updateStats()
  loadPuzzle()
}

/*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame() {
  stopSoundLoop('soundRotating')

  gameData.paused = true
  TweenMax.killAll(false, true, false)
}

function saveGame(score) {
  if (typeof toggleScoreboardSave == 'function') {
    $.scoreData.score = score
    if (typeof type != 'undefined') {
      $.scoreData.type = type
    }
    toggleScoreboardSave(true)
  }

  /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 *
 * LOAD PUZZLE - This is the function that runs load game puzzle
 *
 */
function nextPuzzle() {
  var _nextLevel = gameData.puzzleNum + 1
  if (_nextLevel === 3 && !isPassMission) {
    isPassMission = true
    window.parent.postMessage('WIN', '*')
    // goPage('result')
    return
  }
  gameData.puzzleNum++

  if (gameData.puzzleNum < gameData.puzzleArray.length) {
    if (gameData.mode == 'challenge') {
      gameData.challengePuzzle += gameSettings.challenge.increasePuzzle
      gameData.challengePuzzle =
        gameData.challengePuzzle > gameSettings.challenge.maxPuzzle
          ? gameSettings.challenge.maxPuzzle
          : gameData.challengePuzzle
      gameData.challengeTimer -= gameSettings.challenge.decreaseTimer
    }

    displayStatus()
    updateStats()
    loadPuzzle()
  } else {
    goPage('result')
  }
}

function loadPuzzle() {
  timerTxt.text = '00 : 00'
  gameData.countdownNum = 6
  gameData.countdownPlayNum = -1
  gameData.complete = false

  var puzzleIndex = gameData.puzzleArray[gameData.puzzleNum]

  //setupMasking
  puzzleCircleContainer.removeAllChildren()

  var circleRadius = $.puzzle[puzzleIndex].image.naturalWidth
  circleRadius =
    circleRadius > $.puzzle[puzzleIndex].image.naturalHeight
      ? $.puzzle[puzzleIndex].image.naturalHeight
      : circleRadius
  circleRadius = circleRadius / 2

  var outerRotate = true
  var innerRotate = false

  if (gameData.mode == 'category') {
    gameData.puzzleCount = puzzles_arr[puzzleIndex].puzzle
    timeData.countdown = puzzles_arr[puzzleIndex].timer + 1000
    outerRotate = puzzles_arr[puzzleIndex].outerLock
    innerRotate = puzzles_arr[puzzleIndex].innerLock
  } else {
    gameData.puzzleCount = gameData.challengePuzzle
    timeData.countdown = gameData.challengeTimer + 1000

    if (randomBoolean()) {
      outerRotate = true
      innerRotate = false
    } else {
      outerRotate = false
      innerRotate = true
    }
  }

  var radiusDis = circleRadius / gameData.puzzleCount
  var radiusNum = circleRadius
  var rotateSpeed = rotateData.speed * gameData.puzzleCount

  puzzleStroke.graphics.clear()
  gameData.rotateArray = []

  for (var n = 0; n < gameData.puzzleCount; n++) {
    $.puzzleCircle[n] = $.puzzle[puzzleIndex].clone()
    $.puzzleCircle['mask' + n] = new createjs.Shape()
    $.puzzleCircle['mask' + n].graphics.beginFill('red').drawCircle(0, 0, radiusNum)
    $.puzzleCircle[n].mask = $.puzzleCircle['mask' + n]
    $.puzzleCircle[n].rotateSpeed = rotateSpeed

    var shadowRatioY = 1.35
    var shadowRatioX = 1

    var shadowRatioInnerY = 1.28
    var shadowRatioInnerX = 0.85
    var pos = [
      { x: -radiusNum, y: 0 },
      { x: -(radiusNum * shadowRatioInnerX), y: -(radiusNum * shadowRatioInnerY) },
      { x: radiusNum * shadowRatioInnerX, y: -(radiusNum * shadowRatioInnerY) },
      { x: radiusNum, y: 0 },
      { x: radiusNum * shadowRatioX, y: -(radiusNum * shadowRatioY) },
      { x: -(radiusNum * shadowRatioX), y: -(radiusNum * shadowRatioY) },
      { x: -radiusNum, y: 0 }
    ]

    $.puzzleCircle['shadow' + n] = new createjs.Shape()
    $.puzzleCircle['shadow' + n].graphics
      .clear()
      .beginFill(gameSettings.shadowColor)
      .moveTo(pos[0].x, pos[0].y)
      .bezierCurveTo(pos[1].x, pos[1].y, pos[2].x, pos[2].y, pos[3].x, pos[3].y)
      .bezierCurveTo(pos[4].x, pos[4].y, pos[5].x, pos[5].y, pos[6].x, pos[6].y)
    $.puzzleCircle['shadow' + n].alpha = gameSettings.shadowAlpha
    $.puzzleCircle['shadow' + n].mask = $.puzzleCircle['mask' + n]

    puzzleCircleContainer.addChild($.puzzleCircle[n], $.puzzleCircle['shadow' + n])

    var eventCon = true
    var eventBlockCon = false
    if (outerRotate && n == 0) {
      eventCon = false
    } else if (innerRotate && n == gameData.puzzleCount - 1) {
      eventCon = false
      eventBlockCon = true
    }

    $.puzzleCircle['shadow' + n].visible = false
    if (eventCon) {
      if (gameSettings.strokeEnable) {
        puzzleStroke.graphics
          .setStrokeStyle(gameSettings.strokeNum)
          .beginStroke(gameSettings.strokeColor)
          .drawCircle(0, 0, radiusNum)
      }

      gameData.rotateArray.push(n)
      $.puzzleCircle['shadow' + n].visible = true
      $.puzzleCircle[n].rotation = Math.random() * 360
      buildPuzzleEvents($.puzzleCircle[n])
    }

    if (eventBlockCon) {
      $.puzzleCircle[n].addEventListener('click', function (evt) {})
    }

    radiusNum -= radiusDis
    rotateSpeed -= rotateData.speed
  }

  gamebg.alpha = 1
  gamebgP.alpha = 1
  TweenMax.to(gamebgP, 0.8, { alpha: 0, overwrite: true })
  TweenMax.to(gamebg, 0.8, {
    alpha: 0,
    overwrite: true,
    onComplete: function () {
      gameData.dragCon = true

      if (!$.editor.enable) {
        toggleGameTimer(true)
      }
    }
  })
}

/*!
 *
 * PUZZLE ROTATE EVENTS - This is the function that runs to build puzzle events
 *
 */
function buildPuzzleEvents(obj) {
  obj.dragging = false
  obj.cursor = 'pointer'
  obj.addEventListener('mousedown', function (evt) {
    toggleRotateEvent(evt, 'drag')
  })
  obj.addEventListener('pressmove', function (evt) {
    toggleRotateEvent(evt, 'move')
  })
  obj.addEventListener('pressup', function (evt) {
    toggleRotateEvent(evt, 'drop')
  })
}

function toggleRotateEvent(obj, con) {
  switch (con) {
    case 'drag':
      if (!gameData.dragCon) {
        return
      }

      playSound('soundPress')
      playSoundLoop('soundRotating')
      toggleSoundLoop('soundRotating', false)
      rotateData.rotation = 0

      obj.target.dragging = true
      break

    case 'move':
      if (obj.target.dragging) {
        var cursorX = stage.mouseX
        var cursorY = stage.mouseY

        if (rotateData.lastX == null) {
          rotateData.lastX = cursorX
          return
        }

        var cursorXDiff = cursorX - rotateData.lastX
        var rotation = -(cursorXDiff / obj.target.rotateSpeed)

        if (cursorY < puzzleContainer.y) {
          rotation = Math.PI * 2 - rotation
        }

        rotation = rotation / (Math.PI / 180)
        obj.target.rotation += rotation

        //reset
        var currentRotate = obj.target.rotation
        if (currentRotate > 360) {
          currentRotate = currentRotate - 360
        } else if (currentRotate < 0) {
          currentRotate = 360 + currentRotate
        }

        toggleSoundLoop('soundRotating', true)
        checkRotating(currentRotate)

        obj.target.rotation = currentRotate
        rotateData.lastX = cursorX
      }
      break

    case 'drop':
      stopSoundLoop('soundRotating')

      if (obj.target.dragging) {
        playSound('soundRelease')
        obj.target.dragging = false
        rotateData.lastX = null

        if (!$.editor.enable) {
          checkPuzzleComplete()
        }
      }
      break
  }
}

function checkRotating(rotateNum) {
  TweenMax.to(puzzleCircleContainer, 0.1, {
    overwrite: true,
    onComplete: function () {
      toggleSoundLoop('soundRotating', false)
    }
  })
}

/*!
 *
 * CHECK PUZZLE COMPLETE - This is the function that runs for game completion
 *
 */
function checkPuzzleComplete() {
  var puzzleCount = 0
  for (var n = 0; n < gameData.rotateArray.length; n++) {
    var puzzleIndex = gameData.rotateArray[n]
    if ($.puzzleCircle['shadow' + puzzleIndex].visible) {
      var currentRotate = $.puzzleCircle[puzzleIndex].rotation
      if (currentRotate <= rotateData.distance || currentRotate >= 360 - rotateData.distance) {
        puzzleCount++
      }
    }
  }

  if (puzzleCount == gameData.rotateArray.length) {
    toggleGameTimer(false)
    gameData.dragCon = false
    solvedPuzzle()
  }
}

function solvedPuzzle() {
  shuffle(gameData.rotateArray)

  gameData.solvedCount = 0
  for (var n = 0; n < gameData.rotateArray.length; n++) {
    var puzzleIndex = gameData.rotateArray[n]
    var rotateResetNum = $.puzzleCircle[puzzleIndex].rotation > 180 ? 360 : 0
    TweenMax.to($.puzzleCircle[puzzleIndex], 0.5, {
      delay: n * 0.25,
      rotation: rotateResetNum,
      overwrite: true,
      onComplete: hideRotateShadow,
      onCompleteParams: [puzzleIndex]
    })
  }
}

function hideRotateShadow(puzzleIndex) {
  gameData.solvedCount++
  playSound('soundPlace')
  TweenMax.to($.puzzleCircle['shadow' + puzzleIndex], 0.3, { alpha: 0, overwrite: true })

  if (gameData.solvedCount >= gameData.rotateArray.length) {
    endGame(true)
  }
}

/*!
 *
 * END GAME - This is the function that runs for game end
 *
 */
function endGame(complete) {
  stopSoundLoop('soundRotating')
  toggleGameTimer(false)

  TweenMax.to(gameContainer, 1, {
    overwrite: true,
    onComplete: function () {
      if (complete) {
        gameData.complete = true
        displayStatus('complete')
        TweenMax.to(gameContainer, 2, {
          overwrite: true,
          onComplete: function () {
            nextPuzzle()
          }
        })
      } else {
        displayStatus('over')
        TweenMax.to(gameContainer, 2, {
          overwrite: true,
          onComplete: function () {
            goPage('result')
          }
        })
      }
    }
  })
}

/*!
 *
 * GAME STATUS - This is the function that runs to display game status
 *
 */
function displayStatus(con) {
  itemStatusOver.visible = false
  itemStatusComplete.visible = false

  if (con == 'complete') {
    playSound('soundComplete')
    itemStatusComplete.visible = true
  } else if (con == 'over') {
    playSound('soundOver')
    itemStatusOver.visible = true
  }

  if (con != undefined) {
    statusMoveContainer.y = 20
    statusMoveContainer.alpha = 0
    statusMoveContainer.scaleX = statusMoveContainer.scaleY = 1.5
    TweenMax.to(statusMoveContainer, 0.5, { alpha: 1, y: 0, scaleX: 1, scaleY: 1, overwrite: true })
  }
}

/*!
 *
 * UPDATE GAME - This is the function that runs to loop game update
 *
 */
function updateGame() {
  if (!gameData.paused) {
  }

  if (timeData.enable) {
    timeData.nowDate = new Date()
    timeData.elapsedTime = Math.floor(timeData.nowDate.getTime() - timeData.startDate.getTime())
    timeData.timer = Math.floor(timeData.countdown - timeData.elapsedTime)

    if (timeData.timer <= 0) {
      //stop
      endGame(false)
    } else {
      if (timeData.timer <= gameData.countdownNum * 1000) {
        if (gameData.countdownNum != gameData.countdownPlayNum) {
          gameData.countdownPlayNum = gameData.countdownNum
          gameData.countdownNum--

          if (gameData.countdownPlayNum == 1) {
            playSound('soundCountdownEnd')
          } else {
            playSound('soundCountdown')
          }
        }
      }

      timerTxt.text = millisecondsToTimeGame(timeData.timer)
    }
  }
}

/*!
 *
 * UPDATE STATS - This is the function that runs to update game stats
 *
 */
function updateStats() {
  var stageText = ''
  var modeText = ''
  if (gameData.mode == 'category') {
    stageText = textDisplay.categoryStage.replace('[NUMBER]', gameData.puzzleNum + 1)
    stageText = stageText.replace('[TOTAL]', gameData.puzzleArray.length)

    var puzzleIndex = gameData.puzzleArray[gameData.puzzleNum]
    modeText = puzzles_arr[puzzleIndex].category
  } else {
    stageText = textDisplay.challengeStage.replace('[NUMBER]', gameData.puzzleNum + 1)
    modeText = textDisplay.challengeName
  }

  modeText = modeText.length > 10 ? modeText.substring(0, 10) + '...' : modeText
  stageTxt.text = stageText
  modeTxt.text = modeText
}

/*!
 *
 * GAME TIMER - This is the function that runs for game timer
 *
 */
function toggleGameTimer(con) {
  if ($.editor.enable) {
    return
  }

  if (con) {
    timeData.startDate = new Date()
  } else {
  }
  timeData.enable = con
}

/*!
 *
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 *
 */
function millisecondsToTimeGame(milli) {
  var milliseconds = milli % 1000
  var seconds = Math.floor((milli / 1000) % 60)
  var minutes = Math.floor((milli / (60 * 1000)) % 60)

  if (seconds < 10) {
    seconds = '0' + seconds
  }

  if (minutes < 10) {
    minutes = '0' + minutes
  }

  return minutes + ' : ' + seconds
}
/*!
 *
 * OPTIONS - This is the function that runs to toggle options
 *
 */

function toggleOption() {
  if (optionsContainer.visible) {
    optionsContainer.visible = false
  } else {
    optionsContainer.visible = true
  }
}

/*!
 *
 * OPTIONS - This is the function that runs to mute and fullscreen
 *
 */
function toggleGameMute(con) {
  buttonSoundOff.visible = false
  buttonSoundOn.visible = false
  toggleMute(con)
  if (con) {
    buttonSoundOn.visible = true
  } else {
    buttonSoundOff.visible = true
  }
}

function toggleFullScreen() {
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
}

/*!
 *
 * SHARE - This is the function that runs to open share url
 *
 */
function share(action) {
  gtag('event', 'click', { event_category: 'share', event_label: action })

  var loc = location.href
  loc = loc.substring(0, loc.lastIndexOf('/') + 1)

  var title = ''
  var text = ''

  title = shareTitle.replace('[SCORE]', gameData.puzzleNum + 1)
  text = shareMessage.replace('[SCORE]', gameData.puzzleNum + 1)

  var shareurl = ''

  if (action == 'twitter') {
    shareurl = 'https://twitter.com/intent/tweet?url=' + loc + '&text=' + text
  } else if (action == 'facebook') {
    shareurl =
      'https://www.facebook.com/sharer/sharer.php?u=' +
      encodeURIComponent(
        loc +
          'share.php?desc=' +
          text +
          '&title=' +
          title +
          '&url=' +
          loc +
          '&thumb=' +
          loc +
          'share.jpg&width=590&height=300'
      )
  } else if (action == 'google') {
    shareurl = 'https://plus.google.com/share?url=' + loc
  } else if (action == 'whatsapp') {
    shareurl = 'whatsapp://send?text=' + encodeURIComponent(text) + ' - ' + encodeURIComponent(loc)
  }

  window.open(shareurl)
}
