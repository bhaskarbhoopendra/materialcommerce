interface Base {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  source: string;
  lastVisited?: Date;
  phoeNumber: number;
  googleId: string;
  profilePhoto: string;
  cart: [string];
  wishlist: [string];
}

interface IUser extends Base {
  _id: string;
}

export default IUser;
