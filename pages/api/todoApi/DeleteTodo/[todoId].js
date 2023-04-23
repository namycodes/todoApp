import { todoLists } from "components/data/todoLists";

export default async function handler(request, response) {
  //destructuring the id of the todo from the request object
  const { todoId } = request.query;
   if (request.method === "DELETE") {
      const todoToDelete = todoLists.find((todo) => todo.id === parseInt(todoId));
      const todoToDeleteIndex = todoLists.findIndex(todo=>todo.id === parseInt(todoId))

      todoLists.splice(todoToDeleteIndex, 1)
      response.status(200).json(todoToDelete)
  }
}
