import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { Td } from "./td";
import { Th } from "./th";

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  renderCell?: ({ entry }: { entry: Entry }) => React.ReactElement;
};

export type TableProps<Entry> = {
  data?: Entry[];
  columns: TableColumn<Entry>[];
};

export const Table = <Entry extends { id: string }>({ data, columns }: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
        <ArchiveBoxIcon className="w-16 h-16" />
        <h4>No Entries Found</h4>
      </div>
    );
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                {columns.map((column, index) => {
                  const isLast = index === columns.length - 1;
                  const isFirst = index === 0;

                  return (
                    <Th isFirst={isFirst} isLast={isLast} key={column.title + index}>
                      {column.title}
                    </Th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.id} className="odd:bg-white even:bg-gray-100">
                  {columns.map(({ renderCell, field, title }, columnIndex) => {
                    const isLast = columnIndex === columns.length - 1;
                    const isFirst = columnIndex === 0;
                    return (
                      <Td key={title + columnIndex} isFirst={isFirst} isLast={isLast}>
                        {renderCell ? renderCell({ entry }) : (entry[field] as React.ReactNode)}
                      </Td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
