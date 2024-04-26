import { Module }from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './services/auth.service';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';

@Module({
    imports:[
      UsuarioModule,
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h'},
      }),  
    ],
    providers:[Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers:[AuthController],
    exports:[Bcrypt]
})
export class AuthModule {}