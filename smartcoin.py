import smartpy as sp

class SmartToken(sp.Contract):
    def __init__(self, admin):
        self.init(paused = False, balances = sp.bigMap(), administrator = admin, totalSupply = 0)

    @sp.entryPoint
    def transfer(self, params):
        sp.verify((sp.sender == self.data.administrator) |
            (~self.data.paused &
                ((params.f == sp.sender) |
                 (self.data.balances[params.f].approvals[params.t] >= params.amount))))
        self.addAddressIfNecessary(params.t)
        sp.verify(self.data.balances[params.f].balance >= params.amount)
        self.data.balances[params.f].balance -= params.amount
        self.data.balances[params.t].balance += params.amount
        sp.if params.f != sp.sender:
            self.data.balances[params.f].approvals[params.t] -= params.amount

    @sp.entryPoint
    def approve(self, params):
        sp.verify((sp.sender == self.data.administrator) |
                  (~self.data.paused & (params.f == sp.sender)))
        sp.verify(self.data.balances[params.f].approvals.get(params.t, 0) == 0)
        self.data.balances[params.f].approvals[params.t] = params.amount

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
        #end date timestmap of mint coins
        end_date = sp.timestamp(1575955231)
        #admin address where 10% funds will deposit for every mint
        admin_address = sp.address('tz1fJgXJ5cRqvTR2aZkxnk2JyrJURVCcnvj5')
        sp.verify(sp.now <= end_date)
        sp.if sp.now <= end_date:
            self.addAddressIfNecessary(params.address)
            self.data.balances[params.address].balance += params.amount
            self.data.totalSupply += params.amount
            
            self.addAddressIfNecessary(admin_address)
            self.data.balances[admin_address].balance += params.admin_amount
            self.data.totalSupply += params.admin_amount
            
        
    @sp.entryPoint
    def burn(self, params):
        sp.verify(sp.sender == self.data.administrator)
        sp.verify(self.data.balances[params.address].balance >= params.amount)
        self.data.balances[params.address].balance -= params.amount
        self.data.totalSupply -= params.amount

    def addAddressIfNecessary(self, address):
        sp.if ~ self.data.balances.contains(address):
            self.data.balances[address] = sp.record(balance = 0, approvals = {})


if "templates" not in __name__:
    @addTest(name = "SmartToken")
    def test():

        scenario = sp.testScenario()
        scenario.h1("SmartToken Contract")

        admin = sp.address("tz1fJgXJ5cRqvTR2aZkxnk2JyrJURVCcnvj5")
        alice = sp.address("tz1g9iLzDbKjMWMLeRpAggKiNRjhrWEQmBZh")

        c1 = SmartToken(admin)

        scenario += c1
        scenario.h2("Admin mints a few coins")
        scenario += c1.mint(address = alice, amount = 120, admin_amount=12).run(sender = admin)
        


        