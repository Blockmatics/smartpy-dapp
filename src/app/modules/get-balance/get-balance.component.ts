import { Component, OnInit } from '@angular/core';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-spender-allowance',
  templateUrl: './get-balance.component.html',
  styleUrls: ['./get-balance.component.css']
})
export class GetBalanceComponent implements OnInit {

  private transferform:FormGroup;
	public logs='';

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {

  	this.transferform = this.formBuilder.group({
            wallet: ['', Validators.required]
        });

  }

  async login(form){
  	this.logs+='<p>Submitting Form</p>';
  	let walletid = this.transferform.value.wallet;
  	let response = await this.allow(walletid);
  	console.log('response');

  }

  async allow(wallet) {
          Tezos.setProvider({rpc: environment.network});
          Tezos.importKey(environment.inMemorySigner);

          try {
          const contract = await Tezos.contract.at(environment.contractAddress1);
          const contractStorage = await contract.storage();
          // @ts-ignore
          const balances= (await contractStorage.balances.get(wallet)).balance.c[0];
          this.logs+='<p>Your token balance is '+balances+'</p>';

          } catch (ex) {
             this.logs+='<p>Not Found</p>';
          }
  }

}
