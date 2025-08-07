import {useWatch} from "react-hook-form";
import {useMemo} from "react";
import {LOAD_URL_CONDITION, TRIGGERS} from "../const/triggers";

export const useGetMatches = () => {
  const triggers = useWatch({name: 'triggers'});

  return useMemo(() => {
    return triggers.map(({type, conditions}) => {
      if (type === TRIGGERS.LOAD_URL) {
        const map = {
          [LOAD_URL_CONDITION.START]: "*",
          [LOAD_URL_CONDITION.CONTAINS]: "",
          [LOAD_URL_CONDITION.END]: "*",
        };

        conditions.forEach((con) => {
          map[con.type] = con.value
        });

        return [
          map[LOAD_URL_CONDITION.START],
          map[LOAD_URL_CONDITION.CONTAINS],
          map[LOAD_URL_CONDITION.END],
        ].join("")
      }

      return null
    }).filter(Boolean)
  }, [triggers])
}
