import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Container,
  Spacer,
  Button,
  VStack,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ImPlus, ImBin, ImPencil } from "react-icons/im";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";

export default function TodoListApp() {
  const [todoList, setTodoList] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  
  const InputRef = useRef(null);

  //code for getting all todos
  const getTodos = useEffect(() => {
    const fetchTodoList = async () => {
      const response = await fetch("api/todoApi/getTodoList");
      const data = await response.json();
      setTodoList(data);
    };
    fetchTodoList();
  }, [todoList]);
  //end of the get todo code

  //code for adding a new todo
  const addTodo = async () => {
    const response = await fetch("api/todoApi/AddTodo", {
      method: "POST",
      body: JSON.stringify({ inputTodo }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    
    return data;
  };

  //end of code for adding a new todo

  //code for deleting a todo from the list
  const deleteTodo = async (todoId) => {
    const response = await fetch(`api/todoApi/DeleteTodo/${todoId}`, {
      method: "DELETE",
    });
    const newData = await response.json();
    console.log(newData);
    getTodos();
  };

  //end of code for deleting a todo

  const editTodo = async (todoId) => {
   
    const response = await fetch(`api/todoApi/UpdateTodo/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({ todoName }),
      headers: {
        "Content-type":"application/json"
      }
    })

  }
  //useSession destructuring to get a hold of the current session of a user
  const { data: session } = useSession();

  return (
    <Box>
      <Flex justify="center" align="center" position="relative" top="2rem">
        {" "}
        <Container maxW="4xl">
          <HStack>
            <Heading
              fontSize={{ base: "18px" }}
              color="black"
              align="center"
              py="2rem"
            >
              Logged in as: {""} {session ? session.user.name : ""}
              <Button
                mx="2rem"
                bg="pink.700"
                color="white"
                onClick={() => signOut()}
              >
                sign out
              </Button>
            </Heading>
          </HStack>
          <Box>
            {/* HStack is a chakra component used to put thing or items horizontally ti each other */}
            <HStack>
              <Input
                placeholder="todo name"
                bg="white"
                ref={InputRef}
                value={inputTodo}
                onChange={(e) => setInputTodo(e.target.value)}
              />
              <IconButton
                onClick={addTodo}
                icon={<ImPlus />}
                color="white"
                bg="pink.700"
              />
            </HStack>
          </Box>

          {todoList.map((todo) => {
            return (
              <Container pt="1.5rem" key={todo.id}>
                <Card>
                  <CardBody p="10px">
                    <div>
                      <h3 className="bg-pink-800 text-white w-6 h-6 rounded-xl px-2">
                        {todo.id}{" "}
                      </h3>
                    </div>

                    <h3 className="font-bold">
                      Description:
                      {todo.todoName}
                    </h3>

                    <h3>Date Added:{todo.dateAdded}</h3>

                    <Spacer />
                    <IconButton
                      color="white"
                      bg="pink.700"
                      icon={<ImPencil />}
                      onClick={() =>
                        editTodo((InputRef.current.value = todo.todoName))
                      }
                      m="10px"
                    />
                    <IconButton
                      onClick={() => deleteTodo(todo.id)}
                      color="white"
                      bg="pink.700"
                      icon={<ImBin />}
                    />
                  </CardBody>
                </Card>
              </Container>
            );
          })}
        </Container>
      </Flex>
    </Box>
  );
}
