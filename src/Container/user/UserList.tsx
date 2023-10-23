import { useNavigate } from "react-router-dom";
import { useUsersData, useDeleteUserData } from "../../store/user";
import "./../../App.css";
import noImage from './../../assets/no_img.jpeg';

const UserList = () => {
  const { userList } = useUsersData();
  const { deletedUserData } = useDeleteUserData();
  const navigate = useNavigate();

  const handleEdit = (user: any) => {
    navigate(`user/add#${user.id}`, { state: { user } });
  };

  const handleDelete = (id: String) => {
    if (window.confirm("Are you sure you want to delete this record?"))
      deletedUserData(id);
  };

  return (
    <div className="App">
      <div className="App-container">
        <p>Welcome to my assignment</p>
        <a
          href="#"
          onClick={() => navigate("user/add")}
          className="text-md ite text-blue-600 dark:text-blue-500 hover:underline"
        >
          Add
        </a>
        <div className="flex justify-center p-6">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    First name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone no
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of Birth
                  </th>
                  <th scope="col" className="px-6 py-3">
                    City
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Professional Skills
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {(userList || []).map((item: any, i: any) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={i}>
                      <td className="px-6 py-4">
                        <img
                          src={item?.image !== null ? item?.image : noImage} // Set the source of the image
                          alt="User's profile" // Provide an alt text for accessibility
                          className="w-32 h-32" // You can adjust the size and styling as needed
                        />
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item?.firstName}
                      </th>
                      <td className="px-6 py-4">{item?.lastName}</td>
                      <td className="px-6 py-4">{item?.email}</td>
                      <td className="px-6 py-4">{item?.phoneNo}</td>
                      <td className="px-6 py-4">{item?.gender}</td>
                      <td className="px-6 py-4">{item?.DOB}</td>
                      <td className="px-6 py-4">{item?.city}</td>
                      <td className="px-6 py-4">{(item?.skills || []).toString()}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-6"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
