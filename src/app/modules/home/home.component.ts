import { Component, OnInit } from '@angular/core';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

 private tk: TezosToolkit = Tezos;

  displayedColumns: string[] = ['position', 'wallet', 'balance', 'symbol'];
  dataSource = [];

  constructor() {
    this.tk.setProvider({ rpc: 'https://rpcalpha.tzbeta.net' });
  }

  ngOnInit() {
      this.getStorage();
  }

	 async  getStorage() {
      const provider = 'https://carthagenet.SmartPy.io';
      const signer: any = new InMemorySigner('edskRqjJK9RCGXWVy2aj6TGXQjLg6Jt6aVzb8fZf1gV7Wd8eUrsb11tpDDLgxM5ufsptgJw8uZUX7VhxxosgupPBpHbrxgNeQA');
      Tezos.setProvider({ rpc: provider, signer });
      try {
          const contract = await Tezos.contract.at('KT1KmX2tzCPWGXd5WDPmohtntBSDNjm8Poky');
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
       const provider = 'https://rpcalpha.tzbeta.net';
          const signer: any = new InMemorySigner('edskRnayNbLn6qriLXbXxiM21cwnx12QumBmk7sPZTL1eFECQqrNfuzfHnPHb7sTBFQQxM2PeZRNXwUAUgXA8P5GykzQDp8C5C');
          Tezos.setProvider({ rpc: provider, signer });
          try {
          const contract = await Tezos.contract.at('KT1DWXB7jZSJ8RTiAUkNXimXkE3f2qyEddjB');
          const op = await contract.methods.replace(295);
          await op.send();

          console.log(await contract.storage())

          } catch (ex) {
             console.log(ex)
          }
    }

}
