////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW = 0
var canvasH = 0

/*!
 *
 * START GAME CANVAS - This is the function that runs to setup game canvas
 *
 */
function initGameCanvas(w, h) {
  try {
    var gameCanvas = document.getElementById('gameCanvas')
    gameCanvas.width = w
    gameCanvas.height = h

    canvasW = w
    canvasH = h
    stage = new createjs.Stage('gameCanvas')

    createjs.Touch.enable(stage)
    stage.enableMouseOver(20)
    stage.mouseMoveOutside = true

    createjs.Ticker.framerate = 60
    createjs.Ticker.addEventListener('tick', tick)
  } catch (ex) {
    alert(ex)
  }
}

var guide = false
var canvasContainer,
  mainContainer,
  gameContainer,
  instructionContainer,
  mapContainer,
  objectsContainer,
  resultContainer,
  scoreContainer,
  moveContainer,
  confirmContainer
var guideline,
  bg,
  logo,
  buttonOk,
  result,
  shadowResult,
  buttonReplay,
  buttonFacebook,
  buttonTwitter,
  buttonWhatsapp,
  buttonFullscreen,
  buttonSoundOn,
  buttonSoundOff

$.select = {}
$.puzzle = {}
$.puzzleCircle = {}

/*!
 *
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 *
 */
function buildGameCanvas() {
  canvasContainer = new createjs.Container()
  mainContainer = new createjs.Container()
  selectContainer = new createjs.Container()
  selectPuzzleContainer = new createjs.Container()
  gameContainer = new createjs.Container()
  displayContainer = new createjs.Container()
  statusContainer = new createjs.Container()
  statusMoveContainer = new createjs.Container()
  puzzleContainer = new createjs.Container()
  puzzleCircleContainer = new createjs.Container()
  resultContainer = new createjs.Container()
  confirmContainer = new createjs.Container()

  bg = new createjs.Bitmap(loader.getResult('background'))
  bgP = new createjs.Bitmap(loader.getResult('backgroundP'))
  logo = new createjs.Bitmap(loader.getResult('logo'))
  centerReg(logo)

  buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'))
  centerReg(buttonStart)

  buttonChallenge = new createjs.Bitmap(loader.getResult('buttonChallenge'))
  centerReg(buttonChallenge)

  //select
  buttonSelect = new createjs.Bitmap(loader.getResult('buttonSelect'))
  centerReg(buttonSelect)

  buttonLeft = new createjs.Bitmap(loader.getResult('buttonLeft'))
  centerReg(buttonLeft)

  buttonRight = new createjs.Bitmap(loader.getResult('buttonRight'))
  centerReg(buttonRight)

  for (var n = 0; n < cateogyr_arr.length; n++) {
    $.select[n] = new createjs.Bitmap(loader.getResult('category' + n))
    centerReg($.select[n])
    selectPuzzleContainer.addChild($.select[n])
  }
  selectContainer.addChild(selectPuzzleContainer, buttonSelect, buttonLeft, buttonRight)

  //game
  for (var n = 0; n < puzzles_arr.length; n++) {
    $.puzzle[n] = new createjs.Bitmap(loader.getResult('puzzle' + n))
    centerReg($.puzzle[n])

    //puzzleContainer.addChild($.puzzle[n]);
  }

  puzzleStroke = new createjs.Shape()

  gamebg = new createjs.Bitmap(loader.getResult('background'))
  gamebgP = new createjs.Bitmap(loader.getResult('backgroundP'))

  itemDisplay = new createjs.Bitmap(loader.getResult('itemDisplay'))

  stageTxt = new createjs.Text()
  stageTxt.font = '42px the_bold_fontbold'
  stageTxt.color = '#0071CE'
  stageTxt.textAlign = 'center'
  stageTxt.textBaseline = 'alphabetic'
  stageTxt.text = '1/2'

  timerTxt = new createjs.Text()
  timerTxt.font = '30px the_bold_fontbold'
  timerTxt.color = '#fff'
  timerTxt.textAlign = 'center'
  timerTxt.textBaseline = 'alphabetic'
  timerTxt.text = '1/2'

  modeTxt = new createjs.Text()
  modeTxt.font = '18px the_bold_fontbold'
  modeTxt.color = '#0071CE'
  modeTxt.textAlign = 'center'
  modeTxt.textBaseline = 'alphabetic'
  modeTxt.text = '1/2'

  stageTxt.x = timerTxt.x = modeTxt.x = 68
  stageTxt.y = 52
  timerTxt.y = 100
  modeTxt.y = 138

  displayContainer.addChild(itemDisplay, stageTxt, timerTxt, modeTxt)

  itemStatusComplete = new createjs.Bitmap(loader.getResult('itemStatusComplete'))
  centerReg(itemStatusComplete)
  itemStatusOver = new createjs.Bitmap(loader.getResult('itemStatusOver'))
  centerReg(itemStatusOver)

  statusMoveContainer.addChild(itemStatusOver, itemStatusComplete)
  statusContainer.addChild(statusMoveContainer)

  //result
  itemResult = new createjs.Bitmap(loader.getResult('itemResult'))
  itemResultP = new createjs.Bitmap(loader.getResult('itemResultP'))

  buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'))
  centerReg(buttonContinue)

  resultShareTxt = new createjs.Text()
  resultShareTxt.font = '25px the_bold_fontbold'
  resultShareTxt.color = '#55879B'
  resultShareTxt.textAlign = 'center'
  resultShareTxt.textBaseline = 'alphabetic'
  resultShareTxt.text = textDisplay.share

  resultTitleTxt = new createjs.Text()
  resultTitleTxt.font = '48px the_bold_fontbold'
  resultTitleTxt.color = '#fff'
  resultTitleTxt.textAlign = 'center'
  resultTitleTxt.textBaseline = 'alphabetic'
  resultTitleTxt.text = 'TITLE'

  resultDescTxt = new createjs.Text()
  resultDescTxt.font = '40px the_bold_fontbold'
  resultDescTxt.lineHeight = 40
  resultDescTxt.color = '#fff'
  resultDescTxt.textAlign = 'center'
  resultDescTxt.textBaseline = 'alphabetic'
  resultDescTxt.text = ''

  buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'))
  buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'))
  buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'))
  centerReg(buttonFacebook)
  createHitarea(buttonFacebook)
  centerReg(buttonTwitter)
  createHitarea(buttonTwitter)
  centerReg(buttonWhatsapp)
  createHitarea(buttonWhatsapp)

  buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'))
  centerReg(buttonFullscreen)
  buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'))
  centerReg(buttonSoundOn)
  buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'))
  centerReg(buttonSoundOff)
  buttonSoundOn.visible = false

  buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'))
  centerReg(buttonExit)
  buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'))
  centerReg(buttonSettings)

  createHitarea(buttonFullscreen)
  createHitarea(buttonSoundOn)
  createHitarea(buttonSoundOff)
  createHitarea(buttonExit)
  createHitarea(buttonSettings)
  optionsContainer = new createjs.Container()
  optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit)
  optionsContainer.visible = false

  //exit
  itemExit = new createjs.Bitmap(loader.getResult('itemExit'))
  itemExitP = new createjs.Bitmap(loader.getResult('itemExitP'))

  buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'))
  centerReg(buttonConfirm)

  buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'))
  centerReg(buttonCancel)

  popTitleTxt = new createjs.Text()
  popTitleTxt.font = '60px the_bold_fontbold'
  popTitleTxt.color = '#fff'
  popTitleTxt.textAlign = 'center'
  popTitleTxt.textBaseline = 'alphabetic'
  popTitleTxt.text = textDisplay.exitTitle

  popDescTxt = new createjs.Text()
  popDescTxt.font = '40px the_bold_fontbold'
  popDescTxt.color = '#fff'
  popDescTxt.textAlign = 'center'
  popDescTxt.textBaseline = 'alphabetic'
  popDescTxt.text = textDisplay.exitMessage

  confirmContainer.addChild(
    itemExit,
    itemExitP,
    popTitleTxt,
    popDescTxt,
    buttonConfirm,
    buttonCancel
  )
  confirmContainer.visible = false

  if (guide) {
    guideline = new createjs.Shape()
    guideline.graphics
      .setStrokeStyle(2)
      .beginStroke('red')
      .drawRect((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH)
  }

  mainContainer.addChild(logo, buttonStart, buttonChallenge)
  puzzleContainer.addChild(puzzleCircleContainer, puzzleStroke)
  gameContainer.addChild(puzzleContainer, gamebg, gamebgP, displayContainer, statusContainer)
  resultContainer.addChild(itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt)

  if (shareEnable) {
    resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp)
  }

  canvasContainer.addChild(
    bg,
    bgP,
    mainContainer,
    selectContainer,
    gameContainer,
    resultContainer,
    confirmContainer,
    optionsContainer,
    buttonSettings,
    guideline
  )
  stage.addChild(canvasContainer)

  changeViewport(viewport.isLandscape)
  resizeGameFunc()
}

function changeViewport(isLandscape) {
  if (isLandscape) {
    //landscape
    stageW = landscapeSize.w
    stageH = landscapeSize.h
    contentW = landscapeSize.cW
    contentH = landscapeSize.cH
  } else {
    //portrait
    stageW = portraitSize.w
    stageH = portraitSize.h
    contentW = portraitSize.cW
    contentH = portraitSize.cH
  }

  gameCanvas.width = stageW
  gameCanvas.height = stageH

  canvasW = stageW
  canvasH = stageH

  changeCanvasViewport()
}

function changeCanvasViewport() {
  if (canvasContainer != undefined) {
    selectPuzzleContainer.x = canvasW / 2
    selectPuzzleContainer.y = (canvasH / 100) * 45

    puzzleContainer.x = canvasW / 2
    puzzleContainer.y = canvasH / 2

    statusContainer.x = canvasW / 2
    statusContainer.y = canvasH / 2

    if (viewport.isLandscape) {
      bg.visible = true
      bgP.visible = false

      logo.x = canvasW / 2
      logo.y = (canvasW / 100) * 22

      buttonStart.x = canvasW / 2
      buttonStart.y = (canvasH / 100) * 68

      buttonChallenge.x = canvasW / 2
      buttonChallenge.y = (canvasH / 100) * 80

      //select
      buttonSelect.x = canvasW / 2
      buttonSelect.y = (canvasH / 100) * 78

      buttonLeft.x = canvasW / 2 - 200
      buttonLeft.y = (canvasH / 100) * 78

      buttonRight.x = canvasW / 2 + 200
      buttonRight.y = (canvasH / 100) * 78

      //game
      gamebg.visible = true
      gamebgP.visible = false

      //result
      itemResult.visible = true
      itemResultP.visible = false

      buttonFacebook.x = (canvasW / 100) * 43
      buttonFacebook.y = (canvasH / 100) * 62
      buttonTwitter.x = canvasW / 2
      buttonTwitter.y = (canvasH / 100) * 62
      buttonWhatsapp.x = (canvasW / 100) * 57
      buttonWhatsapp.y = (canvasH / 100) * 62

      buttonContinue.x = canvasW / 2
      buttonContinue.y = (canvasH / 100) * 75

      resultShareTxt.x = canvasW / 2
      resultShareTxt.y = (canvasH / 100) * 56

      resultTitleTxt.x = canvasW / 2
      resultTitleTxt.y = (canvasH / 100) * 30

      resultDescTxt.x = canvasW / 2
      resultDescTxt.y = (canvasH / 100) * 42

      //exit
      itemExit.visible = true
      itemExitP.visible = false

      buttonConfirm.x = canvasW / 2 - 150
      buttonConfirm.y = (canvasH / 100) * 68

      buttonCancel.x = canvasW / 2 + 150
      buttonCancel.y = (canvasH / 100) * 68

      popTitleTxt.x = canvasW / 2
      popTitleTxt.y = (canvasH / 100) * 38

      popDescTxt.x = canvasW / 2
      popDescTxt.y = (canvasH / 100) * 45
    } else {
      bg.visible = false
      bgP.visible = true

      logo.x = canvasW / 2
      logo.y = (canvasW / 100) * 52

      buttonStart.x = canvasW / 2
      buttonStart.y = (canvasH / 100) * 68

      buttonChallenge.x = canvasW / 2
      buttonChallenge.y = (canvasH / 100) * 77

      //select
      buttonSelect.x = canvasW / 2
      buttonSelect.y = (canvasH / 100) * 78

      buttonLeft.x = canvasW / 2 - 200
      buttonLeft.y = (canvasH / 100) * 78

      buttonRight.x = canvasW / 2 + 200
      buttonRight.y = (canvasH / 100) * 78

      //game
      gamebg.visible = false
      gamebgP.visible = true

      //result
      itemResult.visible = false
      itemResultP.visible = true

      buttonFacebook.x = (canvasW / 100) * 39
      buttonFacebook.y = (canvasH / 100) * 62
      buttonTwitter.x = canvasW / 2
      buttonTwitter.y = (canvasH / 100) * 62
      buttonWhatsapp.x = (canvasW / 100) * 61
      buttonWhatsapp.y = (canvasH / 100) * 62

      buttonContinue.x = canvasW / 2
      buttonContinue.y = (canvasH / 100) * 75

      resultShareTxt.x = canvasW / 2
      resultShareTxt.y = (canvasH / 100) * 56

      resultTitleTxt.x = canvasW / 2
      resultTitleTxt.y = (canvasH / 100) * 30

      resultDescTxt.x = canvasW / 2
      resultDescTxt.y = (canvasH / 100) * 42

      //exit
      itemExit.visible = false
      itemExitP.visible = true

      buttonConfirm.x = canvasW / 2
      buttonConfirm.y = (canvasH / 100) * 60

      buttonCancel.x = canvasW / 2
      buttonCancel.y = (canvasH / 100) * 70

      popTitleTxt.x = canvasW / 2
      popTitleTxt.y = (canvasH / 100) * 38

      popDescTxt.x = canvasW / 2
      popDescTxt.y = (canvasH / 100) * 45
    }
  }
}

/*!
 *
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 *
 */
function resizeCanvas() {
  if (canvasContainer != undefined) {
    buttonSettings.x = canvasW - offset.x - 50
    buttonSettings.y = offset.y + 45

    displayContainer.x = offset.x + 50
    displayContainer.y = offset.y + 20

    var distanceNum = 58
    if (curPage != 'game') {
      buttonExit.visible = false
      buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum
      buttonSoundOn.x = buttonSoundOff.x
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum

      buttonFullscreen.x = buttonSettings.x
      buttonFullscreen.y = buttonSettings.y + distanceNum * 2
    } else {
      buttonExit.visible = true
      buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum
      buttonSoundOn.x = buttonSoundOff.x
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum

      buttonFullscreen.x = buttonSettings.x
      buttonFullscreen.y = buttonSettings.y + distanceNum * 2

      buttonExit.x = buttonSettings.x
      buttonExit.y = buttonSettings.y + distanceNum * 3
    }
  }
}

/*!
 *
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 *
 */
function removeGameCanvas() {
  stage.autoClear = true
  stage.removeAllChildren()
  stage.update()
  createjs.Ticker.removeEventListener('tick', tick)
  createjs.Ticker.removeEventListener('tick', stage)
}

/*!
 *
 * CANVAS LOOP - This is the function that runs for canvas loop
 *
 */
function tick(event) {
  updateGame()
  stage.update(event)
}

/*!
 *
 * CANVAS MISC FUNCTIONS
 *
 */
function centerReg(obj) {
  obj.regX = obj.image.naturalWidth / 2
  obj.regY = obj.image.naturalHeight / 2
}

function createHitarea(obj) {
  obj.hitArea = new createjs.Shape(
    new createjs.Graphics()
      .beginFill('#000')
      .drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight)
  )
}
