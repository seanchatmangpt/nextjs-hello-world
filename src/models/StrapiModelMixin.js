require("dotenv").config();

const axios = require("axios");

const API_URL = process.env.STRAPI_API_URL || "http://127.0.0.1:5000";
const API_TOKEN =
  process.env.STRAPI_API_TOKEN ||
  "d81f6b816636e69d7429d3dfd5e8330bea1e3b7a35c7c69b80b250398d957358883b9547e1e4f97bf06c490a5802d51194311b7ea5718155e4aa9ab177f415dca41648cee9b1a74c577dac99fb3eff2de0b2d3633a6172bacfe76b2ec6299d2bdeb5dee3ddebd0928518bd51c77cab032be17271b316ca0ca33640821433af4a";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

class StrapiModelMixin {
  constructor(props) {
    Object.keys(props).forEach((key) => {
      if (props[key] !== "" && props[key] !== undefined) {
        this[key] = props[key];
      }
    });
  }

  async getOne({ id, populate = "*", fields }) {
    const data = await this.fetchOne({ id, populate, fields });
    this.syncData(data);
    return this;
  }

  async getAll({
    sort,
    filters,
    populate = "*",
    fields,
    pagination,
    publicationState,
  } = {}) {
    const response = await this.fetchAll({
      sort,
      filters,
      populate,
      fields,
      pagination,
      publicationState,
    });
    const ThisClass = this.constructor;
    if (response.data.length === 0) {
      return [];
    } else {
      return response.data.map((data) => {
        const model = new ThisClass();
        model.syncData(data);
        return model;
      });
    }
  }

  async fetchOne({ id, populate, fields }) {
    const response = await api.get(`${this.modelPath}/${id}`, {
      params: {
        populate,
        fields,
      },
    });
    return response.data.data;
  }

  async fetchAll({
    sort,
    filters,
    populate,
    fields,
    pagination,
    publicationState,
  }) {
    const response = await api.get(this.modelPath, {
      params: {
        sort,
        filters,
        populate,
        fields,
        pagination,
        publicationState,
      },
    });
    return response.data;
  }

  async create(data) {
    const response = await api.post(this.modelPath, data);
    this.syncData(response.data.data);
    return response.data.data;
  }

  async update(id, data) {
    // We have to deep copy this and change all of the relationships to be the {id: "1"} format
    const dataCopy = JSON.parse(JSON.stringify(data));
    Object.keys(dataCopy).forEach((key) => {
      if (this.relationships[key]) {
        if (dataCopy[key].id) {
          dataCopy[key] = { id: dataCopy[key].id };
        } else if (dataCopy[key].length > 0) {
          dataCopy[key] = dataCopy[key].map((item) => {
            return { id: item.id };
          });
        }
      }
    });

    const response = await api.put(`${this.modelPath}/${id}`, dataCopy);
    this.syncData(response.data.data);
    return response.data.data;
  }

  async delete() {
    const response = await api.delete(`${this.modelPath}/${this.id}`);
    return response.data;
  }

  async upsert() {
    let response;
    if (this.id) {
      response = await this.update(this.id, this);
    } else {
      response = await this.create(this.getCreateData(this));
    }

    if (response) {
      this.id = response.id;
      return true;
    } else {
      return false;
    }
  }

  syncData(data) {
    Object.keys(data.attributes).forEach((key) => {
      if (this.relationships[key]) {
        const rel_constructor = require(`./${this.relationships[key]}`);
        // if the attribute is an object
        if (data.attributes[key].data && data.attributes[key].data.id) {
          this[key] = new rel_constructor({
            id: data.attributes[key].data.id,
            ...data.attributes[key].data.attributes,
          });
        } else if (
          data.attributes[key].data &&
          data.attributes[key].data.hasOwnProperty("length")
        ) {
          // if the attribute is an array
          this[key] = data.attributes[key].data.map((item) => {
            return new rel_constructor({ id: item.id, ...item.attributes });
          });
        }
      } else {
        this[key] = data.attributes[key];
      }
    });

    if (data.id) {
      this["id"] = data.id;
    }
  }

  getCreateData(data) {
    const createData = { ...data };
    delete createData["modelPath"];
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        delete createData[key];
      }
    });
    return createData;
  }
}

module.exports = StrapiModelMixin;
