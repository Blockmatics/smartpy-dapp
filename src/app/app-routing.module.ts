import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './modules/about/about.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { TransferComponent } from './modules/transfer/transfer.component';
import { BurnFromComponent } from './modules/burn-from/burn-from.component';
import { MintComponent } from './modules/mint/mint.component';
import { TokenSummaryComponent } from './modules/token-summary/token-summary.component';
import { CrowdfunderComponent } from './modules/crowdfunder/crowdfunder.component';
import { GetBalanceComponent } from './modules/get-balance/get-balance.component';

const routes: Routes = [
  { path: '', component: CrowdfunderComponent, },
  { path: 'about', component: AboutComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'burn-from', component: BurnFromComponent },
  { path: 'mint', component: MintComponent },
  { path: 'token-summary', component: TokenSummaryComponent },
  { path: 'get-balance', component: GetBalanceComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
