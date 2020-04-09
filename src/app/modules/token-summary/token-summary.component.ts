import { Component, OnInit } from '@angular/core';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-token-summary',
  templateUrl: './token-summary.component.html',
  styleUrls: ['./token-summary.component.css']
})

export class TokenSummaryComponent implements OnInit {

 private tk: TezosToolkit = Tezos;

  displayedColumns: string[] = ['position', 'wallet', 'balance', 'symbol'];
  dataSource = [];

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
          const storage=await contract.storage();
          console.log(storage);

          let balance = storage['balances'];
          let symbol = storage['symbol'];
          console.log(storage['administrator']);

          const ELEMENT_DATA = [];
          let index=1;

          for (let [key] of Object.entries(balance)) {
            console.log(balance[key]['c'])
              //ELEMENT_DATA.push({position:index,wallet:key,balance:balance[key]['c'][0]});
              index++;
          }
          this.dataSource = ELEMENT_DATA;

      } catch (ex) {
          console.log(ex)
      }
    }

    async testfun(){
          Tezos.setProvider({rpc: environment.network});
          Tezos.importKey(environment.inMemorySigner);
          try {
          const contract = await Tezos.contract.at(environment.contractAddress1);
          const op = await contract.methods.replace(295);
          await op.send();

          console.log(await contract.storage())

          } catch (ex) {
             console.log(ex)
          }
    }

}
