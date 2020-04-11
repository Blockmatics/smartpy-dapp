import { Component, OnInit } from '@angular/core';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-crowdfunder',
  templateUrl: './crowdfunder.component.html',
  styleUrls: ['./crowdfunder.component.css']
})

export class CrowdfunderComponent implements OnInit {

 private tk: TezosToolkit = Tezos;

  totalSupply=0;
  contributionCount=0;
  xtzContributionTotal=0;
  avg=0;
  administrator='';
  end_date='';
  start_date='';
  loading='Loading...'

  constructor() {
    this.tk.setProvider({ rpc: environment.network });
  }

  ngOnInit() {
      this.getStorage();
  }

	 async  getStorage() {
      Tezos.setProvider({rpc: environment.network});
      Tezos.importKey(environment.inMemorySigner);
      try {
          const contract = await Tezos.contract.at(environment.contractAddress1);
          //console.log(contract);
          const storage=JSON.parse(JSON.stringify(await contract.storage()));

          

          this.totalSupply=storage.totalSupply;
          this.administrator=storage.administrator;
      } catch (ex) {
          console.log(ex)
      }

      try {
          const contract = await Tezos.contract.at(environment.contractAddress2);
          const storage=JSON.parse(JSON.stringify(await contract.storage()));
          this.contributionCount=storage.contributionCount;
          this.xtzContributionTotal=storage.xtzContributionTotal;
          this.start_date=storage.start_date;
          this.end_date=storage.end_date;
          if(storage.contributionCount > 0){
            this.avg=this.xtzContributionTotal/this.contributionCount;
          }else{
            this.avg=0;
          }
          this.loading='';
      } catch (ex) {
          console.log(ex)
      }
    }

}
