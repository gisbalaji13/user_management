import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import UserRoute from '@routes/users.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response statusCode 200 / findAll', () => {
      const findUser: User[] = userModel.find();
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);

      return request(app.getServer()).get(`${usersRoute.path}`).expect(200, { data: findUser, message: 'findAll' });
    });
  });

  describe('[GET] /users/:email', () => {
    it('response statusCode 200 / findOne', () => {
      const email = "example@email.com";
      const findUser: User[] = userModel.findOne().where({email:email});
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);

      return request(app.getServer()).get(`${usersRoute.path}/${email}`).expect(200, { data: findUser, message: 'findOne' });
    });
  });

  describe('[POST] /users', () => {
    it('response statusCode 201 / created', async () => {
      const userData = {
        name: 'example',
        email: 'example@email.com',
      };
      const usersRoute = userModel.create(userData);
      const app = new App([usersRoute]);

      return request(app.getServer()).post(`${usersRoute}`).send(userData).expect(201);
    });
  });

  describe('[DELETE] /users/:email', () => {
    it('response statusCode 200 / deleted', () => {
      const email = "example@email.com";;
      const deleteUser: User[] = userModel.deleteOne().where({email:email});
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);

      return request(app.getServer()).delete(`${usersRoute.path}/${email}`).expect(200, { data: deleteUser, message: 'deleted' });
    });
  });
});
