import { Component, OnInit } from '@angular/core';
import SirenClient from '@siren-js/client';
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
    const response = await this.client.fetch('http://localhost:3001');
    this.entity = await response.siren();
  }
}
