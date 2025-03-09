import $api from "../http";
import {
  IGetProductsNamesResponse,
  IPosDeviceDetails,
  IPosDevicesListResponse,
  IPosDeviceUpdateParams,
  ICashCollectionsResponse,
  ICashCollectionsParams,
} from "./PosDevicesTypes";

export default class PosDevicesService {
  static async getDevices(): Promise<IGetProductsNamesResponse> {
    return (
      await $api.get<IGetProductsNamesResponse>("pos/devices/", {
        params: { limit: 100 },
      })
    ).data;
  }

  static async getDevicesNames(): Promise<IPosDevicesListResponse> {
    return (
      await $api.get<IPosDevicesListResponse>("pos/device-names/", {
        params: { limit: 100 },
      })
    ).data;
  }

  static async getDeviceById(id: number): Promise<IPosDeviceDetails> {
    return (await $api.get<IPosDeviceDetails>(`pos/devices/${id}/`)).data;
  }

  static async updateDevice(
    id: number,
    params: IPosDeviceUpdateParams
  ): Promise<IPosDeviceDetails> {
    return (await $api.patch<IPosDeviceDetails>(`pos/devices/${id}/`, params))
      .data;
  }
}

// PosDevicesService.ts
export class CashCollectionsService {
  static async getCashCollections(
    params: ICashCollectionsParams = {}
  ): Promise<ICashCollectionsResponse["data"]> {
    const response = await $api.get<ICashCollectionsResponse>(
      "pos/cash-collections/",
      { params }
    );
    return response.data.data; // Повертаємо тільки вміст data
  }
}
