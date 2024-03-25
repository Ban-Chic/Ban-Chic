import { updateNickname } from "../../api/Api";

function useNickNameChange() {
  const changeNickName = (nickName: string) => {
    console.log(nickName);
    try {
      updateNickname(nickName).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return changeNickName;
}

export default useNickNameChange;
