import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { LoginUserDto } from './models/login-user.dto';
import { RegisterUserDto } from './models/register-user.dto';
import { User } from './models/user.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'Joe',
      lastName: 'Foo',
      email: 'joefoo@test.com',
      // Passw0rd!
      password: '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
      role: 'admin',
    },
    {
      id: 2,
      firstName: 'Jen',
      lastName: 'Bar',
      email: 'jenbar@test.com',
      // P4ssword!
      password: '$2b$12$FHUV7sHexgNoBbP8HsD4Su/CeiWbuX/JCo8l2nlY1yCo2LcR3SjmC',
      role: 'user',
    },
  ];

  

  async validateUser(user: LoginUserDto) {

    const foundUser = this.users.find(u => u.email === user.email);
    if (!user || !(await compare(user.password, foundUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { password: _password, ...retUser } = foundUser;
    return retUser;
  }

  async registerUser(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      throw new BadRequestException('User remail must be unique');
    }
    if (user.password !== user.confirmationPassword) {
      throw new BadRequestException('Password and Confirmation Password must match');
    }
    const { confirmationPassword: _, ...newUser } = user;
    this.users.push({
      id: this.users.length + 1,
      ...newUser,
      password: await hash(user.password, 12),
    });
    return {
      id: this.users.length,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  findById(id: number): Omit<User, 'password'> {
    const { password: _, ...user } = this.users.find(u => u.id === id);
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    return user;
  }








}