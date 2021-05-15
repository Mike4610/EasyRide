import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  ScrollView,
} from "react-native";
import { Dialog, Portal, Provider } from "react-native-paper";
import { Dimensions } from "react-native";
import SearchBar from "../SearchBar/SearchBar";
import { List, Divider } from "react-native-paper";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import DatePicker from "@react-native-community/datetimepicker";

interface Props {
  giveVisible: boolean;
  onDismiss: () => void;
}

const GiveRidePopUp: React.FC<Props> = ({ giveVisible, onDismiss }) => {
  return (
    <Provider>
      <Portal>
        {/* @ts-ignore */}
        <Dialog
          style={{
            backgroundColor: "white",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            alignSelf: "center",
          }}
          visible={giveVisible}
          onDismiss={() => {
            onDismiss();
          }}
        >
          <Dialog.Content>
            {/* <View >
   
                <TouchableOpacity
                  style={{
                    flex: 1,
                    zIndex: 0,
                    position: "absolute",
                    //@ts-ignore
                    top: StatusBar.currentHeight * 1.5,
                  }}
                >
                  <Ionicons
                    style={{ zIndex: 1 }}
                    name="arrow-back"
                    size={45}
                    color="#fd4d4d"
                    onPress={() => {
                      onDismiss();
                    }}
                  />
                </TouchableOpacity>
          

              <View>
                <Text
                  style={{
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: -80,
                  }}
                >
                  Route
                </Text>
                <List.Item
                  title=""
                  style={{ width: 400, alignSelf: "center" }}
                  left={(props) => (
                    <SearchBar placeholder="From" visible={true}></SearchBar>
                  )}
                />
                <List.Item
                  title=""
                  style={{
                    width: 400,
                    alignSelf: "center",
                    marginTop: 30,
                    zIndex: -1,
                  }}
                  left={(props) => (
                    <SearchBar placeholder="To" visible={true}></SearchBar>
                  )}
                />
              </View>

              <View>
                <Text
                  style={{
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: -80,
                  }}
                >
                  Date
                </Text>
              </View>
            </View> */}
            <View>
              <View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    zIndex: 0,
                    position: "absolute",
                    //@ts-ignore
                    top: StatusBar.currentHeight * 1.5,
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={45}
                    color="#fd4d4d"
                    onPress={() => {
                      onDismiss();
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: 300 }}>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      alignSelf: "center",
                      marginTop: 50,
                    }}
                  >
                    <EvilIcons name="location" size={25} color="#fd4d4d" />
                    Route
                  </Text>
                  <View
                    style={{
                      width: 400,
                      alignSelf: "center",
                      zIndex: 1,
                      position: "absolute",
                    }}
                  >
                    <SearchBar placeholder="From" visible={true}></SearchBar>
                  </View>
                  <View
                    style={{
                      width: 400,
                      alignSelf: "center",
                      position: "absolute",
                      marginTop: 80,
                    }}
                  >
                    <SearchBar placeholder="To" visible={true}></SearchBar>
                  </View>
                </View>
              </View>
              <Divider style={{ width: "200%", alignSelf: "center" }}></Divider>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    alignSelf: "center",
                    marginTop: 30,
                  }}
                >
                  Date
                </Text>
                <DatePicker
                  display="default"
                  value={new Date()}
                  mode="date"
                  onChange={(e, d) => {
                    //setShow(false);
                  }}
                />
              </View>
              <View>
                <Text>Vehicle</Text>
              </View>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </Provider>
  );
};
export default GiveRidePopUp;
