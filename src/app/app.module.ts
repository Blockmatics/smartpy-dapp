import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { ContactComponent } from './modules/contact/contact.component';
import { AboutComponent } from './modules/about/about.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,MatGridListModule,MatCardModule,MatInputModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,MatTableModule,MatFormFieldModule,MatSelectModule } from  '@angular/material';
import { TransferComponent } from './modules/transfer/transfer.component';
import { SpenderAllowanceComponent } from './modules/spender-allowance/spender-allowance.component';
import { TransferFromComponent } from './modules/transfer-from/transfer-from.component';
import { MintComponent } from './modules/mint/mint.component';
import { BurnFromComponent } from './modules/burn-from/burn-from.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    NotFoundComponent,
    TransferComponent,
    SpenderAllowanceComponent,
    TransferFromComponent,
    MintComponent,
    BurnFromComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
