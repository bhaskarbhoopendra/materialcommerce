interface Base {
  email: string;
  firstName: string;
  lastName: string;
  source: string;
  lastVisited: Date;
  phoeNumber: number;
}

interface IUser extends Base {
  id: string;
}

export default IUser;
