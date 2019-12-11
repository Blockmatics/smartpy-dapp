import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './modules/about/about.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

import { TransferComponent } from './modules/transfer/transfer.component';
import { BurnFromComponent } from './modules/burn-from/burn-from.component';
import { MintComponent } from './modules/mint/mint.component';
import { SpenderAllowanceComponent } from './modules/spender-allowance/spender-allowance.component';
import { TransferFromComponent } from './modules/transfer-from/transfer-from.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'burn-from', component: BurnFromComponent },
  { path: 'mint', component: MintComponent },
  { path: 'spender-allowance', component: SpenderAllowanceComponent },
  { path: 'transfer-from', component: TransferFromComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
