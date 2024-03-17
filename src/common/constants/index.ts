// swagger config
export const SWAGGER_API_ROOT = 'api/docs'
export const SWAGGER_API_NAME = 'Backend Base'
export const SWAGGER_API_DESCRIPTION = 'Documentación del Proyecto base BACKEND'
export const SWAGGER_API_CURRENT_VERSION = '1.0'

export enum Status {
  CREATE = 'CREADO',
  ACTIVE = 'ACTIVO',
  INACTIVE = 'INACTIVO',
  PENDING = 'PENDIENTE',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
