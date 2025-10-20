export const getInitialCreateCollectionModalValues = () => {
  return {
    description: "",
    name: "",
    scope: "private" as "private" | "shared",
  };
};
