import { todoLists } from "components/data/todoLists";

//handler for adding a new todo task
export default async function handler(request, response) {
   if (request.method === "POST") {
        const addNewTodo = {
          id: todoLists.length +1,
          todoName: request.body.inputTodo,
          dateAdded: new Date().toDateString(),
        };

        todoLists.push(addNewTodo)
        response.status(201).json(addNewTodo)
    }

}