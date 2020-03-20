import smartpy as sp

class CrowdFund(sp.Contract):

    def __init__(self, admin, end_date):
        self.init( administrator = admin, xtzContributionTotal = 0, end_date = sp.timestamp(end_date))


    @sp.entry_point
    def contribute(self, params):
        sp.verify(sp.now <= self.data.end_date)
        tezValue=sp.tez(sp.as_nat(params.amount))

        sp.verify(sp.amount == tezValue)
        c = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TInt), sp.address("KT1CmbTPwU7agcpPyHJ43bpNtkKx2FoxWdab"), entry_point = "mint").open_some()
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

@sp.add_test(name = "CrowdFund")
def test():

    end_date=1588291200
    admin = sp.address("tz1eRtFtKik3LyDvqVt3csXc64y6nn5BXyps")
    alice = sp.address("tz1aJLzguZuqbf1oH8aSPPiqrjed4H1YRDFi")
    scenario = sp.test_scenario()
    c = CrowdFund(admin, end_date)
    scenario += c
    scenario.h3("crowdSaleContract")
    scenario += c.contribute(amount = 2).run(sender=alice, amount = sp.tez(2))
