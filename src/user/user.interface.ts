interface Base {
  email: string;
  firstName: string;
  lastName: string;
  source: string;
  lastVisited?: Date;
  phoeNumber: number;
  googleId: string;
  profilePhoto: string;
}

interface IUser extends Base {
  _id: string;
}

export default IUser;
