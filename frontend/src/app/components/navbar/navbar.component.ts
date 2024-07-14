import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Produtos',
        icon: 'pi pi-list',
        routerLink: '/produtos'
      },
      {
        label: 'Departamentos',
        icon: 'pi pi-sitemap',
        routerLink: '/departamentos',
      },
    ];
  }
}
