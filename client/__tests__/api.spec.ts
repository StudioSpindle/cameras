import api from '../src/modules/api';
import { DataRow } from '../shared.types';
const { mockSuccessData } = require('../__mocks__/api.responses.js');

const globalFetch = (global as any).fetch = jest.fn();

describe("Testing the movies API", () => {
	const mockFetchPromise: Promise<any> = Promise.resolve({
		ok: true,
		json: () => mockSuccessData
	});

	beforeEach(() => {
		globalFetch.mockImplementation(() => mockFetchPromise);
	});

	test("the base route", async () => {
		await api<DataRow[]>('http://localhost:5000/api/v1/cameras').then((data) => {
			expect(data).toBe(mockSuccessData)
		});

		expect(globalFetch).toHaveBeenCalledTimes(1);
    expect(globalFetch).toHaveBeenCalledWith('http://localhost:5000/api/v1/cameras');
	});
});
