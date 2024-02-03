import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // const handleValid = ({ toDo }: IForm) => {
  //   setToDos((oldToDos) => [
  //     { text: toDo, id: Date.now(), category: "TO_DO" },
  //     ...oldToDos,
  //   ]);
  //   setValue("toDo", "");
  // };

  //selector에 지정된걸로 state를 넣고싶어요!
  const category = useRecoilValue(categoryState);
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
