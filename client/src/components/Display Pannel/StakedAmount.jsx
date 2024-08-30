import { useState,useEffect,useContext } from "react";
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import {ethers} from "ethers"
import { toast } from "react-hot-toast";
import "./DisplayPannel.css";


const StakedAmount = ()=>{
   const {stakingContract,selectedAccount}=useContext(Web3Context);
   const {isReload}=useContext(StakingContext)
   const [stakedAmount,setStakedAmount]=useState(1);

   useEffect(()=>{
     const fetchStakedBalance = async()=>{
        try{
         console.log(selectedAccount)
           const amountStakedWei = await stakingContract.stakedBalance(selectedAccount)
           const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(),18);
           setStakedAmount(amountStakedEth)
        }catch(error){
         toast.error("Error fetching staked amount");
         console.error(error.message)
        }
     }
     stakingContract && fetchStakedBalance()
   },[stakingContract,selectedAccount,isReload])

   return(
      <div className="staked-amount">
       <p>Staked Amount: </p> <span>{stakedAmount}</span>
      </div>
   )
}
export default StakedAmount;


// import { useState, useEffect, useContext } from "react";
// import Web3Context from "../../context/Web3Context";
// import StakingContext from "../../context/StakingContext";
// import { ethers } from "ethers";
// import { toast } from "react-hot-toast";
// import "./DisplayPannel.css";

// const StakedAmount = () => {
//   const { stakingContract, selectedAccount } = useContext(Web3Context);
//   const { isReload } = useContext(StakingContext);
//   const [stakedAmount, setStakedAmount] = useState("0");

//   useEffect(() => {
//     const fetchStakedBalance = async () => {
//       try {
//         if (!stakingContract || !selectedAccount) {
//           console.error("stakingContract or selectedAccount is undefined");
//           return;
//         }

//         console.log("Selected Account:", selectedAccount);
//         console.log("Staking Contract:", stakingContract);

//         const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);

//         // Check if the result is valid
//         if (amountStakedWei === null || amountStakedWei === undefined) {
//           throw new Error("Invalid result from stakedBalance");
//         }

//         const amountStakedEth = ethers.utils.formatUnits(amountStakedWei.toString(), 18);
//         setStakedAmount(amountStakedEth);
//       } catch (error) {
//         toast.error("Error fetching staked amount");
//         console.error("Error:", error.message);
//       }
//     };

//     stakingContract && fetchStakedBalance();
//   }, [stakingContract, selectedAccount, isReload]);

//   return (
//     <div className="staked-amount">
//       <p>Staked Amount: </p> <span>{stakedAmount}</span>
//     </div>
//   );
// };

// export default StakedAmount;
