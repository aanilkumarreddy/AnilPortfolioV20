import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Agent } from './agent/agent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Agent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'AnilPortfolio';
}
