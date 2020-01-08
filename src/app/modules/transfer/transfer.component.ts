import { Component, OnInit } from '@angular/core';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
	private transferform:FormGroup;
	public logs='';

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {

  	this.transferform = this.formBuilder.group({
            wallet: ['', Validators.required],
            amount: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
            secret: ['', Validators.required]
        });

  }

  async login(form){
  	this.logs+='<p>Submitting Form</p>';
  	let walletid = this.transferform.value.wallet;
  	let amt= this.transferform.value.amount;
    let secretky= this.transferform.value.secret;
  	let response = await this.transfer(walletid,amt,secretky);
  	console.log('response');

  }

  async transfer(wallet,amount,secretky) {
          const provider = 'https://rpcalpha.tzbeta.net';
          const signer: any = new InMemorySigner(secretky);
          //edskRxy3LBTeJgLx7YUqaYaVTeeoLk8DtqCZzn2D5qz8numpvkXUKBYRXPcfaiJBRcJVPCRbEQBHtPch6ALKVTRqFWKgwk9jWG
          Tezos.setProvider({ rpc: provider, signer });
        
          try {
          const contract = await Tezos.contract.at('KT1BKmzXaV3A4m9qcvBXHujoNTLsQT1hjhX1');

          console.log("Printing contract methods...");
          console.log(contract.methods);
          console.log("Showing initial storage...");
          this.logs+='<p>Showing initial storage...</p>';
          this.logs+='<p>'+JSON.stringify(await contract.storage())+'</p>';
          console.log(await contract.storage())

          const op = await contract.methods.transfer(amount,wallet)
          .send({ fee: 30000, gasLimit: 200000 })
          //tz1SC26Bc2nCgs7Kh3Abf3tDwPYGDXiMAsWt


          //const op = await contract.methods.crowdSale(amount).send({ fee: 30000, gasLimit: 200000,amount:amount })

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
