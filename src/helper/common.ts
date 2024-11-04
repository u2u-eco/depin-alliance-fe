export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  if (number === undefined) return ''
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision
  }
  return number.toLocaleString('en-US', options)
}

export const kFormatter = (num: number, minPrecision = 2, maxPrecision = 2) => {
  if (num === undefined) return ''
  const absNum: any = Math.abs(num)
  const absNumToFixed: any = (absNum / 1000).toFixed(1)
  return absNum > 99999
    ? `${formatNumber(Math.sign(num) * absNumToFixed || 0, 0, 0)}k`
    : formatNumber(num, minPrecision, maxPrecision)
}

export const formatAddress = (str: string) => {
  if (str?.length > 20) {
    return str.substr(0, 5) + '...' + str.substr(str.length - 4, str.length)
  }
  return str || ''
}

export const toCapitalizeCase = (string: any) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
