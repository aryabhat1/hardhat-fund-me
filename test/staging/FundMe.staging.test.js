const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", async function () {
          let deployer
          let fundMe

          const sendValue = ethers.utils.parseEther("1")

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          //   it("Allows people to fund and withdraw", async function () {
          it("Allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw({ gasLimit: 100000 })

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  endingFundMeBalance.toString() +
                      " should equal 0, running assert equal..."
              )
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
