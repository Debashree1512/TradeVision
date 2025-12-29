// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';



// import { MenuItem } from 'primeng/api';
// import { AnimateOnScrollModule } from 'primeng/animateonscroll';
// import { ToolbarModule } from 'primeng/toolbar';
// import { ButtonModule } from 'primeng/button';
// import { RippleModule } from 'primeng/ripple';
// import { MenubarModule } from 'primeng/menubar';
// import { CardModule } from 'primeng/card';
// import { DividerModule } from 'primeng/divider';
// import { BadgeModule } from 'primeng/badge';
// import { PanelModule } from 'primeng/panel';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [
//     RouterLink,
//     CommonModule,
//     MenubarModule,
//     ButtonModule,
//     BadgeModule,
//     AnimateOnScrollModule,
//     CommonModule,
//     ToolbarModule,
//     ButtonModule,
//     RippleModule,
//     MenubarModule,
//     CardModule,
//     DividerModule,
//     BadgeModule,
//     PanelModule
//   ],
//   templateUrl: './home.html',
//   styleUrl: './home.css',
// })
// export class Home implements OnInit{
// items: MenuItem[] | undefined;

// ngOnInit() {
//     this.items = [
//         { label: 'Markets', icon: 'pi pi-chart-line' },
//         { label: 'Portfolio', icon: 'pi pi-briefcase' }
//     ];
//   }


// }






import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
    ToolbarModule,
    RippleModule,
    CardModule,
    DividerModule,
    PanelModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  items: MenuItem[] | undefined;

  // Added ViewChild to reference #marketsTrack in your HTML
  @ViewChild('marketsTrack') marketsTrack!: ElementRef;

  ngOnInit() {
    this.items = [
      { label: 'Markets', icon: 'pi pi-chart-line' },
      { label: 'Portfolio', icon: 'pi pi-briefcase' }
    ];
  }

  // Added missing functions to clear the compiler errors
  prevMarket() {
    if (this.marketsTrack) {
      this.marketsTrack.nativeElement.scrollBy({
        left: -320, // Adjust this value based on card width + gap
        behavior: 'smooth'
      });
    }
  }

  nextMarket() {
    if (this.marketsTrack) {
      this.marketsTrack.nativeElement.scrollBy({
        left: 320, // Adjust this value based on card width + gap
        behavior: 'smooth'
      });
    }
  }
}