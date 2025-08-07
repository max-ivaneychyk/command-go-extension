import {STATUS} from "../classes/Scenario";


export const trackExecuting = methods => ({id, status, message}) => {
  if (status === STATUS.PENDING) {
    methods.setValue(`errors.${id}`, {pending: true, message})
  } else if (status === STATUS.DONE) {
    methods.setValue(`errors.${id}`, {done: true, message})
  } else if (status === STATUS.FAIL) {
    methods.setValue(`errors.${id}`, {message})
  } else if (status === STATUS.SKIPPED) {
    methods.setValue(`errors.${id}`, {pending: true, message: "Skip"})
  }
}
