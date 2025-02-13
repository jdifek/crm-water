import $api from '../http'
import {
	IPosDevice,
	IPosDeviceDetails,
	IPosDevicesListResponse,
	IPosDeviceUpdateParams,
} from './PosDevicesTypes'

export default class PosDevicesService {
	static async getDevices(): Promise<IPosDevicesListResponse> {
		return (await $api.get<IPosDevicesListResponse>('pos/devices/')).data
	}

	static async getDeviceById(id: number): Promise<IPosDeviceDetails> {
		return (await $api.get<IPosDeviceDetails>(`pos/devices/${id}/`)).data
	}

	static async updateDevice(
		id: number,
		params: IPosDeviceUpdateParams
	): Promise<IPosDevice> {
		return (await $api.patch<IPosDevice>(`pos/devices/${id}/`, params)).data
	}
}
