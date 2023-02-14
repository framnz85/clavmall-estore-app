import React from "react";
import { View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';

const TableBody = (props) => {
  const { data, columns, currentPage, pageSize } = props;

  const renderCell = (item, column, index) => {
    if (column.content) return column.content(item);
    else if (column.index) return (currentPage - 1) * pageSize + index + 1;

    // return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <View>
      {data.map((item, index) => (
        <View key={item._id + index} style={{flexDirection: "row", borderBottomWidth: 1, borderColor: "#eee"}}>
          <Text>
            {columns.filter(column =>
              column.key === "image" && column.row === 1
            )
              .map((column) =>
                <View key={createKey(item, column)} style={{flex: 1}}>
                  {renderCell(item, column, index)}
                </View>
            )}
          </Text>
          <View style={{flex: 4}}>
            <DataTable.Row style={{borderBottomWidth: 0}}>
              {columns.filter(
                column => column.key !== "image" && column.row === 1
              )
                .map((column) => (
                  <DataTable.Cell key={createKey(item, column)} style={column.style}>
                      {renderCell(item, column, index)}
                  </DataTable.Cell>
              ))}
            </DataTable.Row>
            <DataTable.Row style={{borderBottomWidth: 0}}>
              {columns.filter(column => column.row === 2).map((column) => (
                  <DataTable.Cell key={createKey(item, column)} style={column.style}>
                      {renderCell(item, column, index)}
                  </DataTable.Cell>
              ))}
            </DataTable.Row>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TableBody;
