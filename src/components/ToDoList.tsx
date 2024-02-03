import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// function ToDoList() {
//   //useRecoilValue는 값만 반환
//   //const toDos = useRecoilValue(toDoState);
//   const [toDo, doing, done] = useRecoilValue(toDoSelector);
//   return (
//     <div>
//       <h1>To Dos</h1>
//       <hr />
//       <CreateToDo />
//       <hr />

//       <h2>To Do</h2>
//       <ul>
//         {toDo.map((toDo) => (
//           <ToDo key={toDo.id} {...toDo} />
//         ))}
//       </ul>
//       <hr />
//       <h2>Doing</h2>
//       <ul>
//         {doing.map((toDo) => (
//           <ToDo key={toDo.id} {...toDo} />
//         ))}
//       </ul>
//       <hr />
//       <h2>Done</h2>
//       <ul>
//         {done.map((toDo) => (
//           <ToDo key={toDo.id} {...toDo} />
//         ))}
//       </ul>
//     </div>
//   );
// }
function ToDoList() {
  //useRecoilValue는 값만 반환
  const toDos = useRecoilValue(toDoSelector);
  //useRecoilState : atom의 값과 그것을 수정하는 modifier 함수 반환
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form>
        <select value={category} onInput={onInput}>
          {/*반복이 되므로 enum 으로 바꾸고 한번만 쓰도록 하기
           <option value="TO_DO">To Do</option>
          <option value="DOING">Doing</option>
          <option value="DONE">Done</option> */}
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>To Do</option>
          <option value={Categories.DONE}>To Do</option>
        </select>
      </form>
      <CreateToDo />
      {/*해당 코드를 짧게 만들기
       {category === "TO_DO" &&
        toDo.map((atodo) => <ToDo key={atodo.id} {...atodo} />)}
      {category === "DOING" &&
        doing.map((atodo) => <ToDo key={atodo.id} {...atodo} />)}
      {category === "DONE" &&
        done.map((atodo) => <ToDo key={atodo.id} {...atodo} />)} 
        */}
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

/* interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", { required: "write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
} */
