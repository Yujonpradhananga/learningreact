import { create } from "Zustand";

interface todoList {
  todos: string[];
  addTask: (taskTest: string) => void
  deleteTask: (taskDel: string) => void
  updateTask: (taskUpt: string) => void
}

export const useTodoStore = create<todoList>((set) => ({
  todos: [],
  addTask: (taskTest) => set((state) => {
    return {
      todos: [...state.todos, taskTest]
    };
  }),

  deleteTask: (taskDel) => set((s) => {
    return {
      todos: s.todos.filter((task) => task != taskDel)
    };
  }),


}))
