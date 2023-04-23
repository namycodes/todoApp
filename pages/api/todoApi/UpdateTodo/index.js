import { todoLists } from "components/data/todoLists"
const path = require('path')
const fs = require('fs')
export default async function handler(request, response) {
    if (request.method === 'PATCH') {
        const { id, todoName } = request.body
        try {
            const index = todoLists.findIndex(todo => todo.id === id)
            todoLists[index].text = todoName
            fs.writeFile(path.join(process.cwd(),'data/todoLists.js'),JSON.stringify(todoName))
        } catch (error){
            console.error(error)
        }

        response.status(200).json(todoLists)
    }
}