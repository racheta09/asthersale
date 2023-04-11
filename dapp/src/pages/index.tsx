import Navbar from "../components/navbar"
import PrivateSale from "@/components/privatesale"
import AdminSection from "@/components/adminsection"
import Head from "next/head"
import { useContractRead, useContract, useAddress } from "@thirdweb-dev/react"

export default function Home() {
    const address = useAddress()
    const saleContractAddress = "0x8c1037A9e5d184953a26Ea81F53316A583f065d6"
    // const saleContractAddress = "0x0B6FB6FCA22b252a458B24764655c2a6dC0f43FB" //Testnet
    const { data: saleContract } = useContract(saleContractAddress)
    const { data: owner } = useContractRead(saleContract, "owner")
    const { data: ended } = useContractRead(saleContract, "saleEnded")
    return (
        <>
            <Head>
                <title>Asther Private Sale</title>
                <meta name="description" content="Asther Private Sale" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {ended ? (
                <h2 className="text2xl text-center m-2 p-2">
                    Private Sale Ended
                </h2>
            ) : (
                <PrivateSale
                    saleContractAddress={saleContractAddress}
                    address={address}
                />
            )}

            {owner && owner == address ? (
                <AdminSection saleContractAddress={saleContractAddress} />
            ) : (
                ""
            )}
        </>
    )
}
