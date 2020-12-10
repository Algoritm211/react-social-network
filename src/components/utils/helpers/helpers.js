

export const updateObjectInArray = (items, objProp, actionProp, changeObj) => {
  return items.map((user) => {
    if (user[objProp] === actionProp) {
      return { ...user, ...changeObj};
    }
    return user;
  })
}

//Invalid url format (Contacts->Facebook)

export const getErrorField = (errorString) => {
  if (errorString.includes('Contacts')) {
    const wordsInBrackets = errorString.match(/\(([^)]+)\)/)[1].split('->')
    const fieldName = wordsInBrackets[1].toLocaleLowerCase()
    return fieldName
  }
  return 'formError'
}