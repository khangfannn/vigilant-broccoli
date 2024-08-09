const userModel = require('./user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports ={   getAll, addUser, 
                    userLogIn , getUserById,
                    updateUser,deleteUser};

async function getAll() {
  try {
    return await userModel.find();
  } catch (error) {
    console.error('Error: Cannot get all users:', error);
    throw error;
  }
}

async function addUser(body) {
  try {
    const { name, mail, password, phone, role } = body;

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const user = new userModel({ name, mail, password: hash, phone, role: role || 1 });
    
    return await user.save();
  } catch (error) {
    console.error('Error: Cannot add user:', error);
    throw error;
  }
}

async function userLogIn(body) {
  try {
    const { mail, password } = body;
    const user = await userModel.findOne({ mail });
    if (!user) {
      throw new Error("Email not found");
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      throw new Error("Wrong password");
    }
    const token = jwt.sign({ _id: user._id, mail: user.mail, role: user.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1d" });
    const { password: _, ...userWithoutPassword } = user.toObject();
    return { ...userWithoutPassword, token };
  } catch (error) {
    console.error('Error: Cannot log in user:', error);
    throw error;
  }
};
async function getUserById(id) {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error('Error: Cannot get user by ID:', error);
    throw error;
  }
}

async function updateUser(id, body) {
  try {
    const { name, mail, phone, role, password } = body;
    
    const updateFields = { name, mail, phone, role };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      updateFields.password = hash;
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error('Error: Cannot update user:', error);
    throw error;
  }
}
async function deleteUser(id) {
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error('Error: Cannot delete user:', error);
    throw error;
  }
}