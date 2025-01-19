import { Module } from '@nestjs/common';
import { PlaywrightService } from './playwright.service';
import { PlaywrightController } from './playwright.controller';

@Module({
  imports: [],
  controllers: [PlaywrightController],
  providers: [PlaywrightService],
  exports: [PlaywrightService],
})
export class PlaywrightModule {}