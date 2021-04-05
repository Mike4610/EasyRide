import React from "react";
import { TouchableOpacity, Animated, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Vehicle } from "../../types";

interface Props {
  handleDeleteVehicle: (vehicle: Vehicle) => void;
  dragX: any;
  vehicle: Vehicle;
}

const SwipeToDelete: React.FC<Props> = ({
  handleDeleteVehicle,
  dragX,
  vehicle,
}) => {
  const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity onPress={() => handleDeleteVehicle(vehicle)}>
      <View style={styles.rightAction}>
        <AnimatedIcon
          name="trash-outline"
          size={40}
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SwipeToDelete;

const styles = StyleSheet.create({
  actionIcon: {
    color: "white",
    padding: 20,
    flex: 1,
    alignSelf: "center",
    marginTop: 25,
  },
  rightAction: {
    backgroundColor: "#fd4d4d",
    flex: 1,
    alignSelf: "center",
  },
});
