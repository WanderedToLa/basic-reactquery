import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  radii: {
    none: "0",
    sm: "0.25rem",
    base: "0.5rem",
    md: "1em",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "1.75rem",
    "3xl": "2rem",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "base",
      },
      defaultProps: {
        colorScheme: "orange",
      },
    },
  },
});
