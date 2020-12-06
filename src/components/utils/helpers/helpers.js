

export const updateObjectInArray = (items, objProp, actionProp, changeObj) => {
  return items.map((user) => {
    if (user[objProp] === actionProp) {
      return { ...user, ...changeObj};
    }
    return user;
  })
}