import { Injectable } from '@nestjs/common';
import { chromium, Page } from 'playwright';

@Injectable()
export class PlaywrightService {
  private browser;
  private page: Page;

  async iniciar() {
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async preencherFormulario(url: string, dados: Record<string, string>) {
    await this.page.goto(url);

    for (const [campo, valor] of Object.entries(dados)) {
      await this.page.fill(`input[name="${campo}"]`, valor);
    }

    await this.page.click('button[type="submit"]');
  }

  async capturarDados(seletor: string) {
    const dados = await this.page.textContent(seletor);
    return dados;
  }

  async fechar() {
    await this.browser.close();
  }
}
