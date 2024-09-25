export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision
  }
  return number.toLocaleString('en-US', options)
}

export const formatAddress = (str: string) => {
  if (str?.length > 20) {
    return str.substr(0, 5) + '...' + str.substr(str.length - 4, str.length)
  }
  return str || ''
}
