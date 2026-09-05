const userItems = [
  {
    user_id: 1,
    name: 'John Carter',
    username: 'johncarter',
    email: 'john@example.com',
    role: 'user',
    password: 'password123',
  },
  {
    user_id: 2,
    name: 'Emily Stone',
    username: 'emilystone',
    email: 'emily@example.com',
    role: 'user',
    password: 'password456',
  },
];

const listAllUsers = () => {
  return userItems;
};

// Find one user by id
const findUserById = (id) => {
  return userItems.find((user) => user.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;

  const newId = Math.max(...userItems.map((user) => user.user_id)) + 1;

  const newUser = {
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  };

  userItems.unshift(newUser);

  return {user_id: newId};
};

export {listAllUsers, findUserById, addUser};
