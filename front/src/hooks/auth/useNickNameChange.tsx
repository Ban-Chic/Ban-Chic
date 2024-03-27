import { useState } from "react";
import { updateNickname } from "../../api/Api";

function useNickNameChange() {
  const [nick, setNick] = useState("");
  const changeNickName = (nickName: string) => {
    try {
      updateNickname(nickName).then((res) => {
        setNick(res.data.data.nickname);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { nick, changeNickName };
}

export default useNickNameChange;
