import { Component, OnInit } from '@angular/core';
import SirenClient, { ClientResponse } from '@siren-js/client';
import { Action, Entity } from '@siren-js/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private client = new SirenClient();
  entity!: Entity;

  get actions(): readonly Action[] {
    return this.entity.actions ?? [];
  }

  async ngOnInit(): Promise<void> {
    this.navigate(() => this.client.fetch('http://localhost:3001'));
  }

  async onSubmit(action: Action) {
    this.navigate(() => this.client.submit(action));
  }

  private async navigate(go: () => Promise<ClientResponse>) {
    const response = await go();
    this.entity = await response.siren();
  }
}
