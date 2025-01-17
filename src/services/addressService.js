const addressRepository = require("../repository/addressRepository.js");

const getAddress = async (id) => {
	try {
		const address = await addressRepository.getAddress(id);
		if (!address) {
			throw new Error("Endereço não encontrado");
		}
		return address;
	} catch (error) {
		throw error;
	}
}

const getAddressByUserID = async (userId, index) => {
	try {
		const address = await addressRepository.getAddressByUserID(userId, index);
		if (!address) {
			throw new Error("Endereço não encontrado");
		}
		return address;
	} catch (error) {
		throw error;
	}
}

const getAllUserAddress = async (userId) => {
	try {
		const address = await addressRepository.getAllUserAddress(userId);
		if (!address) {
			throw new Error("Endereço não encontrado")
		}
		return address;
	} catch (error) {
		throw error;
	}
}

const getAllAddresses = async () => {
	try {
		const addresses = await addressRepository.getAllAddresses();
		return addresses;
	} catch (error) {
		throw error;
	}
}

const createNewAddress = async (user_id, postal_code, state, city, street, number, complement) => {
	try {
		const address = await addressRepository.createNewAddress(user_id, postal_code, state, city, street, number, complement);
		return address;
	} catch (error) {
		throw error;
	}
}

const updateAddress = async (id, postal_code, state, city, street, number, complement) => {
	try {
		const address = await addressRepository.getAddress(id);
		if (!address) {
			throw new Error("Endereço não encontrado")
		}
		await addressRepository.updateAddress(id, postal_code, state, city, street, number, complement);
	} catch (error) {
		throw error;
	}
};

const deleteAddress = async (id) => {
	try {
		const address = await addressRepository.getAddress(id);
		if (!address) {
			throw new Error("Endereço não encontrado")
		}
		await addressRepository.deleteAddress(id);
		return { success: true };
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getAddress,
	getAddressByUserID,
	getAllUserAddress,
	getAllAddresses,
	createNewAddress,
	updateAddress,
	deleteAddress,
}