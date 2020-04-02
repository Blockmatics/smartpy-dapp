import { Component, OnInit } from '@angular/core';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-burn-from',
  templateUrl: './burn-from.component.html',
  styleUrls: ['./burn-from.component.css']
})
export class BurnFromComponent implements OnInit {

  private mintform:FormGroup;
	public logs='';

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
  	this.mintform = this.formBuilder.group({
  			wallet: ['', Validators.required],
            amount: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])]
        });

  }

  async login(form){
  	this.logs+='<p>Submitting Form</p>';
  	let wallet= this.mintform.value.wallet;
  	let amt= this.mintform.value.amount;
  	let response = await this.mint(wallet,amt);
  	console.log('response');

  }

  async mint(wallet,amount) {
          const provider = 'https://carthagenet.SmartPy.io';
          const signer: any = new InMemorySigner('edskS9aekGfn4fyg6Eesvma1u5GZpKYunVVMtHZmPE8Ke25pEX3iXc1fsvs3icmjLSZuGtFwxyR9PyLtfeHzm8rS3ZhWTXr5KX');
          //issuer = edskS9aekGfn4fyg6Eesvma1u5GZpKYunVVMtHZmPE8Ke25pEX3iXc1fsvs3icmjLSZuGtFwxyR9PyLtfeHzm8rS3ZhWTXr5KX
          Tezos.setProvider({ rpc: provider, signer });

          try {
          const contract = await Tezos.contract.at('KT1MXGEhDQcbvoLtf5W5RntBNtkeTYdNZ5tj');

          console.log("Printing contract methods...");
          console.log(contract.methods);
          console.log("Showing initial storage...");
          this.logs+='<p>Showing initial storage...</p>';
          this.logs+='<p>'+JSON.stringify(await contract.storage())+'</p>';
          console.log(await contract.storage())

          const op = await contract.methods.burnFrom(wallet,amount)
          .send({ fee: 30000, gasLimit: 200000 })
          //tz1SC26Bc2nCgs7Kh3Abf3tDwPYGDXiMAsWt

          console.log('Awaiting confirmation...');
          this.logs+='<p>Awaiting confirmation...Please wait!</p>';
          await op.confirmation();
          console.log(op.hash, op.includedInBlock);
          this.logs+='<p>Tx Hash...'+op.hash+'</p>';
          return op.hash;

          } catch (ex) {
             console.log(ex)
          }
  }

}
