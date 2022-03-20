import { Module } from '@nestjs/common';
import { SignatureModule } from './modules/signature/signature.module';
import { ViewModule } from './modules/view/view.module';

@Module({
  imports: [ViewModule, SignatureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
