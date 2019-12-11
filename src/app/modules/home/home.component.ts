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
      const provider = 'https://rpcalpha.tzbeta.net';
      const signer: any = new InMemorySigner('edskRxy3LBTeJgLx7YUqaYaVTeeoLk8DtqCZzn2D5qz8numpvkXUKBYRXPcfaiJBRcJVPCRbEQBHtPch6ALKVTRqFWKgwk9jWG');
      Tezos.setProvider({ rpc: provider, signer });
      try {
          const contract = await Tezos.contract.at('KT1BKmzXaV3A4m9qcvBXHujoNTLsQT1hjhX1');
          const storage=await contract.storage();
          console.log(storage);

          let balance = storage['balance_of'];
          let symbol = storage['symbol'];
          //console.log(balance);
         
          const ELEMENT_DATA = [];
          let index=1;

          for (let [key] of Object.entries(balance)) {
              ELEMENT_DATA.push({position:index,wallet:key,balance:balance[key]['c'][0],symbol:symbol});
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
