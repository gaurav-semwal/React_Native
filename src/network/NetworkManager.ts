/* eslint-disable @typescript-eslint/no-explicit-any */
import Errors from "../constants/strings";
import Logger from "../utils/LoggerUtils";
import Toast from "react-native-toast-message";
import { encode as base64encode } from "base-64";
import NetInfo from "./NetworkStatus";

export function jsonToQueryString(json: Record<string, any>) {
  const encodedParamsString = Object.keys(json)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join("&");
  return `?${encodedParamsString}`;
}

export interface ApiResponse {
  responseData: any;
  apiSuccess: boolean;
}
let netStatus: boolean | null = true;
const unsubscribe = NetInfo.addEventListener((state) => {
  Logger.log("Connection type", state.type);
  Logger.log("Is connected?", state.isConnected);
  netStatus = state.isConnected;
});
unsubscribe();

export function handleStatusCodes(
  error: { status: number },
  errorResponse: any,
) {
  Logger.log("errorResponse", JSON.stringify(errorResponse));
  switch (error.status) {
    case 401: {
      Toast.show({
        type: "error",
        text1: errorResponse.message,
      });
      break;
    }
    case 403: {
      Toast.show({
        type: "error",
        text1: "Forbidden Access",
      });
      break;
    }
    case 400: {
      Toast.show({
        type: "error",
        position: "top",
        text1: errorResponse.message,
      });
      break;
    }
  }
}
export function getHeader(params: {
  authToken?: string;
  devicetype?: string;
  deviceid?: string;
}) {
  const { authToken, deviceid, devicetype } = params;
  const headers = new Headers();

  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("deviceid", deviceid || "");
  headers.append("devicetype", devicetype || "");

  if (!authToken) {
    headers.append(
      "Authorization",
      "Basic " + base64encode(`${uname}:${pword}`),
    );
  }
  return headers;
}
const uname = "rcc";
const pword = "rcc@123";
const deviceid = "abc@123";
const devicetype = "1";

export async function apiWrapper(
  url: string,
  type: string,
  params?: Record<string, any>,
  authToken?: string,
): Promise<ApiResponse> {
  try {
    if (!netStatus) {
      throw new Error(Errors.noInternet);
    }
    Logger.log("authtoken", authToken);
    const headers = getHeader({ authToken, deviceid, devicetype });
    const start = new Date();
    Logger.log("headers======>", headers);
    const requestParams = {
      headers: headers,
      body: JSON.stringify(params),
      method: type,
    };
    const apiRes = await fetch(url, requestParams);

    const responseText = await apiRes.text();
    Logger.log("API Response:", responseText);
    if (apiRes.status == 201) {
      const res = JSON.parse(responseText);
      Logger.log("Parsed API Response:", res);
      const timeTaken = new Date() - start;
      Logger.log("API timeTaken for URL", url, "##", timeTaken);
      return { responseData: res, apiSuccess: true };
    } else if (apiRes.status !== 200) {
      // Logger.warn(
      //   `API Error: Status ${apiRes.status}, Response: ${responseText}`,
      // );
      throw { status: apiRes.status, res: responseText };
    } else {
      const res = JSON.parse(responseText);
      Logger.log("Parsed API Response:", res);
      const timeTaken = new Date() - start;
      Logger.log("API timeTaken for URL", url, "##", timeTaken);
      return { responseData: res, apiSuccess: true };
    }
  } catch (error: any) {
    Logger.log("error----", error);
    let errorResponse;
    if (error.res) {
      try {
        const response = JSON.parse(error.res);
        errorResponse = response;
      } catch (error: any) {
        errorResponse = { message: error.res };
      }
    } else {
      errorResponse = { message: error.message };
    }
    error.status
      ? handleStatusCodes(error, errorResponse)
      : Toast.show({
          type: "error",
          text1: error.message,
        });
    return { responseData: errorResponse, apiSuccess: false };
  }
}

export function get(
  url: string,
  params: Record<string, any> | null = null,
  authToken?: string,
) {
  const apiUrl = params ? `${url}${jsonToQueryString(params)}` : url;
  return apiWrapper(apiUrl, "GET", undefined, authToken);
}

export async function post(
  url: string,
  params: Record<string, any>,
  authToken?: string,
) {
  Logger.log("url,aram,authtoken----", url, params, authToken);
  try {
    const response = await apiWrapper(url, "POST", params, authToken);
    return response;
  } catch (error) {
    Logger.log("Error in post request:", error);
    throw error;
  }
}

export function Put(
  url: string,
  params: Record<string, any> | null,
  authToken?: string,
) {
  return apiWrapper(url, "PUT", params, authToken);
}

export function patch(
  url: string,
  params: Record<string, any> | null,
  authToken?: string,
) {
  params = JSON.stringify(params);
  return apiWrapper(url, "PATCH", params, authToken);
}

export function remove(
  url: string,
  params: Record<string, any> | null,
  authToken?: string,
) {
  const apiUrl = params ? `${url}${jsonToQueryString(params)}` : url;
  return apiWrapper(apiUrl, "DELETE", undefined, authToken);
}
function showMessage(arg0: { type: string; text1: any }) {
  throw new Error("Function not implemented.");
}
