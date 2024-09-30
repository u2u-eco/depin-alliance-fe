export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision
  }
  return number.toLocaleString('en-US', options)
}

export const kFormatter = (num: number, minPrecision = 2, maxPrecision = 2) => {
  const absNum: any = Math.abs(num)
  const absNumToFixed: any = (absNum / 1000).toFixed(1)
  return absNum > 99999
    ? `${Math.sign(num) * absNumToFixed}k`
    : formatNumber(num, minPrecision, maxPrecision)
}
