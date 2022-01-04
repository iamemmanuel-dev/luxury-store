export const formatPrice = price => {
  const options = {
    style: `currency`,
    currency: `USD`,
    useGrouping: true,
  }

  return new Intl.NumberFormat(navigator.language, options).format(price)
}
