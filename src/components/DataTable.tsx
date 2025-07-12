type Column<T> = {
    header: string;
    accessor: keyof T;
    render?: (item: T) => React.ReactNode;
  };
  
  type Props<T> = {
    columns: Column<T>[];
    data: T[];
  };
  
  export default function DataTable<T>({ columns, data }: Props<T>) {
    return (
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} className="p-2 border">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="even:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="p-2 border">
                  {col.render ? col.render(row) : String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  