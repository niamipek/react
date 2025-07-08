import axios from './customize-axios';
const fetchAllUsers = async () => {
  const response = await axios.get("/users");
  // Lọc thuộc tính ở đây
  const filtered = response.data.map(({ id, name, username, email  }) => ({
    id, name, username, email
  }));
  return filtered;
};
export { fetchAllUsers };
