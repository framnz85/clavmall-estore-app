import React from "react";
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';

const TableHeader = (props) => {
    const { columns, onSort, sort } = props;
    return (
        <DataTable.Header>
            <View style={{flex: 4}}>
                {columns.filter(column =>
                    column.key === "image" && column.row === 1
                )
                    .map((column) => (
                        <DataTable.Title
                            key={column.key}
                            onClick={() => (column.path ? onSort(column.path) : "")}
                            style={column.path ? { ...column.style, cursor: "pointer" } : column.style}
                        >
                            {column.label} {column.path ? (sort === 1 ? "▼" : "▲") : ""}
                        </DataTable.Title>
                    ))}
            </View>
            <View style={{flex: 1}}>
                {columns.filter(column =>
                    column.key !== "image" && column.row === 1
                )
                    .map((column) => (
                        <DataTable.Title
                            key={column.key}
                            onClick={() => (column.path ? onSort(column.path) : "")}
                            style={column.path ? { ...column.style, cursor: "pointer" } : column.style}
                        >
                            {column.label} {column.path ? (sort === 1 ? "▼" : "▲") : ""}
                        </DataTable.Title>
                    ))}
            </View>
        </DataTable.Header>
    );
};

export default TableHeader;
