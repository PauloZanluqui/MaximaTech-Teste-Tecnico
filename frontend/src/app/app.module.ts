import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { ProdutosModule } from './components/produtos/produtos.module';
import { DepartamentosModule } from './components/departamentos/departamentos.module';
import { AppComponent } from './app.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentosComponent,
    ProdutosComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProdutosModule,
    DepartamentosModule,
    AppRoutingModule,
    TableModule,
    MenubarModule,
    ButtonModule,
    CardModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
