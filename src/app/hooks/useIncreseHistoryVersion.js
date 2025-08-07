import {useFormContext} from "react-hook-form";


export const useIncreaseHistoryVersion = () => {
  const {setValue} = useFormContext();

  return () => {
    setValue('$$updatedAt', Date.now())
  }
}
