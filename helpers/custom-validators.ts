import { User } from '../api/models';

export const emailExist = async (email = '') => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error('Ese correo ya se encuentra registrado');
    }
};