const validURL = (s: string) => {
  try {
    new URL(s)
    return true
  } catch (err) {
    return false
  }
}

console.log(
  validURL(
    'https://github.com/codersforcauses/coexist/issues?q=iss%3Aissue+is%3Aclosed'
  )
)
