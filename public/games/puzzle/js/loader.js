////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

/*!
 *
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 *
 */
function initPreload() {
  toggleLoader(true)

  checkMobileEvent()

  $(window).resize(function () {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(checkMobileOrientation, 1000)
  })
  resizeGameFunc()

  loader = new createjs.LoadQueue(false)
  manifest = [
    { src: 'puzzle/assets/background.png', id: 'background' },
    { src: 'puzzle/assets/background_p.png', id: 'backgroundP' },
    { src: 'puzzle/assets/logo.png', id: 'logo' },
    { src: 'puzzle/assets/button_start.png', id: 'buttonStart' },
    { src: 'puzzle/assets/button_challenge.png', id: 'buttonChallenge' },

    { src: 'puzzle/assets/button_select.png', id: 'buttonSelect' },
    { src: 'puzzle/assets/button_left.png', id: 'buttonLeft' },
    { src: 'puzzle/assets/button_right.png', id: 'buttonRight' },

    { src: 'puzzle/assets/item_display.png', id: 'itemDisplay' },
    { src: 'puzzle/assets/item_status_complete.png', id: 'itemStatusComplete' },
    { src: 'puzzle/assets/item_status_over.png', id: 'itemStatusOver' },

    { src: 'puzzle/assets/button_facebook.png', id: 'buttonFacebook' },
    { src: 'puzzle/assets/button_twitter.png', id: 'buttonTwitter' },
    { src: 'puzzle/assets/button_whatsapp.png', id: 'buttonWhatsapp' },
    { src: 'puzzle/assets/button_continue.png', id: 'buttonContinue' },
    { src: 'puzzle/assets/item_result.png', id: 'itemResult' },
    { src: 'puzzle/assets/item_result_p.png', id: 'itemResultP' },
    { src: 'puzzle/assets/item_exit.png', id: 'itemExit' },
    { src: 'puzzle/assets/item_exit_p.png', id: 'itemExitP' },
    { src: 'puzzle/assets/button_confirm.png', id: 'buttonConfirm' },
    { src: 'puzzle/assets/button_cancel.png', id: 'buttonCancel' },
    { src: 'puzzle/assets/button_fullscreen.png', id: 'buttonFullscreen' },
    { src: 'puzzle/assets/button_sound_on.png', id: 'buttonSoundOn' },
    { src: 'puzzle/assets/button_sound_off.png', id: 'buttonSoundOff' },
    { src: 'puzzle/assets/button_exit.png', id: 'buttonExit' },
    { src: 'puzzle/assets/button_settings.png', id: 'buttonSettings' }
  ]

  for (var n = 0; n < cateogyr_arr.length; n++) {
    manifest.push({ src: cateogyr_arr[n].src, id: 'category' + n })
  }

  for (var n = 0; n < puzzles_arr.length; n++) {
    manifest.push({ src: puzzles_arr[n].src, id: 'puzzle' + n })
  }

  if (typeof addScoreboardAssets == 'function') {
    addScoreboardAssets()
  }

  soundOn = true
  if ($.browser.mobile || isTablet) {
    if (!enableMobileSound) {
      soundOn = false
    }
  }

  if (soundOn) {
    manifest.push({ src: 'puzzle/assets/sounds/sound_click.ogg', id: 'soundButton' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_play.ogg', id: 'soundPlay' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_over.ogg', id: 'soundOver' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_complete.ogg', id: 'soundComplete' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_result.ogg', id: 'soundResult' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_press.ogg', id: 'soundPress' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_release.ogg', id: 'soundRelease' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_rotating.ogg', id: 'soundRotating' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_place.ogg', id: 'soundPlace' })
    manifest.push({ src: 'puzzle/assets/sounds/sound_countdown.ogg', id: 'soundCountdown' })
    manifest.push({
      src: 'puzzle/assets/sounds/sound_countdown_end.ogg',
      id: 'soundCountdownEnd'
    })

    createjs.Sound.alternateExtensions = ['mp3']
    loader.installPlugin(createjs.Sound)
  }

  loader.addEventListener('complete', handleComplete)
  loader.addEventListener('fileload', fileComplete)
  loader.addEventListener('error', handleFileError)
  loader.on('progress', handleProgress, this)
  loader.loadManifest(manifest)
}

/*!
 *
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 *
 */
function fileComplete(evt) {
  var item = evt.item
  //console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 *
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 *
 */
function handleFileError(evt) {
  console.log('error ', evt)
}

/*!
 *
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 *
 */
function handleProgress() {
  $('#mainLoader span').html(Math.round((loader.progress / 1) * 100) + '%')
}

/*!
 *
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 *
 */
function handleComplete() {
  toggleLoader(false)
  initMain()
}

/*!
 *
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 *
 */
function toggleLoader(con) {
  if (con) {
    $('#mainLoader').show()
  } else {
    $('#mainLoader').hide()
  }
}
