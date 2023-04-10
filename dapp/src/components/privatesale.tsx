import { useContractRead, useContract, Web3Button } from "@thirdweb-dev/react"
import millify from "millify"
import { useState } from "react"
import { useBalance } from "@thirdweb-dev/react"
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk"
import Image from "next/image"
import { ethers } from "ethers"

interface PrivateSaleProps {
    saleContractAddress: string
    address: string | undefined
}
export default function PrivateSale({
    saleContractAddress,
    address,
}: PrivateSaleProps) {
    const busdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"
    // const busdAddress = "0xea9579a69EbD08217926B364E8c8de513FDf8E23" //Testnet
    // const usdtAddress = "0xea9579a69EbD08217926B364E8c8de513FDf8E23" //Testnet
    const { data: busdContract } = useContract(busdAddress, "token")
    const { data: usdtContract } = useContract(usdtAddress, "token")
    const { data: saleContract } = useContract(saleContractAddress)
    const { data: rate } = useContractRead(saleContract, "rate")
    const { data: bnbBalance } = useBalance(NATIVE_TOKEN_ADDRESS)

    const { data: busdBalance } = useContractRead(busdContract, "balanceOf", [
        address,
    ])
    const { data: busdAllowance } = useContractRead(busdContract, "allowance", [
        address,
        saleContractAddress,
    ])
    const { data: usdtBalance } = useContractRead(usdtContract, "balanceOf", [
        address,
    ])
    const { data: usdtAllowance } = useContractRead(usdtContract, "allowance", [
        address,
        saleContractAddress,
    ])

    const [formData, setFormData] = useState({
        bnbAmount: "0",
        busdAmount: "0",
        usdtAmount: "0",
    })
    return (
        <main className="flex flex-col justify-center align-middle m-2 p-2 bg-[url('/bg.png')]">
            <h1 className="text-4xl text-center m-2 p-2">
                Welcome to The Asther Private Sale
            </h1>
            <h4 className="text-xl text-center m-2 p-2">
                Asther Rate: ${parseInt(rate) / 100}
            </h4>
            <div className="flex flex-wrap align-middle justify-center gap-2">
                <div className="flex flex-col">
                    <Image src="/bnb.png" width="200" height="200" alt="bnb" />
                    <p>
                        Balance:{" "}
                        {millify(parseFloat(bnbBalance?.displayValue!), {
                            precision: 6,
                        })}
                    </p>
                    <input
                        type="text"
                        name="bnbamount"
                        value={formData.bnbAmount}
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                bnbAmount: e.target.value,
                            }))
                        }
                        className="rounded m-2 p-2 border-2"
                    />
                    <Web3Button
                        contractAddress={saleContractAddress}
                        action={(contract) => {
                            contract.call("buyAstherwithBNB", [], {
                                value: (
                                    parseFloat(formData.bnbAmount) * 1e18
                                ).toString(),
                            })
                        }}
                        // overrides={{value: "1"}}
                        theme="light"
                    >
                        Buy with BNB
                    </Web3Button>
                </div>
                <div className="flex flex-col">
                    <Image
                        src="/busd.png"
                        width="200"
                        height="200"
                        alt="busd"
                    />
                    <p>
                        Balance:{" "}
                        {millify(parseInt(busdBalance?.toString()) * 1e-18, {
                            precision: 6,
                        })}
                    </p>
                    <input
                        type="text"
                        name="busdamount"
                        value={formData.busdAmount}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                busdAmount: e.target.value,
                            })
                        }
                        className="rounded m-2 p-2 border-2"
                    />
                    {busdAllowance < parseFloat(formData.busdAmount) * 1e18 ? (
                        <Web3Button
                            contractAddress={busdAddress}
                            action={(contract) => {
                                contract.call("approve", [
                                    saleContractAddress,
                                    (
                                        parseFloat(formData.busdAmount) * 1e18
                                    ).toString(),
                                ])
                            }}
                            theme="light"
                        >
                            Approve BUSD
                        </Web3Button>
                    ) : (
                        <Web3Button
                            contractAddress={saleContractAddress}
                            action={(contract) => {
                                contract.call("buyAstherwithBUSD", [
                                    (
                                        parseFloat(formData.busdAmount) * 1e18
                                    ).toString(),
                                ])
                            }}
                            theme="light"
                        >
                            Buy with BUSD
                        </Web3Button>
                    )}
                </div>
                <div className="flex flex-col">
                    <Image
                        src="/usdt.png"
                        width="200"
                        height="200"
                        alt="busd"
                    />
                    <p>
                        Balance:{" "}
                        {millify(parseInt(usdtBalance?.toString()) * 1e-18, {
                            precision: 6,
                        })}
                    </p>
                    <input
                        type="text"
                        name="usdtamount"
                        value={formData.usdtAmount}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                usdtAmount: e.target.value,
                            })
                        }
                        className="rounded m-2 p-2 border-2"
                    />
                    {usdtAllowance < parseFloat(formData.usdtAmount) * 1e18 ? (
                        <Web3Button
                            contractAddress={usdtAddress}
                            action={(contract) => {
                                contract.call("approve", [
                                    saleContractAddress,
                                    (
                                        parseFloat(formData.usdtAmount) * 1e18
                                    ).toString(),
                                ])
                            }}
                            theme="light"
                        >
                            Approve USDT
                        </Web3Button>
                    ) : (
                        <Web3Button
                            contractAddress={saleContractAddress}
                            action={(contract) => {
                                contract.call("buyAstherwithUSDT", [
                                    (
                                        parseFloat(formData.usdtAmount) * 1e18
                                    ).toString(),
                                ])
                            }}
                            theme="light"
                        >
                            Buy with USDT
                        </Web3Button>
                    )}
                </div>
            </div>
        </main>
    )
}
