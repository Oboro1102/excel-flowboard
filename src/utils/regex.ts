export const regUrl = (url: string) => {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i',
  )
  return pattern.test(url)
}
export const regEmail = (email: string) => {
  const pattern = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')
  return pattern.test(email)
}
export const isValidJWT = (token: string) => {
  const pattern = new RegExp('^[A-Za-z0-9-_]+?\\.[A-Za-z0-9-_]+?\\.[A-Za-z0-9-_]+?$')
  return pattern.test(token)
}
export const isCompanyId = (string: string) => {
  const pattern = new RegExp('^[0-9]{8}$')
  return pattern.test(string)
}
