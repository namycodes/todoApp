import { todoLists } from "components/data/todoLists";

export default function handler(request, response) {
    
     response.status(200).json(todoLists)
   
}