import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';



import { MenuItem } from 'primeng/api';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MenubarModule,
    ButtonModule,
    BadgeModule,
    AnimateOnScrollModule,
    CommonModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    MenubarModule,
    CardModule,
    DividerModule,
    BadgeModule,
    PanelModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
items: MenuItem[] | undefined;

ngOnInit() {
    this.items = [
        { label: 'Markets', icon: 'pi pi-chart-line' },
        { label: 'Portfolio', icon: 'pi pi-briefcase' }
    ];
  }


}
