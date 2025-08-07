
export const isSkipped = option => {
  return !!option.$$skip
}

export const excludeAllSkipped = options => {
  return options.filter(option => !isSkipped(option));
}
