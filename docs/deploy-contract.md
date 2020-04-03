## How to deploy smart contract using smartpy on Tezos network

1) Create 3 accounts https://faucet.tzalpha.net using Tezos Faucet.

2) Activate all 3 accounts using this link https://smartpy.io/demo/faucetImporter.html , keep all account pkh and private key.

3) Open smartpy IDE https://smartpy.io/demo/index.html and copy code from `smartcoin.py` file and paste into smartpy editor, replace `ADMIN_TZ_ADDRESS` ,`ALICE_TZ_ADDRESS` and `BOB_TZ_ADDRESS` with pkh keys you have created in step 2 and change contract end date by replacing `END_DATE` , make sure END_DATE should be timestamp.

4) Click on `Run` button, after a successful run you will see the contract output on the right side panel.

5) Click on `Michelson` tab on right side panel, and click on `Deploy contract` link, you will redirect new link, enter admin private key and click `credentials and compute account public key hash` link if your key is valid then `Account public key hash` become filled automatically.

6) Choose node from `Contract Origination Parameters` section and click  `Deploy Contract` link , if everything is fine then contract will be deploy on selected tezos network and you will get contract pkh, please keep this contract pkh for further use.

7) Open smartpy IDE https://smartpy.io/demo/index.html and copy code from `crowdfund.py` file and paste into smartpy editor, replace `SMARTCOIN_PKH` with previous deployed contract `pkh` from step 6. Replace `ADMIN_TZ_ADDRESS` ,`ALICE_TZ_ADDRESS` with your created accounts `pkh` and change contract end date by replacing `END_DATE` , make sure `END_DATE` should be timestamp.

8) Repeat 4,5 and 6 step again, make sure using the same admin private key that you have used the smartcoin contract.

9) Set administrator (crowdfund contract pkh) account using `setAdministrator` method, make sure using same admin private key which you have used `smartcoin contract`

10) Now you can use the crowdfund `contribute` method to contribute.    

