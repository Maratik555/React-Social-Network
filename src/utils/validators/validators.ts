export const required = (value:string): string | undefined => {
  if (value) return undefined

  return 'Field is required'
}

export const maxCreatorLength = (maxLength:number) => (value:string) => {
if (value.length > maxLength) return `Max length is ${maxLength} symbols`
  return undefined
}