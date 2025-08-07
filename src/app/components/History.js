import {useWatch} from "react-hook-form";
import {useEffect} from "react";

const History = () => {
  const data = useWatch();

  useEffect(() => {
    console.log(data);
  }, [data])

  return null;
}
export default History;
