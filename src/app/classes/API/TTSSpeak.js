import {browser} from "../../../chrome/const/extension";

class TTSSpeak {
  static key = "tts.speak"

  static exe({text, rate, lang, enqueue, voiceName}) {
    return browser.tts.speak(text, {lang, rate, enqueue, voiceName});
  }

  static isSupported() {
    return !!browser?.tts;
  }
}

export default TTSSpeak;
