import smartpy as sp

# Note: after deployment take the address of this contract and use it to set
# the admin for the SmartCoin contract

class CrowdFund(sp.Contract):

    def __init__(self, admin, token_contract_addr, end_date):
        self.init( administrator = admin, tokenContract = token_contract_addr, xtzContributionTotal = 0, contributionCount = 0, start_date = sp.timestamp_from_utc_now(), end_date = sp.timestamp(end_date))


    @sp.entry_point
    def contribute(self, params):
        sp.verify(sp.now <= self.data.end_date)
        tezValue=sp.tez(sp.as_nat(params.amount))

        sp.verify(sp.amount == tezValue)
        c = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TInt), self.data.tokenContract, entry_point = "mint").open_some()
        sp.if self.data.xtzContributionTotal < 50000 :
            mydata = sp.record(address = sp.sender,amount=params.amount*1200)
            sp.transfer(mydata, sp.amount, c)
            mydata = sp.record(address = self.data.administrator,amount=params.amount*120)
            sp.transfer(mydata, sp.mutez(0), c)
        sp.else:
            mydata = sp.record(address = sp.sender,amount=params.amount*1000)
            sp.transfer(mydata, sp.amount, c)
            mydata = sp.record(address = self.data.administrator,amount=params.amount*100)
            sp.transfer(mydata, sp.mutez(0), c)
        self.data.xtzContributionTotal += params.amount
        self.data.contributionCount += 1

@sp.add_test(name = "CrowdFund")
def test():

    end_date=END_DATE
    admin = sp.address("ADMIN_TZ_ADDRESS")
    alice = sp.address("ALICE_TZ_ADDRESS")
    token_contract_addr = sp.address("CONTRACT_PKH")

    scenario = sp.test_scenario()
    c = CrowdFund(admin, token_contract_addr, end_date)
    scenario += c
    scenario.h3("crowdSaleContract")
    scenario += c.contribute(amount = 2).run(sender=alice, amount = sp.tez(2))
