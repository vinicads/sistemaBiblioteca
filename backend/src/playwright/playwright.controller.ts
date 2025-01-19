import { Controller, Post, Body } from '@nestjs/common';
import { PlaywrightService } from './playwright.service';

@Controller('playwright')
export class PlaywrightController {
  constructor(private readonly PlaywrightService: PlaywrightService) {}

  @Post('preencher-formulario')
  async preencherFormulario(@Body() dados: Record<string, string>) {
    await this.PlaywrightService.iniciar();
    await this.PlaywrightService.preencherFormulario('http://exemplo.com/formulario', dados);
    await this.PlaywrightService.fechar();
  }

  @Post('capturar_dados')
  async capturarDados(@Body() seletor: string) {
    await this.PlaywrightService.iniciar();
    const dados = await this.PlaywrightService.capturarDados(seletor);
    await this.PlaywrightService.fechar();
    return dados;
  }
}
