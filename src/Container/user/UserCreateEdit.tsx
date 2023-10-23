import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./../../App.css";
import {
  useAddUserData,
  useUpdateUserData,
} from "../../store/user";
import { useNavigate, useLocation } from "react-router-dom";

interface FormData {
  id: string,
  firstName: string;
  lastName: string;
  gender: string;
  city: string;
  skills: Array<string>;
  phoneNo: string;
  email: string;
  DOB: string;
  image: null;
}

const UserCreateEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addedUserData } = useAddUserData();
  const { updatedUserData } = useUpdateUserData();

  const [formData, setFormData] = useState<FormData>({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    gender: "",
    city: "surat",
    skills: [],
    phoneNo: "",
    email: "",
    DOB: "",
    image: null,
  });

  const [isUpdateData, setIsUpdateData] = useState(false);

  useEffect(() => {
    if (location.state && location.state.user) {
      setFormData(location.state.user);
      setIsUpdateData(true);
    }
  }, [location.state]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      const checkBoxData = checked
        ? [...formData["skills"], value]
        : formData["skills"].filter((item) => item !== value);
      setFormData({ ...formData, [name]: checkBoxData });
    } else if (type === "file" && event.target.files) {
      const imageFile = event.target.files[0];
      if (imageFile) {
        // Read the selected image file as a data URL
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setFormData({ ...formData, [name]: e.target.result });
        };
        reader.readAsDataURL(imageFile);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleResetForm = () => {
    setFormData({
      id: uuidv4(),
      firstName: "",
      lastName: "",
      gender: "",
      city: "surat",
      skills: [],
      phoneNo: "",
      email: "",
      DOB: "",
      image: null,
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUpdateData) {
      if (window.confirm("Are you sure you want to update this record?"))
        updatedUserData(formData);
    } else {
      if (window.confirm("Are you sure you want to add this record?"))
        addedUserData({ ...formData, id: uuidv4() });
    }
    navigate("/");
  };

  const handleImageChange = (event: any) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      // Read the selected image file as a data URL
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setFormData({ ...formData, image: e.target.result });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div className="App">
      <header className="App-container">
        <p className="mb-6" >Welcome to my assignment</p>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                name="firstName"
                onChange={handleInputChange}
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                value={formData.firstName}
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                name="lastName"
                onChange={handleInputChange}
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                value={formData.lastName}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                name="phoneNo"
                onChange={handleInputChange}
                type="number"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="8956526985"
                pattern="^\d{5}-\d{5}$|^\d{10}$"
                value={formData.phoneNo}
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <select onChange={handleSelectChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="city" id="city">
                <option value="surat">Surat</option>
                <option value="ahemdabad">Ahemdabad</option>
                <option value="pune">Pune</option>
                <option value="banglore">Banglore</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                name="DOB"
                type="date"
                id="DOB"
                onChange={handleInputChange}
                value={formData.DOB}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <div className="flex">
                <div className="flex items-center mr-4">
                  <input
                    id="male-radio"
                    type="radio"
                    name="gender" // Make sure both have the same name attribute for radio button grouping
                    value="male" // Set the value to "male"
                    checked={formData.gender === "male"} // Check if the gender in formData is 'male'
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="male-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center mr-4">
                  <input
                    id="female-radio"
                    type="radio"
                    name="gender" // Make sure both have the same name attribute for radio button grouping
                    value="female" // Set the value to "female"
                    checked={formData.gender === "female"} // Check if the gender in formData is 'female'
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="female-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>

          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              name="email"
              onChange={handleInputChange}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              value={formData.email}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="skill"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Professional Skills
            </label>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex">
                <input
                  name="skills"
                  onChange={handleInputChange}
                  id="default-checkbox"
                  checked={formData?.skills.includes('Communication')}
                  type="checkbox"
                  value="Communication"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="communication-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Communication
                </label>
              </div>
              <div className="flex">
                <input
                  name="skills"
                  onChange={handleInputChange}
                  id="checked-checkbox"
                  checked={formData?.skills.includes('Critical Thinking')}
                  type="checkbox"
                  value="Critical Thinking"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="critical-thinking-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Critical Thinking
                </label>
              </div>
              <div className="flex">
                <input
                  name="skills"
                  onChange={handleInputChange}
                  id="checked-checkbox"
                  checked={formData?.skills.includes('Problem Solving')}
                  type="checkbox"
                  value="Problem Solving"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="Problem-solving-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Problem Solving
                </label>
              </div>
              <div className="flex">
                <input
                  name="skills"
                  onChange={handleInputChange}
                  id="checked-checkbox"
                  checked={formData?.skills.includes('Initiative')}
                  type="checkbox"
                  value="Initiative"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="initiative-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Initiative
                </label>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Upload Image
            </label>
            <input
              name="image"
              onChange={handleImageChange}
              type="file"
              id="image"
              accept="image/*" // Allow only image files
              className="mb-2"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Selected"
                className="max-w-xs max-h-32"
              />
            )}
          </div>
          <button
            type="submit"
            className="mr-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            type="reset"
            onClick={handleResetForm}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset
          </button>
        </form>
      </header>
    </div>
  );
};

export default UserCreateEdit;
