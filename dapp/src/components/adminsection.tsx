import {
    Web3Button,
    useContract,
    useContractRead,
    useContractWrite,
} from "@thirdweb-dev/react"
import { useState } from "react"
import millify from "millify"

interface AdminSectionProps {
    saleContractAddress: string
}
export default function AdminSection({
    saleContractAddress,
}: AdminSectionProps) {
    const tokenContractAddress = "0x1bffaFdf98f9266afef906385fB2A44Bc3dCAdc9"
    const [amount, setAmount] = useState("0")
    const { data: saleContract } = useContract(saleContractAddress)
    const { data: tokenContract } = useContract(tokenContractAddress, "token")
    const { data: tokensSold } = useContractRead(saleContract, "tokensSold")
    const { data: remainingTokens } = useContractRead(
        saleContract,
        "remainingTokens"
    )
    const { mutateAsync: approveTokens } = useContractWrite(
        tokenContract,
        "approve"
    )
    return (
        <div className="flex flex-col justify-center gap-1">
            <h1 className="text-3xl text-center m-2 p-2"> Admin Function</h1>
            <h4 className="text-xl text-center m-2 p-2">
                Tokens Remaining: {parseInt(remainingTokens) * 1e-9}
            </h4>
            <h4 className="text-xl text-center m-2 p-2">
                Tokens Sold: {parseInt(tokensSold) * 1e-9}
            </h4>
            <label htmlFor="busd" className="m-2 p-2">
                Token Amount:
            </label>
            <input
                type="text"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded m-2 p-2 border-2"
            />
            <Web3Button
                contractAddress={saleContractAddress}
                action={() =>
                    approveTokens({
                        args: [
                            saleContractAddress,
                            (parseFloat(amount) * 1e9).toString(),
                        ],
                    })
                }
                theme="light"
            >
                Approve Asther
            </Web3Button>
        </div>
    )
}
