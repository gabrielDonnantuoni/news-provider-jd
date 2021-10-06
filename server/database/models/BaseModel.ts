import { Model } from 'objection'

export default class BaseModel extends Model {
  static modelPaths = [__dirname]
}

export { Model }