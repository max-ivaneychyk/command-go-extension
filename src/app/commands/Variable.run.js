import {replaceAllVariables} from "../funcs/variables";
import Validator from "../validators/Validator";

export const formats = [
  {name: "number", id: "number"},
  {name: "string", id: "string"},
  {name: "list of strings (comma separated)", id: "list"},
  {name: "list of numbers (comma separated )", id: "listNumbers"},
]

const mapType = {
  'number': Number,
  "string": String,
  'list': data => data.toString().split(","),
  'listNumbers': data => data.toString().split(",").map(Number),
}

const run = async ({format, value, saveTo}, {setProperty, getProperty}) => {
  Validator.asNotEmpty(saveTo, "Variable name")

  const valueToSave = mapType[format](value)

  setProperty(
    saveTo,
    replaceAllVariables(valueToSave, getProperty)
  )
}

export default run;
