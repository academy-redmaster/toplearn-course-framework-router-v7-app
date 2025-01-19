import { generateToken } from '../../config/generateToken';
import { User } from '../../model/users';
import { validationID } from '../../utils/validationID';

// !----------------------------------------------------------------
export const fetchUsersController = async (req, res) => {
   try {
      const users = await User.find({});
      res.json(users);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------

export const RegisterUsersController = async (req, res) => {
   try {
      const userExsist = await User.findOne({ email: req.body.email });
      if (userExsist) {
         return res.status(400).json({ message: 'User already exists' });
      }
      const user = await User.create({
         ...req.body
      });
      res.json(user);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const deleteUsersController = async (req, res) => {
   const { id } = req.params;
   validationID(id);
   try {
      const deleteUser = await User.findByIdAndDelete(id);
      res.json(deleteUser);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const loginUserController = async (req, res) => {
   const { email, password } = await req.body;
   const userFound = await User.findOne({ email });
   if (userFound && (await userFound.isPasswordMatch(password))) {
      res.json({
         _id: userFound?._id,
         userName: userFound?.userName,
         email: userFound?.email,
         password: userFound?.password,
         token: await generateToken(userFound?._id)
      });
   } else {
      res.status(400).json({ message: 'Invalid email or password' });
      throw new Error('Invalid login ');
   }
};

// !----------------------------------------------------------------

export const detailsUserController = async (req, res) => {
   const { id } = req.params;
   validationID(id);
   try {
      const userDetails = await User.findById(id);
      res.json(userDetails);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};
