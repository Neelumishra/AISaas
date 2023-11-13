import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const DAY_IN_MS= 86_400_000;

export const checkSubscription = async()=>{
    const {userId} = auth();
    if(!userId){
        return false
    }
    const userSubcription = await prismadb.userSubcription.findUnique({
        where:{
            userId
        },
        select:{
            stripeCustomerId:true,
            stripePriceId :true,
            stripeSubscriptionId:true,
            stripeCurrentPeriodEnd:true
        }
    });
    if(!userSubcription){
        return false
    }

    const isValid = 
    userSubcription.stripePriceId && 
    userSubcription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
    return !!isValid
}