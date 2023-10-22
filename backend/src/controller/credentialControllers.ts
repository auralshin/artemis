import { Request, Response } from "express";
import { internalServerError, responseSuccess } from "../utils/serverResponses";
import httpStatusCodes from "../config/httpStatusCodes";
import { getAllCredentialsOfAddress } from "../db/getAllCredentialsOfAddress";
import { getAddress } from "../db/getAddress";
import { createNewAddress } from "../db/createNewAddress";

export const fetchCredentialsOfAddress = async (
  req: Request,
  res: Response
) => {
  const functionName = "fetchCredentialsOfAddress";
  try {
    const address = req.params.address;
    const checkForAddress = await getAddress(address);
    if (!checkForAddress.status || checkForAddress.data) {
      await createNewAddress(address);
      return responseSuccess(
        res,
        httpStatusCodes.OK,
        {
          allCredentials: [],
        },
        ""
      );
    }
    const allCredentials = await getAllCredentialsOfAddress(address);
    if (!allCredentials.status) {
      return internalServerError(
        res,
        allCredentials.message ??
          "Something went wrong, please try again later."
      );
    }
    return responseSuccess(
      res,
      httpStatusCodes.OK,
      {
        allCredentials,
      },
      allCredentials.message
    );
  } catch (error: any) {
    console.error(functionName + error.message + JSON.stringify(req));
    return internalServerError(res, error);
  }
};

// new

// status
