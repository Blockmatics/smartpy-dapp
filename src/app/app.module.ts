import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutComponent } from './modules/about/about.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,MatGridListModule,MatCardModule,MatInputModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,MatTableModule,MatFormFieldModule,MatSelectModule } from  '@angular/material';
import { TransferComponent } from './modules/transfer/transfer.component';
import { MintComponent } from './modules/mint/mint.component';
import { BurnFromComponent } from './modules/burn-from/burn-from.component';
import { TokenSummaryComponent } from './modules/token-summary/token-summary.component';
import { CrowdfunderComponent } from './modules/crowdfunder/crowdfunder.component';
import { GetBalanceComponent } from './modules/get-balance/get-balance.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    TransferComponent,
    MintComponent,
    BurnFromComponent,
    TokenSummaryComponent,
    CrowdfunderComponent,
    GetBalanceComponent
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
