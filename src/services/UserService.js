import axios from './customize-axios';
const fetchAllUsers = async () => {
  const response = await axios.get("/users");
  // Lọc thuộc tính ở đây
  const filtered = response.data.map(({ id, name, username, email  }) => ({
    id, name, username, email
  }));
  return filtered;
};
const postCreateNewUser =(name, username) => {
  return axios.post("/users", { name, username });
} 
const putUpdateUser =(name, username,id) => {
return axios.put(`/users/${id}`, { name, username });
}
const deleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};
export { fetchAllUsers , postCreateNewUser,putUpdateUser, deleteUser };
