module.exports = (name = '') => {
  // This will convert a name string into an object.
  // It will figure out what the initials are and if it is a company or not
  const nameLower = name.toLowerCase()
  const nameSplit = name.split(' ')

  if (nameLower.includes(' pty')) {
    return {
      company: name,
    }
  } else if (nameSplit[0].length === 1) {
    return {
      givenName: nameSplit[0],
      name: nameSplit[1],
    }
  } else {
    return {
      name,
    }
  }
}
