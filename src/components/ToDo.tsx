import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

// 첫번째 방법
// function ToDo({ text, category }: IToDo) {
//   const onClick = (newCategory:IToDo["category"])=>{}
//   return (
//     <li>
//       <span>{text}</span>
//       {category !=="DOING"&&<button onClick ={() => onClick("DOING")}>Doing</button>}
//       {category !=="TO_DO"&&<button onClick ={() => onClick("TO_DO")}>To Do</button>}
//       {category !=="DONE"&&<button onClick ={() => onClick("DONE")}>Done</button>}
//     </li>
//   );
// }

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    /* 
      1)타겟의 현재 경로를 찾아야한다.
       -oldTodos 의 Array를 받아오고 있고, 해당 Arrayd에서 Todo의 Index를 찾기위해
        toDo의 idrk props에서 온 id와 같은지 보기로 함
    */
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      /* 
      2)원래의todo를 update 해야함.
       - 새로운 Category를 만들어서 새로운 Todo를 만들어야함.
    */
      const oldTodo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      /* 
      3)OldToDos의 Array에서 OldTodo를 바꾼다.
       - targetIndex에 있는 todo를 newTodo로 바꿔주면 됨.
       3-1) slice(0, target를 사용하면 배열을 자를 수 있음.
        - 첫번째 인자부터 target까지의 것을 자를 수 있다.
       3-2) slice(target + 1)
        - target index 1에서 1을 더한곳 부터 끝까지 자른다.
       3-3) 둘을 합치면서 가운데에 새로운 인자를 끼워넣는다.
        - [...array.slice(0, target), "인자", ...array.slice(target + 1)]
    */
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {/* 반복이 되므로 enum 으로 바꾸고 한번만 쓰도록 하기
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button> }
      )*/}
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
export default ToDo;
