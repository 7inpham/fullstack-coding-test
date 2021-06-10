import React, { useState, useImperativeHandle } from "react";
import { Heading } from "@chakra-ui/react"

const DynamicText = (_, ref) => {
  const [value, setValue] = useState("Random Text");

  useImperativeHandle(ref, () => ({

    changeValue: (newValue) => {
      setValue(newValue);
    },

    getValue: () => {
      return value;
    }
  }));

  return <Heading as="h1" maxWidth="300px">{value}</Heading>;
};

export default React.forwardRef(DynamicText);
