import $api from '../http'
import {
  IGetProductsNamesResponse,
	IPosDeviceDetails,
	IPosDevicesListResponse,
	IPosDeviceUpdateParams,
} from './PosDevicesTypes'

export default class PosDevicesService {
	static async getDevices(): Promise<IGetProductsNamesResponse> {
		return (await $api.get<IGetProductsNamesResponse>('pos/devices/')).data
	}
	static async getDevicesNames(): Promise<IPosDevicesListResponse> {
		return (await $api.get<IPosDevicesListResponse>('pos/device-names/')).data
	}

	static async getDeviceById(id: number): Promise<IPosDeviceDetails> {
		return (await $api.get<IPosDeviceDetails>(`pos/devices/${id}/`)).data
	}

	static async updateDevice(
		id: number,
		params: IPosDeviceUpdateParams
	): Promise<IPosDeviceDetails> {
		return (await $api.patch<IPosDeviceDetails>(`pos/devices/${id}/`, params))
			.data
	}
}
