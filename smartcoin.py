import smartpy as sp

class SmartToken(sp.Contract):
    def __init__(self, admin, value):
        self.init(paused = False, balances = sp.bigMap(), administrator = admin, totalSupply = 0, end_date = sp.timestamp(0), storedValue = value)

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

    @sp.entryPoint
    def getBalance(self, params):
        return self.data.balances

    #  @sp.entryPoint
    #  def getAllowance(self, params):
    #      pass

    @sp.entryPoint
    def getTotalSupply(self, params):
        return self.data.totalSupply

    @sp.entryPoint
    def getAdministrator(self, params):
        return self.data.administrator
    
            
class crowdSaleContract(SmartToken):
    @sp.entryPoint
    def crowdSale(self, params):
        self.data.end_date = sp.timestamp(1577269903)
        sp.verify(sp.now <= self.data.end_date)
        sp.if sp.now <= self.data.end_date:
            self.data.storedValue = params.value
            amount = sp.tez(params.value)
            sp.send(self.data.administrator, amount)

if "templates" not in __name__:
    @addTest(name = "SmartToken")
    def test():

        scenario = sp.testScenario()
        scenario.h1("SmartToken Contract")
        value = 1

        admin = sp.address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb")
        alice = sp.address("tz1SgHSwCbcNQiE4r24dxYTvvbo9xcLwdh6i")
        bob   = sp.address("tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6")

        c1 = SmartToken(admin, value)

        scenario += c1
        scenario.h2("Admin Wallet Address")
        scenario += c1.getAdministrator()
        scenario.h2("Admin mints a few coins")
        scenario += c1.mint(address = alice, amount = 12).run(sender = admin)
        scenario += c1.mint(address = alice, amount = 3).run(sender = admin)
        scenario += c1.mint(address = alice, amount = 3).run(sender = admin)
        
        scenario.h2("Get Total Supply")
        scenario += c1.getTotalSupply()
        
        scenario.h2("Alice transfers to Bob")
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = alice)
        scenario.h2("Bob tries to transfer from Alice but he doesn't have her approval")
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = bob, valid = False)
        
        scenario.h2("Get Balance")
        scenario += c1.getBalance()
        
        scenario.h2("Alice approves Bob and Bob transfers")
        scenario += c1.approve(fromAddr = alice, toAddr = bob, amount = 5).run(sender = alice)
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = bob)
        scenario.h2("Bob tries to over-transfer from Alice")
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = bob, valid = False)
        scenario.h2("Admin burns Bob token")
        scenario += c1.burn(address = bob, amount = 1).run(sender = admin)
        scenario.h2("Alice tries to burn Bob token")
        scenario += c1.burn(address = bob, amount = 1).run(sender = alice, valid = False)
        scenario.h2("Admin pauses the contract and Alice cannot transfer anymore")
        scenario += c1.setPause(True).run(sender = admin)
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 4).run(sender = alice, valid = False)
        scenario.h2("Admin transfers while on pause")
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 1).run(sender = admin)
        scenario.h2("Admin unpauses the contract and transferts are allowed")
        scenario += c1.setPause(False).run(sender = admin)
        scenario += c1.transfer(fromAddr = alice, toAddr = bob, amount = 1).run(sender = alice)
        
        scenario.h3("crowdSaleContract")
        c2 = crowdSaleContract(admin, value)
        scenario += c2 
        scenario += c2.crowdSale(value=2).run(sender=alice)

        # scenario.verify(c1.data.totalSupply == 17)
        # scenario.verify(c1.data.balances[alice].balance == 8)
        # scenario.verify(c1.data.balances[bob].balance == 9)
        
        
        # scenario.h2("Crowdsale")
        # scenario += c1.crowdSale(value=1).run(sender=alice)
        # scenario += c1.mint(address = alice, amount = 1200).run(sender = admin)
        # scenario += c1.mint(address = admin, amount = 120).run(sender = admin)