export interface Column {
    title: string;
    field: string;
    width?: number;
    render?: (row: any) => JSX.Element;
  }
  
  export interface Action {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
    verDetalles: boolean,
  }
  
  export interface TableProps {
    data: any[];
    columns: Column[];
    actions: Action;
    onAdd?: () => void;
    onUpdate?: (item: any) => void;
    onDelete?: (item: any) => void;
  }