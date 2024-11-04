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
  canvasW = w
  canvasH = h
  stage = new createjs.Stage('gameCanvas')

  createjs.Touch.enable(stage)
  stage.enableMouseOver(20)
  stage.mouseMoveOutside = true

  createjs.Ticker.framerate = 60
  createjs.Ticker.addEventListener('tick', tick)
}

var canvasContainer, mainContainer, gameContainer, mathsContainer, resultContainer
var bg,
  logo,
  startButton,
  buttonReplay,
  dragArea,
  iconTimer,
  iconTimerShadow,
  iconQuestion,
  iconQuestionColour,
  iconQuestionShadow,
  resultTxtShadow,
  resultTxt,
  iconFacebook,
  iconTwitter,
  iconWhatsapp,
  shareTxt
$.maths = {}

/*!
 *
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 *
 */
function buildGameCanvas() {
  canvasContainer = new createjs.Container()
  mainContainer = new createjs.Container()
  gameContainer = new createjs.Container()
  mathsContainer = new createjs.Container()
  resultContainer = new createjs.Container()
  confirmContainer = new createjs.Container()
  optionsContainer = new createjs.Container()

  bg = new createjs.Shape()
  bg.graphics.beginFill(bgColour).drawRect(0, 0, canvasW, canvasH)

  logo = new createjs.Bitmap(loader.getResult('logo'))
  centerReg(logo)
  logo.x = canvasW / 2
  logo.y = canvasH / 2

  for (n = 0; n < maths_arr.length; n++) {
    $.maths[maths_arr[n]] = new createjs.Bitmap(loader.getResult(maths_arr[n]))
    $.maths[maths_arr[n]].x = -500
    createHitarea($.maths[maths_arr[n]])
    centerReg($.maths[maths_arr[n]])
    mainContainer.addChild($.maths[maths_arr[n]])
  }

  startButton = new createjs.Text()
  startButton.font = '30px odin'
  startButton.color = '#ffffff'
  startButton.text = startButtonText
  startButton.textAlign = 'center'
  startButton.textBaseline = 'alphabetic'
  startButton.x = canvasW / 2
  startButton.y = (canvasH / 100) * 77

  buttonReplay = new createjs.Text()
  buttonReplay.font = '30px odin'
  buttonReplay.color = '#ffffff'
  buttonReplay.text = buttonReplayText
  buttonReplay.textAlign = 'center'
  buttonReplay.textBaseline = 'alphabetic'
  buttonReplay.x = canvasW / 2
  buttonReplay.y = (canvasH / 100) * 58
  buttonReplay.hitArea = new createjs.Shape(
    new createjs.Graphics().beginFill('#000').drawRect(-200, -30, 400, 40)
  )

  iconTimer = new createjs.Shape()
  iconTimer.x = canvasW / 2
  iconTimer.y = (canvasH / 100) * 25
  iconTimer.scaleX = -1

  iconTimerShadow = new createjs.Shape()
  iconTimerShadow.x = canvasW / 2
  iconTimerShadow.y = (canvasH / 100) * 26.5
  iconTimerShadow.scaleX = -1
  iconTimerShadow.alpha = 0.2

  dragArea = new createjs.Bitmap(loader.getResult('area'))
  centerReg(dragArea)
  dragArea.x = canvasW / 2
  dragArea.y = canvasH / 2

  var questionScale = 1
  iconQuestion = new createjs.Bitmap(loader.getResult('?'))
  centerReg(iconQuestion)
  iconQuestion.x = -500
  iconQuestion.y = -500

  iconQuestionColour = iconQuestion.clone()
  iconQuestionColour.filters = [
    new createjs.ColorFilter(
      0,
      0,
      0,
      1,
      hexToRgb(questionColour).r,
      hexToRgb(questionColour).g,
      hexToRgb(questionColour).b
    )
  ]
  iconQuestionColour.cache(0, 0, iconQuestion.image.naturalWidth, iconQuestion.image.naturalHeight)
  iconQuestionColour.x = canvasW / 2
  iconQuestionColour.y = canvasH / 2

  iconQuestionShadow = iconQuestion.clone()
  iconQuestionShadow.filters = [new createjs.ColorFilter(0, 0, 0, 0.2, 0, 0, 0, 0)]
  iconQuestionShadow.cache(0, 0, iconQuestion.image.naturalWidth, iconQuestion.image.naturalHeight)
  iconQuestionShadow.x = iconQuestionColour.x
  iconQuestionShadow.y = iconQuestionColour.y + numberShadowY * questionScale
  iconQuestion.scaleX =
    iconQuestion.scaleY =
    iconQuestionColour.scaleX =
    iconQuestionColour.scaleY =
    iconQuestionShadow.scaleX =
    iconQuestionShadow.scaleY =
      questionScale

  resultTxt = new createjs.Text()
  resultTxtShadow = new createjs.Text()
  resultTxt.font = resultTxtShadow.font = '100px odin'
  resultTxt.color = '#ffffff'
  resultTxtShadow.color = '#000000'
  resultTxt.text = resultTxtShadow.text = ''
  resultTxt.textAlign = resultTxtShadow.textAlign = 'center'
  resultTxt.textBaseline = resultTxtShadow.textBaseline = 'alphabetic'
  resultTxt.x = resultTxtShadow.x = canvasW / 2
  resultTxt.y = canvasH / 2
  resultTxtShadow.alpha = 0.2
  resultTxtShadow.y = (canvasH / 100) * 52

  shareTxt = new createjs.Text()
  shareTxt.font = '30px odin'
  shareTxt.color = '#ffffff'
  shareTxt.text = shareText
  shareTxt.textAlign = 'center'
  shareTxt.textBaseline = 'alphabetic'
  shareTxt.x = canvasW / 2
  shareTxt.y = (canvasH / 100) * 72

  iconFacebook = new createjs.Bitmap(loader.getResult('iconFacebook'))
  iconTwitter = new createjs.Bitmap(loader.getResult('iconTwitter'))
  iconWhatsapp = new createjs.Bitmap(loader.getResult('iconWhatsapp'))
  centerReg(iconFacebook)
  createHitarea(iconFacebook)
  centerReg(iconTwitter)
  createHitarea(iconTwitter)
  centerReg(iconWhatsapp)
  createHitarea(iconWhatsapp)
  iconFacebook.x = (canvasW / 100) * 40
  iconTwitter.x = canvasW / 2
  iconWhatsapp.x = (canvasW / 100) * 60
  iconFacebook.y = iconTwitter.y = iconWhatsapp.y = (canvasH / 100) * 80

  //option
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
  optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit)
  optionsContainer.visible = false

  //exit
  itemExit = new createjs.Bitmap(loader.getResult('itemExit'))
  centerReg(itemExit)
  itemExit.x = canvasW / 2
  itemExit.y = canvasH / 2

  buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'))
  centerReg(buttonConfirm)
  buttonConfirm.x = (canvasW / 100) * 35
  buttonConfirm.y = (canvasH / 100) * 63

  buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'))
  centerReg(buttonCancel)
  buttonCancel.x = (canvasW / 100) * 65
  buttonCancel.y = (canvasH / 100) * 63

  confirmMessageTxt = new createjs.Text()
  confirmMessageTxt.font = '50px odin'
  confirmMessageTxt.color = '#fff'
  confirmMessageTxt.textAlign = 'center'
  confirmMessageTxt.textBaseline = 'alphabetic'
  confirmMessageTxt.text = exitMessage
  confirmMessageTxt.x = canvasW / 2
  confirmMessageTxt.y = (canvasH / 100) * 44

  confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt)
  confirmContainer.visible = false

  mainContainer.addChild(startButton, logo)
  mainContainer.hitArea = new createjs.Shape(
    new createjs.Graphics().beginFill('#000').drawRect(0, 0, canvasW, canvasH)
  )
  gameContainer.addChild(
    dragArea,
    iconTimerShadow,
    iconTimer,
    iconQuestionShadow,
    iconQuestion,
    iconQuestionColour,
    mathsContainer
  )
  resultContainer.addChild(buttonReplay, resultTxtShadow, resultTxt)
  if (shareEnable) {
    resultContainer.addChild(shareTxt, iconFacebook, iconTwitter, iconWhatsapp)
  }
  canvasContainer.addChild(
    bg,
    mainContainer,
    gameContainer,
    resultContainer,
    confirmContainer,
    optionsContainer,
    buttonSettings
  )
  stage.addChild(canvasContainer)

  resizeCanvas()
}

/*!
 *
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 *
 */
function resizeCanvas() {
  if (canvasContainer != undefined) {
    buttonSettings.x = canvasW - offset.x - 60
    buttonSettings.y = offset.y + 45

    var distanceNum = 75
    // if (curPage != 'game') {
    //   buttonExit.visible = false
    //   buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x
    //   buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum
    //   buttonSoundOn.x = buttonSoundOff.x
    //   buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum

    //   buttonFullscreen.x = buttonSettings.x
    //   buttonFullscreen.y = buttonSettings.y + distanceNum * 2
    // } else {
    buttonExit.visible = true
    buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x
    buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum
    buttonSoundOn.x = buttonSoundOff.x
    buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum

    buttonFullscreen.x = buttonSettings.x
    buttonFullscreen.y = buttonSettings.y + distanceNum * 2

    buttonExit.x = buttonSettings.x
    buttonExit.y = buttonSettings.y + distanceNum * 3
    // }
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
