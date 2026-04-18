import React, {useEffect, useMemo, useState} from 'react';
import {dropdownOption, getInitialScheme, inputOption, numberOption, SelectFrom} from "../../hooks/useSelectFrom";
import run from "./TTSSpeak.run";
import {COMMANDS} from "../../const/commands";
import IconCommand, {ICON_COLOR} from "../../components/IconCommand";
import {HiSpeakerWave} from "react-icons/hi2";
import {browser} from "../../../chrome/const/extension";
import {useFormContext} from "react-hook-form";

const scheme = {
  type: COMMANDS.TTS_SPEAK,
  // lang: getInitialScheme({
  //   value: languages[0].id,
  //   as: dropdownOption.id
  // }),
  voiceName: getInitialScheme({
    as: dropdownOption.id
  }),
  text: getInitialScheme({
    value: "Hello World",
    as: inputOption.id
  }),
  rate: getInitialScheme({
    value: 1,
    as: numberOption.id
  }),
}

const Control = ({name}) => {
  const {setValue, watch} = useFormContext();
  const voiceName  =watch(`${name}.voiceName`)

  const [voices, setVoices] = useState([]);

  useEffect(() => {
    browser.tts.getVoices().then(voices => setVoices(voices));
  }, []);

  const voicesOptions = useMemo(() => {
    return voices.map(voice => ({name: voice.voiceName + ` (${voice.lang})`, id: voice.voiceName}));
  }, [voices]);

  const selectedVoice = useMemo(() => {
    return voices.find(voice => voice.voiceName === voiceName) ?? null;
  }, [voiceName, voices])

  useEffect(()=> {
    if(selectedVoice) {
      setValue(`${name}.lang`, selectedVoice.lang);
    }
  }, [name, selectedVoice, setValue])

  return (
    <>
      Speak text <SelectFrom group={`${name}.text`} />
      voiceName <SelectFrom group={`${name}.voiceName`} options={voicesOptions} components={[dropdownOption]} />
      {/*via lang <SelectFrom group={`${name}.lang`} options={languages} />*/}
      rate <SelectFrom group={`${name}.rate`} components={[numberOption]}  />
    </>
  )
}

export const TTSSpeakCommand = {
  icon: <IconCommand Svg={HiSpeakerWave} className={ICON_COLOR.GREEN}/>,
  Control,
  run,
  scheme,
  label: "TTS Speak"
}


