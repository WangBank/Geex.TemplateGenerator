export interface Schema {
  path?: string;
  project?: string;
  name: string;
  prefix?: string;
  styleext?: string;
  spec?: boolean;
  selector?: string;
  module?: string;
  routePath?: string;
  standalone?: boolean;
  addToLayout?: string;
}
