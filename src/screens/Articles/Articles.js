import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import Todos from './Todos'
import Recientes from './Recientes'

const Articles = ({ navigation }) => {
  const [value, setValue] = React.useState("recientes");

  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView style={styles.SafeAreaView}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "recientes",
                label: "Recientes",
                icon: "clipboard-text-clock",
              },
              {
                value: "todos",
                label: "Todos",
                icon: "clipboard-text-multiple"
              },
            ]}
          />
        </SafeAreaView>

        {value === "recientes" && (
          <Recientes navigation={navigation}/>
        )}

        {value === "todos" && (
          <Todos navigation={navigation}/>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20
  },
  SafeAreaView: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10
  }
});

export default Articles;
