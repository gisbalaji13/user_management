import { User } from '@interfaces/users.interface';

import { Schema, model, connect  } from 'mongoose';
import { logger, stream } from '@utils/logger';

connect(process.env.MONGO_URL).then(resp=>{
  logger.info("DB Connected Successfully")
  
});

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String },
});

const UserModel = model('User', userSchema);


export default UserModel;
