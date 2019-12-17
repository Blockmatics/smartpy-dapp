import smartpy as sp

class SmartToken(sp.Contract):
    def __init__(self, admin):
        self.init(paused = False, balances = sp.bigMap(), administrator = admin, totalSupply = 0)

    @sp.entryPoint
    def transfer(self, params):
        sp.verify((sp.sender == self.data.administrator) |
            (~self.data.paused &
                ((params.fromAddr == sp.sender) |
                 (self.data.balances[params.fromAddr].approvals[sp.sender] >= params.amount))))
        self.addAddressIfNecessary(params.toAddr)
        sp.verify(self.data.balances[params.fromAddr].balance >= params.amount)
        self.data.balances[params.fromAddr].balance -= params.amount
        self.data.balances[params.toAddr].balance += params.amount
        sp.if (params.fromAddr != sp.sender) & (self.data.administrator != sp.sender):
            self.data.balances[params.fromAddr].approvals[params.toAddr] -= params.amount

    @sp.entryPoint
    def approve(self, params):
        sp.verify((sp.sender == self.data.administrator) |
                  (~self.data.paused & (params.fromAddr == sp.sender)))
        sp.verify(self.data.balances[params.fromAddr].approvals.get(params.toAddr, 0) == 0)
        self.data.balances[params.fromAddr].approvals[params.toAddr] = params.amount

    @sp.entryPoint
    def setPause(self, params):
        sp.verify(sp.sender == self.data.administrator)
        self.data.paused = params

    @sp.entryPoint
    def setAdministrator(self, params):
        sp.verify(sp.sender == self.data.administrator)
        self.data.administrator = params

    @sp.entryPoint
    def mint(self, params):
        sp.verify(sp.sender == self.data.administrator)
        self.addAddressIfNecessary(params.address)
        self.data.balances[params.address].balance += params.amount
        self.data.totalSupply += params.amount

    @sp.entryPoint
    def burn(self, params):
        sp.verify(sp.sender == self.data.administrator)
        sp.verify(self.data.balances[params.address].balance >= params.amount)
        self.data.balances[params.address].balance -= params.amount
        self.data.totalSupply -= params.amount

    def addAddressIfNecessary(self, address):
        sp.if ~ self.data.balances.contains(address):
            self.data.balances[address] = sp.record(balance = 0, approvals = {})


    #  @sp.entryPoint
    #  def getBalance(self, params):
    #      pass

    #  @sp.entryPoint
    #  def getAllowance(self, params):
    #      pass

    #  @sp.entryPoint
    #  def getTotalSupply(self, params):
    #      pass

    #  @sp.entryPoint
    #  def getAdministrator(self, params):
    #      return self.data.administrator


if "templates" not in __name__:
    @addTest(name = "SmartToken")
    def test():

        scenario = sp.testScenario()
        scenario.h1("SmartToken Contract")

        admin = sp.address("tz1QxtZ5N63UbhV1DpF99sUjPUqj1aXNP7ey")
        alice = sp.address("tz1g9iLzDbKjMWMLeRpAggKiNRjhrWEQmBZh")
        bob = sp.address("tz1TdAk9zxts2HWj5BTC4sRE91nV6sANTUBp")
        eve = sp.address("tz1dUpfvjmAX3HLYvYhAwb94qe7nJodJr51c")

        c1 = SmartToken(admin)

        scenario += c1
        scenario.h2("Admin mints a few coins")
        scenario += c1.mint(address = alice, amount = 1200).run(sender = admin)
        scenario += c1.approve(fromAddr = alice, toAddr = bob, amount=2000).run(sender = admin)
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount=800).run(alice)
        scenario += c1.transfer(fromAddr = bob, toAddr = eve, amount=200).run(sender = admin)
