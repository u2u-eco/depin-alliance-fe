const addPrefix = (number: number) => {
  if (number >= 10) {
    return number
  }
  return `0${number}`
}
let refInterval: any = 0
addEventListener('message', (event: any) => {
  const data = JSON.parse(event.data)
  if (data.type === 'CLEAR') {
    clearInterval(refInterval)
    return
  }
  const { timeEnd, currentPoint, miningPowerPerSecond, max } = data
  let miningCount = currentPoint
  const update = () => {
    // Get today's date and time
    miningCount += miningPowerPerSecond
    // setMiningCount(miningCount)
    postMessage(
      JSON.stringify({
        type: 'MINING_VALUE',
        value: miningCount >= max ? max : miningCount
      })
    )

    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = timeEnd - now

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = days * 24 + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    const listTime = [addPrefix(hours), addPrefix(minutes), addPrefix(seconds)]
    // if (days > 0) {
    //   listTime.unshift(addPrefix(days))
    // }
    postMessage(
      JSON.stringify({
        type: 'TIME',
        value: listTime
      })
    )
    // setTimeCountdown(listTime)

    // If the count down is finished, write some text
    if (distance <= 0 || miningCount >= max) {
      if (miningCount >= max) {
        postMessage(
          JSON.stringify({
            type: 'MINING_VALUE',
            value: max
          })
        )
      }
      clearInterval(refInterval)
      postMessage(
        JSON.stringify({
          type: 'RESET'
        })
      )
    }
  }
  update()
  clearInterval(refInterval)
  refInterval = setInterval(update, 1000)
  // postMessage(pi(event.data));
})
