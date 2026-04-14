import { Role } from "../models/roleModel.js";

export class RoleRepository {

  async createRole(roleName: string) {
    return await Role.create({ roleName });
  }

  async findByName(roleName: string) {
    return await Role.findOne({ where: { roleName } });
  }

  async findById(id: number) {
    return await Role.findByPk(id);
  }

  async findAll() {
    return await Role.findAll();
  }

  async deleteById(id: number) {
    return await Role.destroy({ where: { id } });
  }
}