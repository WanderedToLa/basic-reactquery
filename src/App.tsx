import "./App.css";
import { ChakraProvider, CircularProgress } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Posts } from "./components/Posts";
import { Suspense } from "react";
import { queryClient } from "./utils/queryClient";
import { customTheme } from "./styles/theme";

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <CircularProgress
              isIndeterminate
              position={"fixed"}
              top={"50%"}
              left={"50%"}
              transform={"translate(-50%, -50%)"}
              color={"#c4c4c4"}
            />
          }
        >
          <Posts />
        </Suspense>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
