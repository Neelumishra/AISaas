import { auth } from "@clerk/nextjs";
import  prismadb from "@/lib/prismadb";
import { MAX_FREE_SIZE } from "@/constant";

export const increaseApiLimit = async() => {
    const { userId } = auth();

    if(!userId) return

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where : {
            userId
        }
    })
    
    if(userApiLimit){
        await prismadb.userApiLimit.update({
            where : { userId },
            data : { count:userApiLimit.count+1 }
        })
    }else{
        await prismadb.userApiLimit.create({
            data : {userId,count:1}
        })
    }
}

export const checkApiLimit = async() => {
    const { userId } = auth();
    if (!userId) return;
    
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: {
        userId,
      },
    });

    if(!userApiLimit || userApiLimit.count<MAX_FREE_SIZE) {
        return true
    }else{
        return false
    }
}

export const getApiLimitCount = async ():Promise<number> => {
  const { userId } = auth();
  if (!userId) return -1;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) {
    return 0;
  } 
  return userApiLimit.count
};

