import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

interface Vehicle {
  brand: string;
  model: string;
  seats: string;
  licensePlate: string;
}

interface Driver {
  name: {
    firstName: string;
    lastName: string;
  };
  age: number;
  phoneNumber: string;
}

interface Ride {
  from: string;
  to: string;
  date: string;
  driver: Driver;
}

interface User {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  profileImgURL?: string;
  createdAt: string;
  vehicles: object[]
}

interface ScreenNavigationProps {
  navigation: DrawerNavigationProp<any, any>;
  route?: RouteProp<any, any>;
}

export { Vehicle, Driver, Ride, User, ScreenNavigationProps };
