import React from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

import AppNavigator from "./navigation/AppNavigation";
import { createCalendar } from "./utils/calendars";
import { init } from "./utils/DB/db";
import TodoProvider from "./providers/Todo";
import ListProvider from "./providers/List";
import GroupProvider from "./providers/Group";

init()
  .then(() => {
    console.log("Initialized database");
    createCalendar();
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TodoProvider>
        <GroupProvider>
          <ListProvider>
            <AppNavigator />
          </ListProvider>
        </GroupProvider>
      </TodoProvider>
    );
  }
}
