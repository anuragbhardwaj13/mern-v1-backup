import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
  });
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:8000/api/user";
      if (selectedOption === "male") {
        url = "http://localhost:8000/api/user/maleUser";
      } else if (selectedOption === "female") {
        url = "http://localhost:8000/api/user/femaleUser";
      } else if (selectedOption === "adult") {
        url = "http://localhost:8000/api/user/adult";
      }
      const response = await axios.get(url);
      setUsers(response.data);
    };
    fetchData();
  }, [selectedOption, users]);

  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelectedOption(e.target.value);
  };

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "gender") {
      value = value === "" ? "" : value.toLowerCase();
    }
    setData((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      age: data.age,
    };

    console.log(user);
    axios
      .post("http://localhost:8000/api/user", data)
      .then((res) => {
        setData({ name: "", email: "", gender: "", age: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create user");
        console.error(err.message);
      });
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen ">
        <h1 className="font-mono font-semibold text-2xl mt-2 mb-4 text-center">
          MERN based user app
        </h1>
        <form
          className="flex flex-col justify-center m-2 "
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 grid-cols-2 pb-5">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              value={data.name}
              placeholder="Enter Your Name"
              className="p-2 border-solid border-2 w-64 rounded-lg border-slate-200"
            />
          </div>
          <div className="grid gap-4 grid-cols-2 pb-5">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={data.email}
              placeholder="Enter Your Email ID"
              className="p-2 border-solid border-2 w-64 rounded-lg border-slate-200"
            />
          </div>
          <div className="grid gap-4 grid-cols-2 pb-5">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              value={data.gender}
              className="p-2 border-solid border-2 w-64 rounded-lg border-slate-200"
            >
              <option value="">Select Gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
          <div className="grid gap-4 grid-cols-2 pb-5">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Age
            </label>
            <input
              type="number"
              onChange={handleChange}
              name="age"
              value={data.age}
              placeholder="Enter your Age"
              className="p-2 border-solid border-2 w-64 rounded-lg border-slate-200"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="border-solid border-2 border-slate-50 rounded-lg p-2 text-slate-800 hover:text-slate-50 hover:bg-slate-800"
              type="submit"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col  justify-center">
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="p-2 border-solid border-2 self-center  rounded-lg w-64 border-slate-200"
        >
          <option value="all">All Users</option>
          <option value="male">Male Users</option>
          <option value="female">Female Users</option>
          <option value="adult">Adult Users</option>
        </select>
        <div className="overflow-x-auto w-screen grid justify-center ">
          <table className="table-auto min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
