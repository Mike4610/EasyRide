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
  vehicles: Vehicle[];
  locations: Location[];
}

interface Place {
  latitude: number;
  longitude: number;
  geoHash?: string;
  description?: string;
}
interface RouteDetails {
  from: string;
  to: string;
  date: string;
  distance: number;
  duration: number;
}
interface Route {
  id?: string;
  from: Place;
  to: Place;
  date: Date;
  distance: number;
  duration: number;
  vehicle?: Vehicle;
  availableSeats?: string;
  driverId?: string;
  passengersId?: string[];
  range?: number;
}
interface Location {
  name: string;
  place: Place;
}

interface ScreenNavigationProps {
  navigation: DrawerNavigationProp<any, any>;
  route?: RouteProp<any, any>;
}

export {
  Vehicle,
  Driver,
  Ride,
  User,
  ScreenNavigationProps,
  Place,
  Route,
  RouteDetails,
  Location,
};
