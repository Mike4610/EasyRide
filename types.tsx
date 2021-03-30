type Vehicle = {
  brand: string;
  model: string;
  seats: number;
  licensePlate: string;
};

type Driver = {
  name: {
    firstName: string;
    lastName: string;
  };
  age: number;
  phoneNumber: string;
};

type Ride = {
  from: string;
  to: string;
  date: string;
  driver: Driver;
};

export { Vehicle, Driver, Ride };
