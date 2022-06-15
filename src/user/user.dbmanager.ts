import userModel from "./user.model";

class userDbManager {
  user = userModel;
  public id !: string;
  public data: any;
  constructor() {
    this.getUserById(this.id);
    this.createUser(this.data);

  }

  getUserById = async (id: string) => {
    return await this.user.findById(id);
  }

  createUser = async (data: any) => {
    return await this.user.create(data);
  }

  updateUserById = async (id: string, data: any,) => {
    return await this.user.findByIdAndUpdate(id, data);
  }

  deleteUserById = async (id: string) => {
    return await this.user.findByIdAndDelete(id);
  }
}

export default userDbManager; 