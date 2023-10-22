import prisma from "../config/prisma";
import { responseFn } from "../utils/dynamicReturnFunction";

export const createNewCredential = async ({
  claimId,
  validTill,
  issuedDate,
  addressId,
  daoId,
}: {
  claimId: string;
  validTill: string;
  issuedDate: string;
  addressId: string;
  daoId: string;
}) => {
  try {
    const result = await prisma.polygonIdCredentialIssued.create({
      data: {
        claimId,
        validTill,
        issuedDate,
        addressId,
        daoId,
      },
    });
    if (result == null) {
      return responseFn(false, result);
    }
    return responseFn(true, result);
  } catch (error: any) {
    console.error("ERROR - createNewCredential - " + error.message);
    return responseFn(false, null);
  }
};
