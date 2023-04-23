import TodoListApp from "./todo";
import { useSession,signIn,signOut } from "next-auth/react";
import { Container, Heading,Button, Text } from "@chakra-ui/react";
export default function Home() {
  
  const {data: session} = useSession()
  if (!session) {
    
    return (
      <Container bg="black" color="white" h="20rem" mt="70px" borderRadius="12px" align="center" pt="2rem">
        <Heading>Log In</Heading>
        <Button onClick={()=>signIn()} mt="14px" bg="white" color="black">Log In</Button>
        <Text>For you to create a todo you must logIn</Text>
      </Container>
    )
    
  } else if (session) {
    return (
      <>
        <TodoListApp />
      </>
    );
  }




  
}


