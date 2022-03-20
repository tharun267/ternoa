import { Module } from '@nestjs/common';
import { SignatureModule } from './modules/signature/signature.module';
import { ViewModule } from './modules/view/view.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ViewModule, SignatureModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads/'
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
