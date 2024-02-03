import { atom, selector } from "recoil";
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

//selector : Selector는 파생된 state(derived state)의 일부를 나타낸다.
//즉, 기존 state를 가져와서, 기존 state를 이용해 새로운 state를 만들어서
//반환할 수 있다. 기존 state를 이용만할 뿐 변형시키지 않는다.
//derived state는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에
//강력한 개념이다.

//selector는 state를 가져다가 뭔가를 return 할 것임.
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    // return [
    //   toDos.filter((toDo) => toDo.category === "TO_DO"),
    //   toDos.filter((toDo) => toDo.category === "DOING"),
    //   toDos.filter((toDo) => toDo.category === "DONE"),
    // ];
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
//원하는 카테고리의 toDo만 보이게 할 것임.
//
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});
