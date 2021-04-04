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
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  profileImgURL?:string,
  createdAt: string;
};

export { Vehicle, Driver, Ride, User };
