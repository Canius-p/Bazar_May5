import User from './database/models/user.model';
import bcrypt from 'bcrypt';
const adminSeeder = async (): Promise<void> => {
  const [data] = await User.findAll({
    where: {
      email: 'boiinventer@gmail.com',
    },
  });
  if (!data) {
    await User.create({
      email: 'boiinventer@gmail.com',
      password: bcrypt.hashSync('admin', 8),
      username: 'admin',
      role: 'admin',
    });
    console.log('Admin Seeded successfully');
  } else {
    console.log('Admin already seeded');
  }
};

export default adminSeeder;
