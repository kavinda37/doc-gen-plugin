export interface EncodeOptionalValues {
    key?: string;
    data?: Array<object>; // an array of objects
    config?: ExecutorConfig; // ExecutorConfig obj
  }
  
  export interface EncodeResult {
    formula: { hashed: string; readable: string };
    meta: Array<MetaData>;
  }
  
  export interface ExecutorConfig {
    defaultDateFormat?: string; // global Date Format default
    timezone?: string; //global default timezone
    disableHtml?: boolean; // executor will not prevent add any default html tags
    errorMessage?: string; // Error message display
    force?: boolean; // force data resolving when empty fields are present
    lineBreakSupport?: boolean; // Treat enter or '\n' as a <br>
    metaData?: any;
  }
  
  export interface MetaData {
    hash: string;
    identifier:string; 
    type?:string;
    key?:string;
    name?:string
  }
  
  export type valueDef =  Record<string, string | number | object | Array<object>>