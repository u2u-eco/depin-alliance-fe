////////////////////////////////////////////////////////////
// GAME v2.1
////////////////////////////////////////////////////////////

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */
var isPassMission = false
// var bgColour = '#ea2f4c' //background colour
// var questionColour = '#EFECE2' //question mark colour
// var wrongColour = '#D9DADE' //wrong answer colour
// var startButtonText = 'TAP TO START' //text for start button
// var resultText = 'SOLVED: [NUMBER]' //text for result page, [NUMBER] will replace with total solve answer
// var buttonReplayText = 'PLAY AGAIN' //text for replay button

var bgColour = '#222' //background colour
var questionColour = '#EFECE2' //question mark colour
var wrongColour = '#D9DADE' //wrong answer colour
var startButtonText = 'TAP TO START' //text for start button
var resultText = 'SOLVED: [NUMBER]' //text for result page, [NUMBER] will replace with total solve answer
var buttonReplayText = 'PLAY AGAIN' //text for replay button

var numberSpacing = 30 //spacing between number
var numberShadowY = 15 //number shadow distance
var numberDragScale = 0.3 //number scale while dragging
var numberDragShadowY = 38 //number shadow distance while dragging

var numberOutsideScale = 0.8 //random number scale
var numberOutsideAlpha = 0.7 //random number alpha

var maxSymbols = 2 //maximum math formula, minimum 2
var mathSymbol_arr = ['+', '-', '*', '/'] //math symbols to build the formula, this symbols array must more than maxSymbols number option
var includeBracket = true //include bracket to formula
var showMultiplyOnce = true //to avoid big number, this option only show multiply once in each question

var timerCount = 25 //countdown timer (second)
var timerIncrease = 2 //countdown timer decrease each round (second)
var timerCicleWidth = 25 //timer icon width
var timerCircleColour = '#FFE9BA' //timer icon colour

var playBackgroundMusic = true //play background music
var playTimerSound = true //play timer sound

var exitMessage = 'Are you sure you want\nto quit the game?' //quit game message

//Social share, [SCORE] will replace with game score
var shareEnable = false //toggle share
var shareText = 'SHARE IT NOW' //text for share instruction
var shareTitle = 'Highscore on Solve Math is [SCORE]' //social share score title
var shareMessage = '[SCORE] is mine new highscore on Solve Math! Try it now!' //social share score message

window.addEventListener('message', function (event) {
  switch (event.data) {
    case 'CONTINUE':
      if (isPassMission) {
        checkUserFormula()
      }
      break
    case 'PASS_MISSION':
      isPassMission = true
      break
  }
})

setInterval(() => {
  window.parent.postMessage('PING', '*')
}, 2000)
/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */

var maths_arr = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '-',
  '*',
  '/',
  '(',
  ')',
  '=',
  '?'
]
var symbolreplace_arr = ['+', '-', '*', '/', '(', ')', '=', '?']
var namereplace_arr = [
  'plus',
  'minus',
  'multiply',
  'divide',
  'bracketleft',
  'bracketright',
  'equal',
  'questionmark'
]
var gamePaused = true

/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */
var buttonClickCon = true

function buildGameButton() {
  buttonReplay.cursor = 'pointer'
  buttonReplay.addEventListener('mousedown', function (evt) {
    playSound('soundClick')
    goPage('game')
  })

  iconFacebook.cursor = 'pointer'
  iconFacebook.addEventListener('click', function (evt) {
    share('facebook')
  })
  iconTwitter.cursor = 'pointer'
  iconTwitter.addEventListener('click', function (evt) {
    share('twitter')
  })
  iconWhatsapp.cursor = 'pointer'
  iconWhatsapp.addEventListener('click', function (evt) {
    share('whatsapp')
  })

  //confirm
  buttonConfirm.cursor = 'pointer'
  buttonConfirm.addEventListener('click', function (evt) {
    window.parent.postMessage('BACK', '*')
    playSound('soundClick')
    toggleConfirm(false)
    stopGame(true)
    goPage('main')
  })

  buttonCancel.cursor = 'pointer'
  buttonCancel.addEventListener('click', function (evt) {
    playSound('soundClick')
    toggleConfirm(false)
  })

  itemExit.addEventListener('click', function (evt) {})

  //options
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

  buttonSettings.cursor = 'pointer'
  buttonSettings.addEventListener('click', function (evt) {
    toggleOption()
  })

  buttonExit.cursor = 'pointer'
  buttonExit.addEventListener('click', function (evt) {
    toggleConfirm(true)
    toggleOption()
  })
}

function setupGameButton() {
  mainContainer.cursor = 'pointer'
  mainContainer.addEventListener('click', handlerMethod)
}

function removeGameButton() {
  mainContainer.cursor = null
  mainContainer.removeEventListener('click', handlerMethod)
}

function handlerMethod(evt) {
  switch (evt.type) {
    case 'click':
      if (buttonClickCon) {
        playSound('soundClick')
        goPage('game')
      }
      break
  }
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
  gameContainer.visible = false
  resultContainer.visible = false

  removeGameButton()
  stopAnimateButton(startButton)
  stopAnimateButton(buttonReplay)

  var targetContainer = ''
  switch (page) {
    case 'main':
      targetContainer = mainContainer
      setupGameButton()
      numberAnimateButton(startButton)

      if (playBackgroundMusic) playSound('music', true)
      break

    case 'game':
      targetContainer = gameContainer
      startGame()
      break

    case 'result':
      resultTxt.text = resultTxtShadow.text = resultText.replace('[NUMBER]', totalSolve)

      playSound('soundEnd')
      targetContainer = resultContainer
      stopGame()
      //setupGameButton();
      numberAnimateButton(buttonReplay)
      saveGame(totalSolve)

      buttonClickCon = false
      setTimeout(function () {
        buttonClickCon = true
      }, 1000)
      break
  }

  targetContainer.alpha = 0
  targetContainer.visible = true

  $(targetContainer).clearQueue().stop(true, true).animate({ alpha: 1 }, 500)

  resizeCanvas()
}

/*!
 *
 * START GAME - This is the function that runs to start play game
 *
 */
function startGame() {
  totalSolve = 0
  gameTimerLevelCount = timerCount
  startMath()
  gamePaused = false
}

/*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame() {
  gamePaused = true
  toggleGameTimer(false)

  if (typeof displayB == 'function') {
    displayB()
  }
}

/*!
 *
 * SAVE GAME - This is the function that runs to save game
 *
 */
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
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 *
 */
function numberAnimateButton(obj) {
  obj.alpha = 0
  $(obj)
    .animate({ alpha: 1 }, 500)
    .animate({ alpha: 0 }, 500, function () {
      numberAnimateButton(obj)
    })
}

/*!
 *
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 *
 */
function stopAnimateButton(obj) {
  obj.alpha = 0
  $(obj).clearQueue().stop(true, true)
}

/*!
 *
 * BUILD NEW GAME - This is the function that runs to build new game
 *
 */
var totalSolve = 0
var currentFormula = ''
var numberScale = 1
var numbersSequence_arr = []

$.mathsHolder = {}
$.mathsShadow = {}

var firstLine, secondLine

function buildMathCompleteGame() {
  firstLine = (canvasH / 100) * 50
  secondLine = (canvasH / 100) * 80

  mathsContainer.removeAllChildren()

  touchCon = true
  currentFormula = finalMath

  numberScale = 1
  numbersSequence_arr = []
  $.mathsHolder = {}
  $.mathsShadow = {}

  //add additional numbers
  if (currentFormula.length <= 3) {
    var additionalNum = 0
    for (n = 0; n < number_arr.length; n++) {
      currentFormula += number_arr[n]
      additionalNum++
      if (additionalNum >= 1) {
        n = number_arr.length
      }
    }
  }

  //generate numbers and symbols for formula
  for (n = 0; n < currentFormula.length; n++) {
    numbersSequence_arr.push(n)
    var curNumber = currentFormula.substring(n, n + 1)
    $.mathsHolder[n] = $.maths[curNumber].clone()
    $.mathsShadow[n] = $.maths[curNumber].clone()
    $.mathsShadow[n].filters = [new createjs.ColorFilter(0, 0, 0, 0.2, 0, 0, 0, 0)]
    $.mathsShadow[n].cache(
      0,
      0,
      $.mathsHolder[n].image.naturalWidth,
      $.mathsHolder[n].image.naturalHeight
    )
    $.mathsHolder[n].name = $.mathsShadow[n].name = n
    $.mathsHolder[n].math = curNumber
    mathsContainer.addChild($.mathsShadow[n], $.mathsHolder[n])

    buildDragAndDrop($.mathsHolder[n])
  }

  //generate numbers and symbols for answer
  answerWidth = 0
  var mathAnswer = '=' + String(eval(finalMath))
  for (n = 0; n < mathAnswer.length; n++) {
    var curNumber = mathAnswer.substring(n, n + 1)
    $.mathsHolder['answer' + n] = $.maths[curNumber].clone()
    $.mathsShadow['answer' + n] = $.maths[curNumber].clone()
    $.mathsShadow['answer' + n].filters = [new createjs.ColorFilter(0, 0, 0, 0.2, 0, 0, 0, 0)]
    $.mathsShadow['answer' + n].cache(
      0,
      0,
      $.mathsHolder['answer' + n].image.naturalWidth,
      $.mathsHolder['answer' + n].image.naturalHeight
    )
    $.mathsHolder['answer' + n].name = $.mathsShadow[n].name = 'answer' + n
    mathsContainer.addChild($.mathsShadow['answer' + n], $.mathsHolder['answer' + n])

    if (n == mathAnswer.length - 1) {
      answerWidth += $.mathsHolder['answer' + n].image.naturalWidth
    } else {
      answerWidth += $.mathsHolder['answer' + n].image.naturalWidth + numberSpacing
    }
  }

  //answer
  answerScale = 0.8
  while (answerWidth * answerScale > (canvasW / 100) * 50) {
    answerScale -= 0.05
  }

  var startX = canvasW / 2 - (answerWidth / 2) * answerScale
  for (n = 0; n < mathAnswer.length; n++) {
    startX += ($.mathsHolder['answer' + n].image.naturalWidth / 2) * answerScale

    $.mathsHolder['answer' + n].scaleX = $.mathsHolder['answer' + n].scaleY = answerScale
    $.mathsHolder['answer' + n].x = startX
    $.mathsHolder['answer' + n].y = secondLine
    $.mathsShadow['answer' + n].scaleX = $.mathsShadow['answer' + n].scaleY = answerScale
    $.mathsShadow['answer' + n].x = startX
    $.mathsShadow['answer' + n].y = $.mathsHolder['answer' + n].y + numberShadowY * numberScale
    startX += ($.mathsHolder['answer' + n].image.naturalWidth / 2 + numberSpacing) * answerScale

    $.mathsHolder['answer' + n].alpha = $.mathsShadow['answer' + n].alpha = 0
    $($.mathsHolder['answer' + n])
      .clearQueue()
      .stop(true, false)
      .animate({ alpha: 1 }, 500)

    $($.mathsShadow['answer' + n])
      .clearQueue()
      .stop(true, false)
      .animate({ alpha: 1 }, 500)
  }

  iconQuestionColour.alpha = iconQuestionShadow.alpha = 0
  setTimeout(function () {
    toggleQuestion(true)
  }, 1200)

  shuffleMaths()

  toggleGameTimer(false)
  toggleGameTimer(true)
  increaseTimerLevel()
}

/*!
 *
 * SHUFFLE MATHS - This is the function that runs to shuffle numbers and symbols
 *
 */
var randompos_arr = []

function shuffleMaths() {
  var startTopY = (canvasH / 100) * 10
  var endTopY = (canvasH / 100) * 25

  var numberBottomY = (canvasH / 100) * 80
  var endBottomY = (canvasH / 100) * 95

  randompos_arr = []
  var topNum = numbersSequence_arr.length / 2
  var bottomNum = numbersSequence_arr.length - topNum

  var maxRandomNum = 9
  var topW = canvasW / maxRandomNum
  for (n = 1; n < maxRandomNum; n++) {
    if (n != 5) {
      randompos_arr.push(topW * n)
    }
  }
  shuffle(randompos_arr)

  var odd = randomBoolean()
  for (n = 0; n < numbersSequence_arr.length; n++) {
    var targetID = numbersSequence_arr[n]
    var speed = (Math.random() * 3 + 5) * 100
    $.mathsHolder[targetID].x = canvasW / 2
    $.mathsHolder[targetID].y = firstLine

    if (isNaN($.mathsHolder[targetID].math)) {
      $.mathsHolder[targetID].newRotation = Math.random() * 40 - 20
    } else {
      $.mathsHolder[targetID].newRotation = Math.random() * 90 - 45
    }
    $.mathsHolder[targetID].newScaleX = $.mathsHolder[targetID].newScaleY = numberOutsideScale
    $.mathsHolder[targetID].newX = randompos_arr[n]
    $.mathsHolder[targetID].newY = startTopY + Math.random() * (endTopY - startTopY)

    $.mathsHolder[targetID].alpha = 0

    $($.mathsHolder[targetID]).clearQueue().stop(true, false).animate({ alpha: 0 }, 500).animate(
      {
        x: $.mathsHolder[targetID].newX,
        y: $.mathsHolder[targetID].newY,
        scaleX: $.mathsHolder[targetID].newScaleX,
        scaleY: $.mathsHolder[targetID].newScaleY,
        rotation: $.mathsHolder[targetID].newRotation,
        alpha: numberOutsideAlpha
      },
      speed
    )
  }
}

/*!
 *
 * DRAG AND DROP EVENTS - This is the function that runs to add drag and drop event
 *
 */
var touchCon = true
function buildDragAndDrop(obj) {
  obj.cursor = 'pointer'
  obj.addEventListener('mousedown', function (evt) {
    playSound('soundDrag')
    toggleDragEvent(evt, 'drag', touchCon)
  })
  obj.addEventListener('pressmove', function (evt) {
    toggleDragEvent(evt, 'move', touchCon)
  })
  obj.addEventListener('pressup', function (evt) {
    playSound('soundDrop')
    toggleDragEvent(evt, 'release', touchCon)
  })
}

function toggleDragEvent(obj, con, _touchCon) {
  if (_touchCon) {
    switch (con) {
      case 'drag':
        obj.target.parent.addChild($.mathsShadow[obj.target.name])
        obj.target.parent.addChild(obj.target)
        obj.target.offset = { x: obj.target.x - obj.stageX, y: obj.target.y - obj.stageY }

        cursorX = obj.stageX
        selectFollowID(obj.target.name)
        moveNumbers(obj.target.name, obj.target.x, false)

        setTimeout(function () {
          moveNumbers(obj.target.name, obj.target.x, true)
        }, 500)

        break

      case 'move':
        obj.target.x = obj.stageX + obj.target.offset.x
        obj.target.y = obj.stageY + obj.target.offset.y

        cursorX = obj.stageX
        moveNumbers(obj.target.name, obj.target.x, true)
        break

      case 'release':
        removeFollowID()
        moveNumbers(-1, obj.target.x, false)

        if (checkDragRange($.mathsHolder[obj.target.name])) {
          checkUserFormula()
        }
        break
    }
  }
}

/*!
 *
 * HIGHLIGHT AND MOVE NUMBERS - This is the function that runs to set highlight and numbers movement
 *
 */
var numbersStore_arr = []
function moveNumbers(id, mouseX, dragging) {
  numbersStore_arr = []
  for (n = 0; n < numbersSequence_arr.length; n++) {
    if (checkDragRange($.mathsHolder[numbersSequence_arr[n]])) {
      $.mathsHolder[numbersSequence_arr[n]].arrage = true
      if (dragging) {
        //push to store array without dragging letter
        if (id != numbersSequence_arr[n]) {
          numbersStore_arr.push({
            id: numbersSequence_arr[n],
            posX: $.mathsHolder[numbersSequence_arr[n]].x
          })
        }
      } else {
        //highlight dragging letter
        if (id == numbersSequence_arr[n]) {
          $.mathsHolder[numbersSequence_arr[n]].newScaleX = $.mathsHolder[
            numbersSequence_arr[n]
          ].newScaleY = numberScale + numberDragScale
        } else {
          $.mathsHolder[numbersSequence_arr[n]].newScaleX = $.mathsHolder[
            numbersSequence_arr[n]
          ].newScaleY = numberScale
        }

        //push to store array
        numbersStore_arr.push({
          id: numbersSequence_arr[n],
          posX: $.mathsHolder[numbersSequence_arr[n]].x
        })
      }
    } else {
      $.mathsHolder[numbersSequence_arr[n]].arrage = false
    }
  }

  //sort store array base on position x
  numbersStore_arr.sort(function (a, b) {
    var a1 = a.posX,
      b1 = b.posX
    if (a1 == b1) return 0
    return a1 > b1 ? 1 : -1
  })

  if (dragging) {
    //find sequence of dragging letter
    var targetSpaceID = 0
    for (n = 0; n < numbersStore_arr.length; n++) {
      if (id != numbersStore_arr[n].id) {
        if (mouseX < numbersStore_arr[n].posX) {
          targetSpaceID = n
          n = numbersStore_arr.length
        } else if (mouseX > numbersStore_arr[n].posX && n == numbersStore_arr.length - 1) {
          targetSpaceID = n + 1
        }
      }
    }

    //store new sequence to move array
    if (checkDragRange($.mathsHolder[id]))
      numbersStore_arr.splice(targetSpaceID, 0, { id: id, posX: $.mathsHolder[id].x })

    //get letters width
    getTotalWidth(-1)
  } else {
    //get letters width without dragging letter
    getTotalWidth(id)
  }

  var animateThrough = false
  var startX = canvasW / 2 - (wordWidth / 2) * numberScale

  //position letters without dragging letter
  for (n = 0; n < numbersStore_arr.length; n++) {
    var targetID = numbersStore_arr[n].id

    if (dragging) {
      startX += ($.mathsHolder[targetID].image.naturalWidth / 2) * numberScale

      if (id != targetID) {
        if (startX != $.mathsHolder[targetID].newX) {
          $.mathsHolder[targetID].newX = startX
          animateThrough = true
        }
      }

      startX += ($.mathsHolder[targetID].image.naturalWidth / 2 + numberSpacing) * numberScale
    } else {
      animateThrough = true
      if (id != targetID) {
        startX += ($.mathsHolder[targetID].image.naturalWidth / 2) * numberScale

        $.mathsHolder[targetID].newScaleX = $.mathsHolder[targetID].newScaleY = numberScale
        $.mathsHolder[targetID].newX = startX
        $.mathsHolder[targetID].newY = firstLine

        startX += ($.mathsHolder[targetID].image.naturalWidth / 2 + numberSpacing) * numberScale
      }
    }
  }

  if (animateThrough) animateNumbers(id)

  if (numbersStore_arr.length > 0) {
    toggleQuestion(false)
  } else {
    toggleQuestion(true)
  }
}

/*!
 *
 * DRAG RANGE - This is the function that runs to check drag range
 *
 */
function checkDragRange(obj) {
  var dragStartY = (canvasH / 100) * 30
  var dragEndY = (canvasH / 100) * 70

  if (obj.y > dragStartY && obj.y < dragEndY) {
    return true
  } else {
    return false
  }
}

/*!
 *
 * TOGGLE QUESTION MARK - This is the function that runs to toggle question mark
 *
 */
function toggleQuestion(con) {
  var alphaNum = con == true ? 1 : 0
  var alphaSpeed = 300

  $(iconQuestionColour).clearQueue().stop(true, false).animate({ alpha: alphaNum }, alphaSpeed)

  $(iconQuestionShadow).clearQueue().stop(true, false).animate({ alpha: alphaNum }, alphaSpeed)
}

/*!
 *
 * ANIMATE NUMBERS AND SYMBOLS - This is the function that runs to play numbers & symbols animation
 *
 */
function animateNumbers(id) {
  for (n = 0; n < numbersSequence_arr.length; n++) {
    var targetID = numbersSequence_arr[n]
    if ($.mathsHolder[numbersSequence_arr[n]].arrage) {
      //animate all except dragging
      if (id != targetID) {
        $($.mathsHolder[targetID]).clearQueue().stop(true, false).animate(
          {
            x: $.mathsHolder[targetID].newX,
            y: $.mathsHolder[targetID].newY,
            scaleX: $.mathsHolder[targetID].newScaleX,
            scaleY: $.mathsHolder[targetID].newScaleY,
            rotation: 0,
            alpha: 1,
            rotation: 0
          },
          500
        )

        $($.mathsShadow[targetID])
          .clearQueue()
          .stop(true, false)
          .animate(
            {
              x: $.mathsHolder[targetID].newX,
              y: $.mathsHolder[targetID].newY + numberShadowY * numberScale,
              rotation: 0,
              scaleX: $.mathsHolder[targetID].newScaleX,
              scaleY: $.mathsHolder[targetID].newScaleY
            },
            500
          )
      }
    }
  }
}

/*!
 *
 * GAME LOOP - This is the function that runs to loop the game
 *
 */
var easeSpeed = 10
var cursorX = 0
var tracedrag_arr = { x: 0 }
var followID = null

function updateGame() {
  if (followID != null) {
    var mouseSpeed = tracedrag_arr.x - cursorX
    $.mathsHolder[followID].rotation = 0 - Math.round((mouseSpeed / 100) * 30)
    tracedrag_arr.x += (cursorX - tracedrag_arr.x) / easeSpeed

    $.mathsShadow[followID].scaleY = $.mathsHolder[followID].scaleY
    $.mathsShadow[followID].scaleX = $.mathsHolder[followID].scaleX
    $.mathsShadow[followID].rotation = $.mathsHolder[followID].rotation
    $.mathsShadow[followID].x = $.mathsHolder[followID].x
    $.mathsShadow[followID].y = $.mathsHolder[followID].y + numberDragShadowY * numberScale
  }

  if (gameTimerUpdate) {
    nowDate = new Date()
    var elapsedTime = nowDate.getTime() - beforeDate.getTime()
    gameTimerCount = gameTimerAccumulate + Math.floor((elapsedTime / 1000) % 60)

    var duration = gameTimerMax * 2

    $(gameTimer)
      .clearQueue()
      .stop()
      .animate(
        { value: gameTimerCount },
        {
          duration: duration,
          step: function () {
            updateTimerIcon()
          }
        }
      )

    if (gameTimerCount >= gameTimerMax) {
      goPage('result')
    }

    var soundElapsedTime = nowDate.getTime() - soundDate.getTime()
    if (soundElapsedTime > 100) {
      soundDate = new Date()
      if (playTimerSound) {
        if (timerSoundNum > 0) {
          timerSoundNum--
        } else {
          var percent = gameTimerMax / 4
          if (gameTimerCount > percent * 3) {
            timerSoundNum = timerSoundMax - 6
          } else if (gameTimerCount > percent * 2) {
            timerSoundNum = timerSoundMax - 4
          } else if (gameTimerCount > percent) {
            timerSoundNum = timerSoundMax - 2
          } else {
            timerSoundNum = timerSoundMax
          }
          updateTimerSound()
        }
      }
    }
  }
}

/*!
 *
 * SELECT DRAG - This is the function that runs to select dragging numbers or symbols
 *
 */
function selectFollowID(targetID) {
  followID = targetID

  $($.mathsHolder[targetID])
    .clearQueue()
    .stop(true, false)
    .animate({ alpha: 1, scaleX: 1 + numberDragScale, scaleY: 1 + numberDragScale }, 500)

  $($.mathsShadow[followID]).clearQueue().stop(true, false).animate({ alpha: 1 }, 500)
}

/*!
 *
 * REMOVE DRAG - This is the function that runs to remove dragging numbers or symbols
 *
 */
function removeFollowID() {
  var range = 100
  var newX = $.mathsHolder[followID].x + (Math.random() * range - range / 2)
  var newY = $.mathsHolder[followID].y + (Math.random() * range - range / 2)
  var newRotation = Math.random() * range - range / 2

  $($.mathsHolder[followID]).clearQueue().stop(true, false).animate(
    {
      x: newX,
      y: newY,
      rotation: newRotation,
      alpha: numberOutsideAlpha,
      scaleX: numberOutsideScale,
      scaleY: numberOutsideScale
    },
    500
  )

  $($.mathsShadow[followID]).clearQueue().stop(true, false).animate(
    {
      x: newX,
      y: newY,
      rotation: newRotation,
      alpha: 0,
      scaleX: numberOutsideScale,
      scaleY: numberOutsideScale
    },
    500
  )

  followID = null
}

/*!
 *
 * CHECK USER FORMULA - This is the function that runs to check if equatation is correct.
 *
 */

function checkUserFormula() {
  var userFormula = ''
  var proceedAnswer = true

  //no continue symbol
  var symbolContinue = false
  for (n = 0; n < numbersStore_arr.length; n++) {
    userFormula += $.mathsHolder[numbersStore_arr[n].id].math
    if (isNaN($.mathsHolder[numbersStore_arr[n].id].math)) {
      if (!symbolContinue) {
        symbolContinue = true
      } else {
        proceedAnswer = false
      }
    } else {
      symbolContinue = false
    }
    if (n == 0) {
      if (
        $.mathsHolder[numbersStore_arr[n].id].math == '/' ||
        $.mathsHolder[numbersStore_arr[n].id].math == '*'
      ) {
        //no divide and multiply at first place
        proceedAnswer = false
      } else if (
        ($.mathsHolder[numbersStore_arr[n].id].math == '+' && numbersStore_arr.length == 1) ||
        ($.mathsHolder[numbersStore_arr[n].id].math == '-' && numbersStore_arr.length == 1)
      ) {
        //no plus and minus at last place
        proceedAnswer = false
      }
    } else if (n == numbersStore_arr.length - 1) {
      if (isNaN($.mathsHolder[numbersStore_arr[n].id].math)) {
        proceedAnswer = false
      }
    }
  }

  if (proceedAnswer) {
    if (eval(userFormula) == eval(finalMath)) {
      //correct answer
      totalSolve++
      if (totalSolve === 5 && !isPassMission) {
        isPassMission = true
        window.parent.postMessage('WIN', '*')
        return
      }

      touchCon = false
      toggleGameTimer(false)

      setTimeout(function () {
        animateCorrectMath()
      }, 500)

      setTimeout(function () {
        startMath()
      }, 2500)
    } else {
      //wrong answer
      if (userFormula != '') {
        buildWrongAnswer(Math.floor(eval(userFormula)))
      }
    }
  } else {
    //wrong answer
    buildWrongAnswer(0)
  }
}

/*!
 *
 * BUILD WRONG ANSWER - This is the function that runs to build wrong numbers and symbols
 *
 */
var curWrongNumber = ''
function buildWrongAnswer(number) {
  playSound('soundWhoosh')

  curWrongNumber = String(number)

  var startX =
    $.mathsHolder['answer0'].x +
    ($.mathsHolder['answer0'].image.naturalWidth / 2 + numberSpacing) * answerScale
  var startY = $.mathsHolder['answer0'].y

  for (n = 0; n < curWrongNumber.length; n++) {
    var curNumber = curWrongNumber.substring(n, n + 1)
    $.mathsHolder['wrong' + n] = $.maths[curNumber].clone()
    $.mathsHolder['wrong' + n].filters = [
      new createjs.ColorFilter(
        0,
        0,
        0,
        1,
        hexToRgb(wrongColour).r,
        hexToRgb(wrongColour).g,
        hexToRgb(wrongColour).b
      )
    ]
    $.mathsHolder['wrong' + n].cache(
      0,
      0,
      $.mathsHolder['wrong' + n].image.naturalWidth,
      $.mathsHolder['wrong' + n].image.naturalHeight
    )
    $.mathsShadow['wrong' + n] = $.maths[curNumber].clone()
    $.mathsShadow['wrong' + n].filters = [new createjs.ColorFilter(0, 0, 0, 0.2, 0, 0, 0, 0)]
    $.mathsShadow['wrong' + n].cache(
      0,
      0,
      $.mathsHolder['wrong' + n].image.naturalWidth,
      $.mathsHolder['wrong' + n].image.naturalHeight
    )
    $.mathsHolder['wrong' + n].name = $.mathsShadow[n].name = 'wrong' + n
    mathsContainer.addChild($.mathsShadow['wrong' + n], $.mathsHolder['wrong' + n])

    $.mathsHolder['wrong' + n].alpha = 0
    $.mathsShadow['wrong' + n].alpha = 0

    startX += ($.mathsHolder['wrong' + n].image.naturalWidth / 2) * answerScale
    $.mathsHolder['wrong' + n].scaleX = $.mathsHolder['wrong' + n].scaleY = answerScale
    $.mathsShadow['wrong' + n].scaleX = $.mathsShadow['wrong' + n].scaleY = answerScale
    $.mathsHolder['wrong' + n].x = startX
    $.mathsHolder['wrong' + n].y = startY
    $.mathsShadow['wrong' + n].x = startX
    $.mathsShadow['wrong' + n].y = startY + numberShadowY * numberScale
    startX += ($.mathsHolder['wrong' + n].image.naturalWidth / 2 + numberSpacing) * answerScale
  }

  animateWrongAnswer()
}

/*!
 *
 * WRONG ANSWER ANIMATION - This is the function that runs for wrong answer animation
 *
 */
function animateWrongAnswer() {
  var alphaInSpeed = 300
  var alphaStaySpeed = 100
  var alphaOutSpeed = 800

  var mathAnswer = '=' + String(eval(finalMath))
  for (n = 1; n < mathAnswer.length; n++) {
    $($.mathsHolder['answer' + n])
      .clearQueue()
      .stop(true, false)
      .animate({ alpha: 0 }, alphaInSpeed)
      .animate({ alpha: 0 }, alphaStaySpeed)
      .animate({ alpha: 1 }, alphaOutSpeed)

    $($.mathsShadow['answer' + n])
      .clearQueue()
      .stop(true, false)
      .animate({ alpha: 0 }, alphaInSpeed)
      .animate({ alpha: 0 }, alphaStaySpeed)
      .animate({ alpha: 1 }, alphaOutSpeed)
  }

  for (n = 0; n < curWrongNumber.length; n++) {
    $($.mathsHolder['wrong' + n])
      .clearQueue()
      .stop(true, false)
      .animate({ alpha: 1 }, alphaInSpeed)
      .animate({ alpha: 1 }, alphaStaySpeed)
      .animate({ alpha: 0 }, alphaOutSpeed)

    $($.mathsShadow['wrong' + n])
      .clearQueue()
      .stop(true, false)
      .animate({ alpha: 1 }, alphaInSpeed)
      .animate({ alpha: 1 }, alphaStaySpeed)
      .animate({ alpha: 0 }, alphaOutSpeed)
  }
}

/*!
 *
 * RIGHT ANSWER ANIMATION - This is the function that runs for right answer animation
 *
 */
function animateCorrectMath() {
  var animateSpeed = 350
  var focusScale = 0.3

  playSound('soundNote1')

  setTimeout(function () {
    playSound('soundNote2')
  }, 400)

  setTimeout(function () {
    playSound('soundNote3')
  }, 750)

  for (n = 0; n < numbersStore_arr.length; n++) {
    var targetID = numbersStore_arr[n].id
    $($.mathsHolder[targetID])
      .clearQueue()
      .stop(true, false)
      .animate({ scaleX: numberScale + focusScale, scaleY: numberScale + focusScale }, animateSpeed)
      .animate({ scaleX: numberScale, scaleY: numberScale }, animateSpeed)
      .animate({ scaleX: numberScale, scaleY: numberScale }, animateSpeed)
      .animate({ scaleX: numberScale, scaleY: numberScale }, animateSpeed)

    $($.mathsShadow[targetID])
      .clearQueue()
      .stop(true, false)
      .animate({ scaleX: numberScale + focusScale, scaleY: numberScale + focusScale }, animateSpeed)
      .animate({ scaleX: numberScale, scaleY: numberScale }, animateSpeed)
      .animate({ scaleX: numberScale, scaleY: numberScale }, animateSpeed)
      .animate({ scaleX: numberScale, scaleY: numberScale }, animateSpeed)
  }

  var mathAnswer = '=' + String(eval(finalMath))
  for (n = 0; n < mathAnswer.length; n++) {
    $.mathsHolder['answer' + n].alpha = 1
    $.mathsShadow['answer' + n].alpha = 1

    if (n == 0) {
      $($.mathsHolder['answer' + n])
        .clearQueue()
        .stop(true, false)
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
        .animate(
          { scaleX: answerScale + focusScale, scaleY: answerScale + focusScale },
          animateSpeed
        )
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)

      $($.mathsShadow['answer' + n])
        .clearQueue()
        .stop(true, false)
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
        .animate(
          { scaleX: answerScale + focusScale, scaleY: answerScale + focusScale },
          animateSpeed
        )
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
    } else {
      $($.mathsHolder['answer' + n])
        .clearQueue()
        .stop(true, false)
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
        .animate(
          { scaleX: answerScale + focusScale, scaleY: answerScale + focusScale },
          animateSpeed
        )
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)

      $($.mathsShadow['answer' + n])
        .clearQueue()
        .stop(true, false)
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
        .animate(
          { scaleX: answerScale + focusScale, scaleY: answerScale + focusScale },
          animateSpeed
        )
        .animate({ scaleX: answerScale, scaleY: answerScale }, animateSpeed)
    }
  }
}

/*!
 *
 * GET TOTAL WIDTH - This is the function that runs to get total numbers and symbols width
 *
 */
function getTotalWidth(id) {
  wordWidth = 0
  for (n = 0; n < numbersStore_arr.length; n++) {
    var targetID = numbersStore_arr[n].id
    if (id != targetID) {
      if (n == numbersStore_arr.length - 1) {
        //last word without spacing
        wordWidth += $.mathsHolder[targetID].image.naturalWidth
      } else {
        wordWidth += $.mathsHolder[targetID].image.naturalWidth + numberSpacing
      }
    }
  }

  numberScale = 1
  while (wordWidth * numberScale > (canvasW / 100) * 80) {
    numberScale -= 0.05
  }
}

/*!
 *
 * GAME TIMER - This is the function that runs for game timer
 *
 */
var gameTimerUpdate = false
var gameTimerCount = 0
var gameTimerMax = 0
var gameTimerLevelCount = 0
var gameTimer = { value: 0 }
var gameTimerAccumulate = 0

var timerSoundNum = 0
var timerSoundMax = 10

var nowDate
var beforeDate
var soundDate

function toggleGameTimer(con) {
  if (con) {
    beforeDate = new Date()
    soundDate = new Date()
    gameTimer.value = 0
    gameTimerAccumulate = 0
    gameTimerMax = gameTimerLevelCount
  }
  gameTimerUpdate = con
}

function toggleGameTimerPause(con) {
  if (con) {
    gameTimerAccumulate = gameTimerCount
    gameTimerUpdate = false

    $(gameTimer).clearQueue().stop()
  } else {
    beforeDate = new Date()
    soundDate = new Date()
    gameTimerUpdate = true
  }
}

function increaseTimerLevel() {
  gameTimerLevelCount -= timerIncrease
}

/*!
 *
 * TIMER ICON - This is the function that runs to draw timer icon
 *
 */
function updateTimerIcon() {
  iconTimer.graphics.clear()
  iconTimer.graphics.beginFill(timerCircleColour)

  iconTimerShadow.graphics.clear()
  iconTimerShadow.graphics.beginFill('#000000')

  var numberAngle = Number(-1.55 - Math.PI * 2 * ((gameTimerMax - gameTimer.value) / gameTimerMax))
  var endAngle = Number(
    numberAngle + Math.PI * 2 * ((gameTimerMax - gameTimer.value) / gameTimerMax)
  )

  iconTimer.graphics
    .moveTo(0, 0)
    .arc(0, 0, timerCicleWidth, numberAngle, endAngle, false)
    .lineTo(0, 0)
    .closePath()
  iconTimerShadow.graphics
    .moveTo(0, 0)
    .arc(0, 0, timerCicleWidth, numberAngle, endAngle, false)
    .lineTo(0, 0)
    .closePath()
}

function updateTimerSound() {
  playSound('soundTimer')
}

/*!
 *
 * START FORMULA - This is the function that runs to start new formula
 *
 */
var numberCount = 0
var number_arr = []

var formula_arr = []
var symbolCount = 0
var symbol_arr = []
var excludeSymbol = []

var finalMath = 0
var doubleNumber = false

function startMath() {
  //generate numbers
  numberCount = 0
  number_arr = []
  for (n = 1; n < 10; n++) {
    number_arr.push(n)
  }

  //randomize numbers
  shuffle(number_arr)

  excludeSymbol = []
  getSymbol(true)
  doubleNumber = false
  finalMath = buildMathComplete()

  checkMath()
}

/*!
 *
 * CHECK FORMULA - This is the function that runs to check new formula
 *
 */
function checkMath() {
  var finalAnswer = eval(finalMath)
  var proceedGame = true
  if (String(finalAnswer).indexOf('.') != -1) {
    //no decimal
    proceedGame = false
  } else if (isNaN(finalAnswer)) {
    //must be number
    proceedGame = false
  } else {
    for (n = 0; n < finalMath.length; n++) {
      var curNumber = finalMath.substring(n, n + 1)
      if (curNumber == finalAnswer) {
        //no repeat number in answer
        proceedGame = false
      }
    }
  }

  if (proceedGame) {
    buildMathCompleteGame()
  } else {
    startMath()
  }
}

/*!
 *
 * BUILD FORMULA - This is the function that runs to build formula group
 *
 */
function buildMathComplete() {
  var finalMath = ''
  var loopAnswer = 0

  while (loopAnswer <= 0) {
    for (n = 0; n < maxSymbols; n++) {
      formula_arr[n] = buildMathSinglePart()
    }
    finalMath = formula_arr[0]
    for (p = 1; p < maxSymbols; p++) {
      finalMath += getSymbol() + formula_arr[p]
    }
    loopAnswer = eval(finalMath)
    doubleNumber = false
  }
  return finalMath
}

/*!
 *
 * FORMULA PART - This is the function that runs to build formula part
 *
 */
function buildMathSinglePart() {
  var symbol = ''
  var numberA = 0
  var numberB = 0
  var question = ''
  var singleNumber = randomBoolean()
  singleNumber = doubleNumber == true ? true : singleNumber

  if (singleNumber) {
    numberA = getNumber()
    question = numberA

    removeNumber(numberA)
  } else {
    doubleNumber = true
    var loopAnswer = 0
    while (loopAnswer <= 0) {
      symbol = getSymbol()
      numberA = getNumber()
      numberB = getNumber()

      if (symbol == '/') {
        buildDivide()
        if (divideResult_arr.length > 0) {
          var randomDivideNum = Math.floor(Math.random() * divideResult_arr.length)
          numberA = divideResult_arr[randomDivideNum].a
          numberB = divideResult_arr[randomDivideNum].b
        }
      }

      if (includeBracket) {
        if (symbol == '*') {
          if (randomBoolean()) {
            question = '(' + numberA + symbol + numberB + ')'
          } else {
            question = numberA + symbol + numberB
          }
        } else {
          question = numberA + symbol + numberB
        }
      } else {
        question = numberA + symbol + numberB
      }
      loopAnswer = eval(question)
    }
    removeNumber(numberA)
    removeNumber(numberB)
  }
  return question
}

/*!
 *
 * DIVIDE FORMULA - This is the function that runs to build dividation formula
 *
 */
var divideResult_arr = []
function buildDivide() {
  divideResult_arr = []
  var divideNumber_arr = number_arr
  divideNumber_arr.sort(function (a, b) {
    return b - a
  })

  for (d = 0; d < divideNumber_arr.length; d++) {
    for (t = 0; t < number_arr.length; t++) {
      //if numberA is not 1
      if (divideNumber_arr[d] != 1) {
        //if numberB is not 1
        if (number_arr[t] != 1) {
          var divideAnswer = divideNumber_arr[d] / number_arr[t]
          //no decimal and not 1
          if (String(divideAnswer).indexOf('.') == -1 && divideAnswer != 1) {
            divideResult_arr.push({ a: divideNumber_arr[d], b: number_arr[t] })
          }
        }
      }
    }
  }
}

/*!
 *
 * ADDITIONAL FORMULA FUNCTION - This is the function that runs for additional formula function
 *
 */
function getNumber() {
  var curNumber = number_arr[numberCount]
  numberCount++
  return curNumber
}

function removeNumber(number) {
  number_arr.splice(number_arr.indexOf(number), 1)
}

function getSymbol(con) {
  symbolCount++
  if (symbolCount >= symbol_arr.length - 1) {
    con = true
  }

  if (con) {
    //generate new formula symbols
    symbolCount = 0
    symbol_arr = mathSymbol_arr
    shuffle(symbol_arr)
    for (n = 0; n < excludeSymbol.length; n++) {
      symbol_arr.splice(symbol_arr.indexOf(excludeSymbol[n]), 1)
    }
  }

  symbolCount++
  if (symbol_arr[symbolCount] == '*' && showMultiplyOnce) {
    //only one multiply
    excludeSymbol.push('*')
  }
  return symbol_arr[symbolCount]
}

/*!
 *
 * CONFIRM - This is the function that runs to toggle confirm
 *
 */
function toggleConfirm(con) {
  confirmContainer.visible = con
  gamePaused = con
  toggleGameTimerPause(con)
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
  var title = shareTitle.replace('[SCORE]', totalSolve)
  var text = shareMessage.replace('[SCORE]', totalSolve)
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
