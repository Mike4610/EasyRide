type Vehicle = {
  brand: string;
  model: string;
  seats: string;
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

type User = {
  fullName: string | null,
  email: string | null,
  phoneNumber: string | null, 
  birthDate?: string | null,
  createdAt: string | null
}

export { Vehicle, Driver, Ride, User};
