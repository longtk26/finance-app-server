export function convertColumnValueMysql<T>(object: T) {
    let columns = "";
    let values: string[] = [];

    for (const key in object) {
        columns += key + "=?, ";
        values.push(object[key] as string);
    }
    // Remove the comma at the end
    columns = columns.slice(0, -2);

    return {
        values,
        columns,
    };
}
