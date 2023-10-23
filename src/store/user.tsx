import Store from "./../store";
import { v4 as uuidv4 } from 'uuid';

export const initailState = {
  // Set the initial status of the application
  userList: [{
    id: uuidv4(),
    firstName: "Sarika",
    lastName: "Maru",
    gender: "female",
    city: "surat",
    skills: ["Communication", "Problem Solving"],
    phoneNo: 9896585652,
    email: "sarikadev89@gmail.com",
    DOB: "1996-08-01",
    image: null,
  }, {
    id: uuidv4(),
    firstName: "Nikunj",
    lastName: "Maru",
    gender: "male",
    city: "pune",
    skills: ["Communication"],
    phoneNo: 8985658696,
    email: "nikunj@gmail.com",
    DOB: "1996-10-19",
    image: null,
  }],
};

export const useUsersData = () => {
  const [{ user }, setStore] = Store.useStore();
  return {
    userList: user.userList,
  };
}

export const useAddUserData = () => {
  const [{ user }, setStore] = Store.useStore();
  const addedUserData = (data: object) => {
    setStore((state: any) => {
      state.user.userList.push(data);
    });
  };
  return {
    addedUserData
  };
}

export const useUpdateUserData = () => {
  const [{ app }, setStore] = Store.useStore();
  const updatedUserData = (data: any) => {
    setStore((state: any) => {
      const index = state.user.userList.findIndex(
        (u: any) => u.id === data.id
      );
      if (index !== -1) {
        state.user.userList[index] = data;
      }
    });
  };
  return {
    updatedUserData
  };
}

export const useDeleteUserData = () => {
  const [{ user }, setStore] = Store.useStore();
  const deletedUserData = (id: any) => {

    setStore((state: any) => {
      state.user.userList = state.user.userList.filter(
        (user: any) => user.id !== id
      );
    });
  };
  return {
    deletedUserData
  };
}
